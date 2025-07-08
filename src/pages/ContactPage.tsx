import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Send,
  Bot,
  User,
  MapPin,
  Phone,
  Mail,
  Clock,
  Upload,
  X,
  MessageCircle,
  Brain,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import toast from 'react-hot-toast';

// Form validation schema
const contactSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email'),
  domain: yup.string().required('Please select a domain'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

interface ContactFormData {
  name: string;
  email: string;
  domain: string;
  message: string;
}

interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['New Delhi, India', 'Global Operations Worldwide'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+91 9205828350', 'Available 24/7'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['tactnovaofficial@gmail.com', 'Response within 24 hours'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Fri: 9:00 AM - 6:00 PM PST', '24/7 Emergency Support'],
  },
];

const domains = [
  { value: 'tech', label: '🔧 Tech Innovation', color: 'text-primary-400' },
  { value: 'non-tech', label: '🎨 Creative Solutions', color: 'text-accent-400' },
  { value: 'both', label: '⚡ Dual Domain Solutions', color: 'text-emerald-400' },
  { value: 'consultation', label: '💡 Strategy Consultation', color: 'text-yellow-400' },
];

// Mock AI responses - In production, this would connect to OpenAI API
const mockAIResponses = [
  "Hi! I'm TactBot, your AI assistant. I can help you understand our services and guide you through your project requirements. What would you like to know?",
  "Great question! Our tech innovation lab specializes in AI development, full-stack solutions, cybersecurity, and quantum computing. Which area interests you most?",
  "For creative solutions, we offer brand identity, video production, business documentation, and photography services. Would you like to know more about any specific service?",
  "Our dual-domain approach allows us to handle both technical and creative aspects of your project seamlessly. This means faster delivery and better coordination.",
  "I'd be happy to help you determine the best approach for your project. Can you tell me more about your goals and requirements?",
  "Based on what you've told me, I think our team can definitely help. Would you like me to connect you with one of our specialists for a detailed consultation?",
];

export const ContactPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: mockAIResponses[0],
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log('Form Data:', data);
      console.log('Files:', selectedFiles);
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
      setSelectedFiles([]);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files].slice(0, 5)); // Max 5 files
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: chatInput,
      isBot: false,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)];
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="min-h-screen pt-16 bg-neutral-950">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              Let's Build Something <span className="text-primary-400">Amazing</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Ready to transform your vision into reality? Get in touch with our innovation team 
              and discover how we can accelerate your success.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card variant="cyber" className="h-fit">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-primary-400" />
                  Start Your Project
                </CardTitle>
                <p className="text-neutral-300">
                  Tell us about your project and we'll get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="John Doe"
                      variant="cyber"
                      {...register('name')}
                      error={errors.name?.message}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@company.com"
                      variant="cyber"
                      {...register('email')}
                      error={errors.email?.message}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Project Domain
                    </label>
                    <select
                      {...register('domain')}
                      className="w-full px-3 py-2 bg-neutral-900 border-2 border-primary-500/30 rounded-lg text-primary-100 focus:border-primary-500 focus:ring-primary-500/50 focus:outline-none"
                    >
                      <option value="">Select your domain</option>
                      {domains.map((domain) => (
                        <option key={domain.value} value={domain.value}>
                          {domain.label}
                        </option>
                      ))}
                    </select>
                    {errors.domain && (
                      <p className="text-sm text-red-400 mt-1">{errors.domain.message}</p>
                    )}
                  </div>

                  <Textarea
                    label="Project Description"
                    placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    variant="cyber"
                    rows={5}
                    {...register('message')}
                    error={errors.message?.message}
                  />

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Attachments (Optional)
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-primary-500/30 rounded-lg p-6 text-center hover:border-primary-500/50 transition-colors cursor-pointer"
                    >
                      <Upload className="w-8 h-8 mx-auto text-primary-400 mb-2" />
                      <p className="text-neutral-300 text-sm">
                        Click to upload files or drag and drop
                      </p>
                      <p className="text-neutral-500 text-xs mt-1">
                        Max 5 files, 10MB each
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                  </div>

                  {/* Selected Files */}
                  {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 bg-neutral-800 rounded-lg"
                        >
                          <span className="text-sm text-neutral-300 truncate">
                            {file.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    loading={isSubmitting}
                  >
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & Chat */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <Card variant="glass">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">
                  Get In Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-neutral-300 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* AI Chat Assistant */}
            <Card variant="cyber" className="relative">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold text-white flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-primary-400" />
                  TactBot AI Assistant
                </CardTitle>
                <Button
                  onClick={() => setIsChatOpen(!isChatOpen)}
                  variant="ghost"
                  size="sm"
                >
                  {isChatOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                </Button>
              </CardHeader>
              
              {isChatOpen && (
                <CardContent className="space-y-4">
                  {/* Chat Messages */}
                  <div className="h-80 overflow-y-auto space-y-3 bg-neutral-900/50 rounded-lg p-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.isBot
                              ? 'bg-primary-600 text-white'
                              : 'bg-neutral-700 text-neutral-100'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            {message.isBot ? (
                              <Bot className="w-4 h-4" />
                            ) : (
                              <User className="w-4 h-4" />
                            )}
                            <span className="text-xs opacity-75">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-primary-600 text-white px-4 py-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Bot className="w-4 h-4" />
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                      placeholder="Ask me anything about our services..."
                      className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-primary-500 focus:outline-none"
                    />
                    <Button
                      onClick={sendChatMessage}
                      disabled={!chatInput.trim()}
                      variant="primary"
                      size="sm"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="text-xs text-neutral-500 text-center">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    Powered by AI • Available 24/7
                  </div>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Join 200+ successful companies that chose Tactnova for their innovation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Schedule a Call
              </Button>
              <Button variant="outline" size="lg">
                View Case Studies
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
