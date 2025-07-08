import React from 'react';
import { motion } from 'framer-motion';
import { 
  Book, 
  Code, 
  Download, 
  ExternalLink, 
  Search,
  ArrowRight,
  FileText,
  Terminal,
  Zap,
  Shield
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Link } from 'react-router-dom';

const documentationSections = [
  {
    icon: Code,
    title: 'API Documentation',
    description: 'Complete API reference for all our services',
    items: [
      'Authentication & Security',
      'Endpoints & Methods',
      'Request/Response Formats',
      'Rate Limiting & Quotas',
      'SDKs & Libraries'
    ],
    link: '/api'
  },
  {
    icon: Terminal,
    title: 'Developer Tools',
    description: 'Tools and utilities for developers',
    items: [
      'CLI Tools',
      'VS Code Extensions',
      'Testing Frameworks',
      'Debugging Utilities',
      'Performance Monitoring'
    ],
    link: '/tools'
  },
  {
    icon: Zap,
    title: 'Quick Start Guides',
    description: 'Get started with our solutions in minutes',
    items: [
      'Setup & Installation',
      'Basic Configuration',
      'First Project Tutorial',
      'Common Use Cases',
      'Best Practices'
    ],
    link: '/guides'
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Security documentation and compliance info',
    items: [
      'Security Architecture',
      'Data Protection',
      'Compliance Standards',
      'Audit Reports',
      'Incident Response'
    ],
    link: '/security'
  }
];

const tutorials = [
  {
    title: 'Building Your First AI Application',
    description: 'Step-by-step guide to creating an AI-powered application using our platform',
    duration: '45 min',
    level: 'Beginner',
    topics: ['AI Integration', 'API Setup', 'Frontend Implementation']
  },
  {
    title: 'Advanced Cybersecurity Implementation',
    description: 'Implementing enterprise-grade security measures in your applications',
    duration: '60 min',
    level: 'Advanced',
    topics: ['Threat Detection', 'Encryption', 'Access Control']
  },
  {
    title: 'Full-Stack Development with Modern Tools',
    description: 'Complete walkthrough of building scalable web applications',
    duration: '90 min',
    level: 'Intermediate',
    topics: ['React', 'Node.js', 'Database Design']
  },
  {
    title: 'Creative Automation Workflows',
    description: 'Automating creative processes with AI and machine learning',
    duration: '30 min',
    level: 'Beginner',
    topics: ['Content Generation', 'Design Automation', 'Workflow Optimization']
  }
];

const resources = [
  {
    icon: FileText,
    title: 'Technical Specifications',
    description: 'Detailed technical documentation and specifications',
    downloadable: true
  },
  {
    icon: Code,
    title: 'Code Examples',
    description: 'Production-ready code samples and templates',
    downloadable: true
  },
  {
    icon: Book,
    title: 'Best Practices Guide',
    description: 'Industry best practices and optimization techniques',
    downloadable: true
  }
];

export const DocumentationPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Documentation</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Comprehensive documentation, guides, and resources to help you get the most 
              out of Tactnova's solutions and services.
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
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg"
              variant="cyber"
            />
          </motion.div>
        </div>
      </section>

      {/* Documentation Sections */}
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
              Documentation Sections
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Explore our comprehensive documentation organized by topic and expertise level
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {documentationSections.map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={section.link}>
                    <Card variant="cyber" hoverable className="h-full group">
                      <CardContent className="p-8">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                              {section.title}
                            </h3>
                            <p className="text-neutral-300 mb-4">
                              {section.description}
                            </p>
                            <ul className="space-y-2">
                              {section.items.map((item) => (
                                <li key={item} className="text-sm text-neutral-400 flex items-center">
                                  <ArrowRight className="w-3 h-3 mr-2 text-primary-400" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
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

      {/* Tutorials Section */}
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
              Interactive Tutorials
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Step-by-step tutorials to master our platform and services
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map((tutorial, index) => (
              <motion.div
                key={tutorial.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="cyber" hoverable className="h-full group">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                          {tutorial.title}
                        </h3>
                        <p className="text-neutral-300 text-sm mb-4">
                          {tutorial.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-neutral-400">Duration: {tutorial.duration}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tutorial.level === 'Beginner' ? 'bg-green-500/20 text-green-300' :
                          tutorial.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-red-500/20 text-red-300'
                        }`}>
                          {tutorial.level}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {tutorial.topics.map((topic) => (
                          <span 
                            key={topic}
                            className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
                      Start Tutorial
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Resources */}
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
              Downloadable Resources
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Take our documentation offline with these downloadable resources
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" hoverable className="h-full group">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-neutral-300 text-sm mb-6">
                        {resource.description}
                      </p>
                      <Button variant="outline" className="w-full group-hover:bg-accent-500 group-hover:border-accent-500 transition-colors">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Additional Help?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help you 
              get the most out of our platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/support">
                <Button variant="secondary" size="lg">
                  Contact Support
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Join Community
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
