-- TactNova Booking System Database Schema
-- Execute this SQL in your Supabase SQL Editor

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(200) NOT NULL,
    service VARCHAR(50) NOT NULL CHECK (service IN ('AI Development', 'Web Development', 'Production', 'Other')),
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_appointment_date ON bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at column
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create notification logs table (optional - for tracking email/WhatsApp notifications)
CREATE TABLE IF NOT EXISTS notification_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    notification_type VARCHAR(20) NOT NULL CHECK (notification_type IN ('email', 'whatsapp')),
    notification_category VARCHAR(30) NOT NULL CHECK (notification_category IN ('confirmation', 'reminder', 'admin_notification')),
    recipient VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'pending')),
    external_id VARCHAR(255), -- For storing SendGrid message ID or WhatsApp message ID
    error_message TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for notification logs
CREATE INDEX IF NOT EXISTS idx_notification_logs_booking_id ON notification_logs(booking_id);
CREATE INDEX IF NOT EXISTS idx_notification_logs_type ON notification_logs(notification_type);
CREATE INDEX IF NOT EXISTS idx_notification_logs_status ON notification_logs(status);

-- Insert sample data (optional - for testing)
-- INSERT INTO bookings (name, email, phone, company, service, appointment_date, appointment_time) VALUES
-- ('John Doe', 'john@example.com', '+1234567890', 'Example Corp', 'AI Development', '2025-09-15', '14:30'),
-- ('Jane Smith', 'jane@company.com', '+0987654321', 'Tech Innovations', 'Web Development', '2025-09-16', '10:00');

-- Create a view for upcoming appointments (next 7 days)
CREATE OR REPLACE VIEW upcoming_appointments AS
SELECT 
    id,
    name,
    email,
    phone,
    company,
    service,
    appointment_date,
    appointment_time,
    status,
    created_at,
    (appointment_date + appointment_time) AS appointment_datetime
FROM bookings
WHERE 
    appointment_date >= CURRENT_DATE 
    AND appointment_date <= CURRENT_DATE + INTERVAL '7 days'
    AND status IN ('pending', 'confirmed')
ORDER BY appointment_date, appointment_time;

-- Create a function to get bookings by status
CREATE OR REPLACE FUNCTION get_bookings_by_status(booking_status VARCHAR(20))
RETURNS TABLE (
    id UUID,
    name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(20),
    company VARCHAR(200),
    service VARCHAR(50),
    appointment_date DATE,
    appointment_time TIME,
    status VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        b.id,
        b.name,
        b.email,
        b.phone,
        b.company,
        b.service,
        b.appointment_date,
        b.appointment_time,
        b.status,
        b.created_at,
        b.updated_at
    FROM bookings b
    WHERE b.status = booking_status
    ORDER BY b.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Create a function to check for appointment conflicts
CREATE OR REPLACE FUNCTION check_appointment_conflict(
    check_date DATE,
    check_time TIME,
    exclude_booking_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    SELECT COUNT(*)
    INTO conflict_count
    FROM bookings
    WHERE 
        appointment_date = check_date
        AND appointment_time = check_time
        AND status IN ('pending', 'confirmed')
        AND (exclude_booking_id IS NULL OR id != exclude_booking_id);
    
    RETURN conflict_count > 0;
END;
$$ LANGUAGE plpgsql;

-- Create RLS (Row Level Security) policies if needed
-- Note: Enable RLS only if you need user-specific access control
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions to authenticated users
-- GRANT ALL ON bookings TO authenticated;
-- GRANT ALL ON notification_logs TO authenticated;

-- Create admin role and grant permissions (optional)
-- CREATE ROLE booking_admin;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO booking_admin;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO booking_admin;

COMMENT ON TABLE bookings IS 'Main table for storing client appointment bookings';
COMMENT ON TABLE notification_logs IS 'Log table for tracking email and WhatsApp notifications';
COMMENT ON VIEW upcoming_appointments IS 'View showing appointments in the next 7 days';

-- Show table structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name IN ('bookings', 'notification_logs')
ORDER BY table_name, ordinal_position;
