import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Video, 
  Download,
  ArrowRight,
  HelpCircle,
  Phone,
  Mail,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';

const supportCategories = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'New to Tactnova? Start here for setup guides and basics.',
    articles: 24,
    href: '/help/getting-started'
  },
  {
    icon: Video,
    title: 'API Documentation',
    description: 'Complete API reference, endpoints, and integration guides.',
    articles: 18,
    href: '/api'
  },
  {
    icon: MessageCircle,
    title: 'Troubleshooting',
    description: 'Common issues and their solutions.',
    articles: 32,
    href: '/help/troubleshooting'
  },
  {
    icon: Download,
    title: 'Resources & Downloads',
    description: 'SDKs, tools, templates, and other downloadable resources.',
    articles: 15,
    href: '/help/resources'
  }
];

const popularArticles = [
  {
    title: 'How to integrate AI chatbot into your website',
    category: 'AI Solutions',
    readTime: '5 min',
    views: '12.5K'
  },
  {
    title: 'Setting up cybersecurity monitoring',
    category: 'Security',
    readTime: '8 min',
    views: '9.2K'
  },
  {
    title: 'Full-stack development best practices',
    category: 'Development',
    readTime: '12 min',
    views: '8.7K'
  },
  {
    title: 'Brand identity design guidelines',
    category: 'Creative',
    readTime: '6 min',
    views: '7.3K'
  },
  {
    title: 'API rate limits and quotas explained',
    category: 'API',
    readTime: '4 min',
    views: '6.8K'
  }
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Get instant help from our support team',
    availability: '24/7',
    action: 'Start Chat',
    primary: true
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send us detailed questions or issues',
    availability: 'Response within 2 hours',
    action: 'Send Email',
    primary: false
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Speak directly with our technical experts',
    availability: 'Mon-Fri 9AM-6PM IST',
    action: 'Call Now',
    primary: false
  }
];

const faqs = [
  {
    question: 'How do I get started with Tactnova services?',
    answer: 'Getting started is easy! Contact us through our website, schedule a consultation, and we\'ll work with you to understand your needs and create a customized solution plan.'
  },
  {
    question: 'What programming languages and technologies do you support?',
    answer: 'We work with a wide range of technologies including React, Node.js, Python, AI/ML frameworks, cloud platforms, and more. Our team adapts to your existing tech stack or recommends the best solutions for your project.'
  },
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity and scope. Simple integrations may take 2-4 weeks, while comprehensive solutions can take 3-6 months. We provide detailed timelines during the planning phase.'
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes! We offer comprehensive post-launch support including monitoring, updates, troubleshooting, and feature enhancements to ensure your solution continues to perform optimally.'
  },
  {
    question: 'Can you work with our existing team and systems?',
    answer: 'Absolutely! We specialize in seamless integration with existing workflows and can collaborate directly with your team or work independently based on your preferences.'
  }
];

export const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20"></div>
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              Help <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Center</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Find answers to your questions, explore our documentation, and get the support you need 
              to succeed with Tactnova's solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search help articles, guides, and documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg"
              variant="cyber"
            />
          </motion.div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Browse by Category
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Find the information you need organized by topic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={category.href}>
                    <Card variant="cyber" hoverable className="h-full group">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-neutral-300 text-sm mb-4">
                          {category.description}
                        </p>
                        <div className="text-xs text-primary-300">
                          {category.articles} articles
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Popular Articles
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              The most helpful articles from our knowledge base
            </p>
          </motion.div>

          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="cyber" hoverable className="group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-neutral-400">
                          <span className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded">
                            {article.category}
                          </span>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.readTime}
                          </div>
                          <span>{article.views} views</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Contact Support
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Still need help? Our support team is here to assist you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    variant="cyber" 
                    hoverable 
                    className={`h-full group ${option.primary ? 'border-primary-400' : ''}`}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
                        option.primary 
                          ? 'bg-gradient-to-br from-primary-500 to-primary-600' 
                          : 'bg-gradient-to-br from-accent-500 to-accent-600'
                      }`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {option.title}
                      </h3>
                      <p className="text-neutral-300 text-sm mb-4">
                        {option.description}
                      </p>
                      <div className="text-xs text-neutral-400 mb-6">
                        {option.availability}
                      </div>
                      <Button 
                        variant={option.primary ? "primary" : "outline"} 
                        className="w-full"
                      >
                        {option.action}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="cyber" className="group">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-neutral-800/50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                        {faq.question}
                      </h3>
                      <HelpCircle className={`w-5 h-5 text-neutral-400 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-neutral-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help you succeed. Get in touch for personalized support 
              and guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/support">
                <Button variant="secondary" size="lg">
                  Contact Support
                  <MessageCircle className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Browse Documentation
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
