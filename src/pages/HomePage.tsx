import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/sections/HeroSection';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Code, 
  Shield, 
  Zap, 
  Palette, 
  TrendingUp,
  Users,
  Award,
  Briefcase,
  FileText,
  ArrowRight,
  Star,
  Quote
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const services = {
  tech: [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Custom AI solutions, chatbots, and intelligent automation systems.',
      features: ['ChatGPT Integration', 'Custom ML Models', 'Voice Agents', 'RAG Systems']
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Modern web applications with cutting-edge technologies.',
      features: ['React/Next.js', 'Node.js/Python', 'Cloud Architecture', 'API Development']
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      description: 'Comprehensive security audits and protection strategies.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance', 'Risk Assessment']
    },
    {
      icon: Zap,
      title: 'Quantum Computing',
      description: 'Next-generation computing solutions for complex problems.',
      features: ['Quantum Algorithms', 'Research & Development', 'Optimization', 'Consulting']
    }
  ],
  nonTech: [
    {
      icon: Palette,
      title: 'Brand Strategy & Identity',
      description: 'Complete brand development that drives recognition and funding success.',
      features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Market Positioning']
    },
    {
      icon: TrendingUp,
      title: 'Digital Transformation',
      description: 'Strategic transformation consulting for operational excellence.',
      features: ['Change Management', 'Process Optimization', 'Cultural Transformation', 'Performance Analytics']
    },
    {
      icon: Users,
      title: 'Growth Marketing',
      description: 'Data-driven marketing strategies that accelerate business growth.',
      features: ['Growth Hacking', 'Content Strategy', 'Performance Marketing', 'Customer Acquisition']
    },
    {
      icon: Award,
      title: 'Experience Design',
      description: 'Customer experience strategies that increase satisfaction and loyalty.',
      features: ['Service Design', 'Customer Journey', 'Experience Strategy', 'Satisfaction Optimization']
    },
    {
      icon: Briefcase,
      title: 'Business Consulting',
      description: 'Strategic consulting that drives sustainable growth and efficiency.',
      features: ['Strategic Planning', 'Operational Excellence', 'Market Analysis', 'Performance Improvement']
    },
    {
      icon: FileText,
      title: 'Content & Storytelling',
      description: 'Compelling content strategies that engage audiences and drive action.',
      features: ['Content Strategy', 'Brand Storytelling', 'Content Creation', 'Audience Development']
    }
  ]
};

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'TechForward Inc.',
    content: 'Tactnova transformed our vision into reality. Their AI implementation increased our operational efficiency by 300% and reduced processing time from hours to minutes.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face&auto=format',
    location: 'San Francisco, CA'
  },
  {
    name: 'Marcus Rodriguez',
    role: 'Founder & CEO',
    company: 'Creative Labs',
    content: 'The brand identity they created perfectly captures our essence. Our brand recognition increased by 85% and customer engagement tripled within the first quarter.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
    location: 'Austin, TX'
  },
  {
    name: 'Emily Johnson',
    role: 'Head of Security',
    company: 'SecureBank',
    content: 'Their cybersecurity audit revealed critical vulnerabilities and provided actionable solutions. We prevented 3 major security breaches thanks to their recommendations.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format',
    location: 'New York, NY'
  },
  {
    name: 'David Kim',
    role: 'VP of Innovation',
    company: 'FutureTech Corp',
    content: 'Working with Tactnova was a game-changer. Their quantum computing consultation helped us solve complex optimization problems that seemed impossible before.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
    location: 'Seattle, WA'
  },
  {
    name: 'Jennifer Walsh',
    role: 'Chief Marketing Officer',
    company: 'GrowthHub',
    content: 'The digital transformation strategy they developed increased our conversion rates by 140%. Their approach to growth marketing is truly revolutionary.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face&auto=format',
    location: 'Chicago, IL'
  },
  {
    name: 'Alex Thompson',
    role: 'Product Director',
    company: 'InnovateCo',
    content: 'Their full-stack development expertise brought our complex SaaS platform to life. The scalable architecture they built handles 10x our original traffic projections.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format',
    location: 'Boston, MA'
  },
  {
    name: 'Maria Santos',
    role: 'Brand Strategy Lead',
    company: 'Luxury Resorts International',
    content: 'The experience design and brand transformation exceeded our expectations. Guest satisfaction scores increased by 60% and our brand now stands out in the luxury market.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face&auto=format',
    location: 'Miami, FL'
  },
  {
    name: 'Robert Chen',
    role: 'Operations Manager',
    company: 'ManufacturePro',
    content: 'Their business consulting and process optimization saved us $2.3M annually. The operational excellence framework they implemented is now our competitive advantage.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=100&h=100&fit=crop&crop=face&auto=format',
    location: 'Detroit, MI'
  }
];

const stats = [
  { label: 'Projects Completed', value: '100+' },
  { label: 'Client Satisfaction', value: '98%' },
  { label: 'Global Reach', value: '50+' },
  { label: 'Innovation Awards', value: '5+' }
];

