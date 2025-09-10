import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  Code, Cloud, Shield, Smartphone, Globe,
  Zap, Bot, Palette, Search, BarChart3,
  ChevronRight, Check, Star, ArrowUpRight,
  Play, Download, ExternalLink, MessageSquare
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';

// Service interface
interface TechService {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  technologies: string[];
  deliverables: string[];
  timeline: string;
  startingPrice: string;
  complexity: 'Basic' | 'Advanced' | 'Enterprise';
  category: 'development' | 'ai' | 'design' | 'data' | 'security';
  caseStudy?: {
    client: string;
    result: string;
    metrics: string[];
  };
}

// Technology stack interface
interface TechStack {
  category: string;
  technologies: Array<{
    name: string;
    icon: string;
    description: string;
    proficiency: number;
  }>;
}

const TechSolutionsPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<TechService | null>(null);

  // Tech services data
  const techServices: TechService[] = [
    {
      id: 'web-development',
      title: 'Web Application Development',
      description: 'Full-stack web applications built with modern frameworks and scalable architecture.',
      icon: Code,
      features: [
        'React/Next.js Frontend',
        'Node.js/Python Backend',
        'Database Design & Optimization',
        'API Development & Integration',
        'Responsive Design',
        'Performance Optimization'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
      deliverables: [
        'Fully functional web application',
        'Source code & documentation',
        'Deployment & hosting setup',
        'Testing & quality assurance',
        '3 months free support'
      ],
      timeline: '6-12 weeks',
      startingPrice: '$15,000',
      complexity: 'Advanced',
      category: 'development',
      caseStudy: {
        client: 'FinTech Startup',
        result: 'Delivered trading platform with real-time data',
        metrics: ['40% faster load times', '99.9% uptime', '10k+ active users']
      }
    },
    {
      id: 'mobile-development',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: Smartphone,
      features: [
        'Native iOS & Android',
        'Cross-platform Development',
        'UI/UX Design',
        'Push Notifications',
        'Offline Functionality',
        'App Store Optimization'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
      deliverables: [
        'iOS & Android applications',
        'App store submission',
        'Backend API integration',
        'Analytics setup',
        'Maintenance plan'
      ],
      timeline: '8-16 weeks',
      startingPrice: '$25,000',
      complexity: 'Advanced',
      category: 'development'
    },
    {
      id: 'ai-solutions',
      title: 'AI & Machine Learning',
      description: 'Custom AI solutions including chatbots, predictive analytics, and automation.',
      icon: Bot,
      features: [
        'Custom ML Models',
        'Natural Language Processing',
        'Computer Vision',
        'Predictive Analytics',
        'AI Chatbots',
        'Process Automation'
      ],
      technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face'],
      deliverables: [
        'Trained ML models',
        'API endpoints',
        'Model documentation',
        'Training datasets',
        'Monitoring dashboard'
      ],
      timeline: '10-20 weeks',
      startingPrice: '$30,000',
      complexity: 'Enterprise',
      category: 'ai',
      caseStudy: {
        client: 'E-commerce Platform',
        result: 'AI recommendation engine increased sales',
        metrics: ['25% increase in conversion', '35% higher engagement', '$2M additional revenue']
      }
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud solutions with DevOps automation and security best practices.',
      icon: Cloud,
      features: [
        'Cloud Migration',
        'Infrastructure as Code',
        'Auto-scaling Setup',
        'CI/CD Pipelines',
        'Monitoring & Logging',
        'Disaster Recovery'
      ],
      technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Docker'],
      deliverables: [
        'Cloud infrastructure setup',
        'Deployment automation',
        'Monitoring solutions',
        'Security configuration',
        'Documentation & training'
      ],
      timeline: '4-8 weeks',
      startingPrice: '$20,000',
      complexity: 'Enterprise',
      category: 'development'
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics & BI',
      description: 'Transform your data into actionable insights with custom analytics solutions.',
      icon: BarChart3,
      features: [
        'Data Pipeline Development',
        'Business Intelligence Dashboards',
        'Real-time Analytics',
        'Data Visualization',
        'Predictive Modeling',
        'ETL Processes'
      ],
      technologies: ['Python', 'SQL', 'Tableau', 'Power BI', 'Apache Spark', 'Snowflake'],
      deliverables: [
        'Analytics dashboard',
        'Data pipelines',
        'Custom reports',
        'KPI tracking',
        'Training & documentation'
      ],
      timeline: '6-12 weeks',
      startingPrice: '$18,000',
      complexity: 'Advanced',
      category: 'data'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity Solutions',
      description: 'Comprehensive security audits, penetration testing, and security implementation.',
      icon: Shield,
      features: [
        'Security Audits',
        'Penetration Testing',
        'Vulnerability Assessment',
        'Security Architecture',
        'Compliance Implementation',
        'Incident Response'
      ],
      technologies: ['Kali Linux', 'Metasploit', 'Burp Suite', 'OWASP', 'ISO 27001'],
      deliverables: [
        'Security assessment report',
        'Vulnerability remediation',
        'Security policies',
        'Training materials',
        'Compliance certification'
      ],
      timeline: '4-10 weeks',
      startingPrice: '$12,000',
      complexity: 'Enterprise',
      category: 'security'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'User-centered design for web and mobile applications with modern aesthetics.',
      icon: Palette,
      features: [
        'User Research & Analysis',
        'Wireframing & Prototyping',
        'Visual Design',
        'Interaction Design',
        'Usability Testing',
        'Design System Creation'
      ],
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'InVision'],
      deliverables: [
        'Design mockups',
        'Interactive prototypes',
        'Design system',
        'User testing reports',
        'Development handoff'
      ],
      timeline: '4-8 weeks',
      startingPrice: '$8,000',
      complexity: 'Basic',
      category: 'design'
    },
    {
      id: 'seo-optimization',
      title: 'SEO & Digital Marketing',
      description: 'Technical SEO, content optimization, and digital marketing automation.',
      icon: Search,
      features: [
        'Technical SEO Audit',
        'Keyword Research',
        'Content Optimization',
        'Link Building',
        'Analytics Setup',
        'Marketing Automation'
      ],
      technologies: ['Google Analytics', 'SEMrush', 'Ahrefs', 'HubSpot', 'Mailchimp'],
      deliverables: [
        'SEO audit report',
        'Optimization strategy',
        'Content calendar',
        'Analytics dashboard',
        'Performance tracking'
      ],
      timeline: '6-12 weeks',
      startingPrice: '$5,000',
      complexity: 'Basic',
      category: 'design'
    }
  ];

  // Technology stack
  const techStacks: TechStack[] = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React', icon: '⚛️', description: 'Modern JavaScript library', proficiency: 95 },
        { name: 'Next.js', icon: '▲', description: 'Full-stack React framework', proficiency: 90 },
        { name: 'TypeScript', icon: '📘', description: 'Type-safe JavaScript', proficiency: 92 },
        { name: 'Vue.js', icon: '💚', description: 'Progressive framework', proficiency: 85 }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', icon: '🟢', description: 'JavaScript runtime', proficiency: 93 },
        { name: 'Python', icon: '🐍', description: 'Versatile programming language', proficiency: 88 },
        { name: 'Go', icon: '🔵', description: 'Fast and efficient', proficiency: 82 },
        { name: 'Rust', icon: '🦀', description: 'Memory-safe systems language', proficiency: 75 }
      ]
    },
    {
      category: 'Database',
      technologies: [
        { name: 'MongoDB', icon: '🍃', description: 'NoSQL database', proficiency: 90 },
        { name: 'PostgreSQL', icon: '🐘', description: 'Advanced SQL database', proficiency: 87 },
        { name: 'Redis', icon: '🔴', description: 'In-memory data store', proficiency: 85 },
        { name: 'Elasticsearch', icon: '🔍', description: 'Search and analytics', proficiency: 80 }
      ]
    },
    {
      category: 'Cloud & DevOps',
      technologies: [
        { name: 'AWS', icon: '☁️', description: 'Cloud computing platform', proficiency: 91 },
        { name: 'Docker', icon: '🐳', description: 'Containerization platform', proficiency: 89 },
        { name: 'Kubernetes', icon: '☸️', description: 'Container orchestration', proficiency: 84 },
        { name: 'Terraform', icon: '🏗️', description: 'Infrastructure as code', proficiency: 86 }
      ]
    }
  ];

  // Filter services based on category
  const filteredServices = selectedCategory === 'all' 
    ? techServices 
    : techServices.filter(service => service.category === selectedCategory);

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Services', icon: Globe },
    { id: 'development', label: 'Development', icon: Code },
    { id: 'ai', label: 'AI & ML', icon: Bot },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'data', label: 'Data & Analytics', icon: BarChart3 },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(56,189,248,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-6">
              Tech Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Cutting-edge technology solutions that drive innovation and accelerate
              your digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Explore Services
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated tech icons */}
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-blue-500/10 rounded-lg flex items-center justify-center animate-pulse">
          <Code className="h-8 w-8 text-blue-400" />
        </div>
        <div className="absolute top-1/2 right-16 w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center animate-bounce">
          <Bot className="h-6 w-6 text-purple-400" />
        </div>
      </section>

      {/* Service Categories Filter */}
      <section className="py-12 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Tech Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From concept to deployment, we deliver comprehensive technology solutions
              that solve complex business challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedService(service)}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                          {React.createElement(service.icon, { className: "h-6 w-6 text-blue-400" })}
                        </div>
                        <div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            service.complexity === 'Basic' 
                              ? 'bg-green-500/20 text-green-400'
                              : service.complexity === 'Advanced'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {service.complexity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-blue-400 font-bold">{service.startingPrice}</div>
                        <div className="text-gray-400 text-sm">starting at</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    
                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">KEY FEATURES</h4>
                      <div className="space-y-2">
                        {service.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 4 && (
                          <div className="text-blue-400 text-sm">
                            +{service.features.length - 4} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.technologies.length > 4 && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                            +{service.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>Timeline: {service.timeline}</span>
                      {service.caseStudy && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400">Case Study</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <Button className="w-full group" size="sm">
                      Learn More
                      <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Technology Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build robust, scalable, and
              future-proof solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {techStacks.map((stack, stackIndex) => (
              <motion.div
                key={stack.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: stackIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <h3 className="text-xl font-bold text-white mb-4">{stack.category}</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stack.technologies.map((tech) => (
                        <div key={tech.name} className="group">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">{tech.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-white">{tech.name}</span>
                                <span className="text-blue-400 text-sm">{tech.proficiency}%</span>
                              </div>
                              <p className="text-gray-400 text-sm">{tech.description}</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${tech.proficiency}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              viewport={{ once: true }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Development Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that ensures quality, transparency, and success
              at every stage of development.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery & Planning',
                description: 'Understanding requirements, defining scope, and creating technical specifications.',
                icon: Search
              },
              {
                step: '02',
                title: 'Design & Architecture',
                description: 'Creating system architecture, UI/UX designs, and technical blueprints.',
                icon: Palette
              },
              {
                step: '03',
                title: 'Development & Testing',
                description: 'Agile development with continuous testing and quality assurance.',
                icon: Code
              },
              {
                step: '04',
                title: 'Deployment & Support',
                description: 'Production deployment, monitoring setup, and ongoing maintenance.',
                icon: Zap
              }
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-blue-400 mb-4">{phase.step}</div>
                    <div className="p-4 bg-blue-500/20 rounded-full w-fit mx-auto mb-6">
                      <phase.icon className="h-8 w-8 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{phase.title}</h3>
                    <p className="text-gray-300">{phase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss your technology needs and create a solution that drives
              real business value. Get started with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="group">
                  Start Your Project
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    {React.createElement(selectedService.icon, { className: "h-8 w-8 text-blue-400" })}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedService.title}</h2>
                    <p className="text-blue-400">{selectedService.startingPrice} starting price</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <p className="text-gray-300 text-lg mb-8">{selectedService.description}</p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
                  <div className="space-y-3">
                    {selectedService.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Deliverables</h3>
                  <div className="space-y-3">
                    {selectedService.deliverables.map((deliverable) => (
                      <div key={deliverable} className="flex items-center gap-3">
                        <Download className="h-5 w-5 text-blue-400 flex-shrink-0" />
                        <span className="text-gray-300">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Case Study */}
              {selectedService.caseStudy && (
                <div className="mt-8 p-6 bg-gray-700/30 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Success Story</h3>
                  <p className="text-gray-300 mb-4">
                    <strong>{selectedService.caseStudy.client}:</strong> {selectedService.caseStudy.result}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {selectedService.caseStudy.metrics.map((metric) => (
                      <span key={metric} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <Button className="flex-1">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  View Portfolio
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default TechSolutionsPage;
