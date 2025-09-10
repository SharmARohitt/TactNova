-- Contact Messages Schema for TactNova
-- Add this to your existing schema.sql file

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company VARCHAR(200),
    subject VARCHAR(300),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    priority VARCHAR(10) DEFAULT 'normal',
    source VARCHAR(50) DEFAULT 'website',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    responded_at TIMESTAMP WITH TIME ZONE,
    admin_notes TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_priority ON contact_messages(priority);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_messages_updated_at
    BEFORE UPDATE ON contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_contact_messages_updated_at();

-- Contact responses tracking table
CREATE TABLE IF NOT EXISTS contact_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contact_message_id UUID REFERENCES contact_messages(id) ON DELETE CASCADE,
    response_type VARCHAR(50) NOT NULL, -- 'meeting_request', 'rejection', 'follow_up'
    email_sent BOOLEAN DEFAULT FALSE,
    email_sent_at TIMESTAMP WITH TIME ZONE,
    meeting_scheduled_at TIMESTAMP WITH TIME ZONE,
    admin_id VARCHAR(100), -- For tracking which admin responded
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sample data for testing
INSERT INTO contact_messages (name, email, phone, company, subject, message, status, priority) VALUES
('John Doe', 'john@example.com', '+1234567890', 'Example Corp', 'AI Development Project', 'We need help building an AI chatbot for our customer service.', 'pending', 'high'),
('Jane Smith', 'jane@techstartup.com', '+1987654321', 'Tech Startup Inc', 'Website Development', 'Looking for a modern website with advanced features.', 'pending', 'normal'),
('Bob Wilson', 'bob@manufacturing.com', '+1122334455', 'Wilson Manufacturing', 'Digital Transformation', 'Need help with digital transformation strategy.', 'pending', 'normal');

-- RLS Policies (Optional but recommended)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_responses ENABLE ROW LEVEL SECURITY;

-- Policy for service role (backend API)
CREATE POLICY "Service role can manage all contact messages" ON contact_messages
FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can manage all contact responses" ON contact_responses
FOR ALL USING (auth.role() = 'service_role');

-- Views for better data access
CREATE OR REPLACE VIEW contact_messages_with_responses AS
SELECT 
    cm.*,
    cr.response_type,
    cr.email_sent,
    cr.email_sent_at,
    cr.meeting_scheduled_at,
    cr.notes as response_notes
FROM contact_messages cm
LEFT JOIN contact_responses cr ON cm.id = cr.contact_message_id
ORDER BY cm.created_at DESC;