// Featured projects for homepage showcase
const featuredProjects = [
  {
    id: 1,
    title: 'QuantumAI - Predictive Analytics',
    description: 'Revolutionary AI platform that predicts market trends with 94% accuracy using quantum computing algorithms.',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop&crop=center',
    metrics: {
      accuracy: '94% prediction accuracy',
      revenue: '$2.4M client savings'
    },
    date: '2024'
  },
  {
    id: 2,
    title: 'GlobalCorp - Digital Transformation',
    description: 'Comprehensive digital transformation strategy for multinational corporation across 15 countries.',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center',
    metrics: {
      efficiency: '45% efficiency improvement',
      countries: '15 countries transformed'
    },
    date: '2024'
  },
  {
    id: 3,
    title: 'Luxury Resort - Brand Experience',
    description: 'Complete brand redesign and experiential strategy for luxury resort chain.',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&crop=center',
    metrics: {
      satisfaction: '60% satisfaction increase',
      revenue: '35% revenue per guest increase'
    },
    date: '2024'
  }
];

export const HomePage: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    // Initialize GSAP animations here if needed
    // ScrollTrigger setup can be added here

    // Auto-rotate testimonials every 5 seconds
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(testimonialInterval);
  }, []);

  // Get 3 testimonials to display (current and next 2)
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonial + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Our <span className="text-primary-400">Dual-Domain</span> Expertise
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              We bridge the gap between cutting-edge technology and creative excellence, 
              delivering comprehensive solutions that drive innovation and growth.
            </p>
          </motion.div>

          {/* Tech Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-2xl font-semibold text-primary-400 mb-8 text-center">
              Technology Innovation Lab
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.tech.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to="/tech-solutions">
                      <Card 
                        variant="cyber" 
                        hoverable
                        className="h-full group cursor-pointer"
                      >
                        <CardContent className="p-6 space-y-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-white">
                            {service.title}
                          </h4>
                          <p className="text-neutral-300 text-sm">
                            {service.description}
                          </p>
                          <ul className="space-y-1">
                            {service.features.map((feature) => (
                              <li key={feature} className="text-xs text-primary-300 flex items-center">
                                <Star className="w-3 h-3 mr-2 fill-current" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Non-Tech Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-accent-400 mb-8 text-center">
              Creative Impact Studio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.nonTech.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to="/non-tech-solutions">
                      <Card 
                        variant="cyber" 
                        hoverable
                        className="h-full group cursor-pointer border-accent-500/30"
                      >
                      <CardContent className="p-6 space-y-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                          {service.title}
                        </h4>
                        <p className="text-neutral-300 text-sm">
                          {service.description}
                        </p>
                        <ul className="space-y-1">
                          {service.features.map((feature) => (
                            <li key={feature} className="text-xs text-accent-300 flex items-center">
                              <Star className="w-3 h-3 mr-2 fill-current" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="primary" size="lg">
              View All Solutions
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Featured <span className="text-primary-400">Innovation</span> Projects
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Discover how we transform bold ideas into market-leading solutions that drive real business impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="cyber" hoverable className="h-full group">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        project.type === 'tech' 
                          ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                          : 'bg-accent-500/20 text-accent-300 border border-accent-500/30'
                      }`}>
                        {project.type === 'tech' ? 'Tech Innovation' : 'Creative Solutions'}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-neutral-300 text-sm line-clamp-3">
                        {project.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                          <div key={key} className="text-center bg-neutral-800/50 rounded-lg p-2">
                            <div className="text-sm font-semibold text-primary-400">{String(value)}</div>
                            <div className="text-xs text-neutral-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-neutral-500">{project.date}</span>
                        <div className="flex items-center space-x-1 text-yellow-400">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-xs">Featured</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/projects">
              <Button variant="primary" size="lg">
                View All Projects
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-950 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-display">
              What Our <span className="text-primary-400">Clients</span> Say
            </h2>
            <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what industry leaders 
              have to say about working with Tactnova.
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <div className="relative">
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${currentTestimonial}-${index}`}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${index === 1 ? 'md:scale-105 md:z-10' : 'md:scale-100'} transition-all duration-500`}
                >
                  <Card variant="glass" className="h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-accent-500"></div>
                    <CardContent className="p-6 space-y-4">
                      <Quote className="w-8 h-8 text-primary-400 opacity-60" />
                      
                      <p className="text-neutral-300 text-sm leading-relaxed italic line-clamp-4">
                        "{testimonial.content}"
                      </p>
                      
                      <div className="flex items-center space-x-1 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-3 pt-4 border-t border-neutral-700">
                        <div className="relative">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-primary-500/30"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-neutral-900 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm truncate">
                            {testimonial.name}
                          </div>
                          <div className="text-primary-400 font-medium text-xs truncate">
                            {testimonial.role}
                          </div>
                          <div className="text-xs text-neutral-400 truncate">
                            {testimonial.company}
                          </div>
                          <div className="text-xs text-neutral-500 mt-1 truncate">
                            📍 {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-primary-500 scale-110' 
                      : 'bg-neutral-600 hover:bg-neutral-500'
                  }`}
                />
              ))}
            </div>

            {/* Auto-rotation indicator */}
            <div className="flex items-center justify-center mt-3 text-xs text-neutral-500">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></div>
                <span>Auto-rotating every 5 seconds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-neutral-900 to-neutral-800 border-t border-neutral-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display">
              Ready to Transform Your <span className="text-primary-400">Vision</span>?
            </h2>
            <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
              Let's discuss how Tactnova can accelerate your growth with our 
              dual-domain expertise. Get a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
