import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Globe, 
  Users, 
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const milestones = [
  {
    year: '2024',
    title: 'Foundation & Planning',
    description: 'Conceived dual-niche innovation approach and strategic planning',
    status: 'completed'
  },
  {
    year: '2025',
    title: 'Official Launch',
    description: 'Platform launch with core tech and creative services',
    status: 'current'
  },
  {
    year: '2026',
    title: 'Global Expansion',
    description: 'International markets and partnership development',
    status: 'upcoming'
  },
  {
    year: '2027',
    title: 'Innovation Hub',
    description: 'Establishing R&D centers and incubation programs',
    status: 'upcoming'
  }
];

const globalPresence = [
  {
    region: 'India',
    city: 'New Delhi',
    status: 'headquarters',
    description: 'Primary operations and development center',
    active: true
  },
  {
    region: 'North America',
    city: 'Coming Soon',
    status: 'planned',
    description: 'Strategic expansion for US market',
    active: false
  },
  {
    region: 'Europe',
    city: 'Coming Soon',
    status: 'planned',
    description: 'European operations and partnerships',
    active: false
  },
  {
    region: 'Asia-Pacific',
    city: 'Coming Soon',
    status: 'planned',
    description: 'Regional hub for APAC markets',
    active: false
  }
];

const values = [
  {
    icon: Target,
    title: 'Innovation First',
    description: 'We prioritize cutting-edge solutions that push the boundaries of what\'s possible.'
  },
  {
    icon: Zap,
    title: 'Dual Excellence',
    description: 'Mastering both technical precision and creative brilliance in every project.'
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Building solutions that make a difference across industries and borders.'
  },
  {
    icon: Users,
    title: 'Client Success',
    description: 'Your success is our mission. We\'re committed to delivering exceptional results.'
  }
];

export const AboutPage: React.FC = () => {
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
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Tactnova</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Pioneering the future of dual-niche innovation, where cutting-edge technology 
              meets creative excellence to transform ideas into impactful solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="primary" size="lg">
                  Get in Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/about/team">
                <Button variant="outline" size="lg">
                  Meet Our Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card variant="cyber" className="h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-6">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                  <p className="text-neutral-300 text-lg leading-relaxed">
                    To revolutionize the innovation landscape by seamlessly bridging the gap between 
                    technical excellence and creative mastery. We empower businesses to achieve 
                    unprecedented growth through our dual-niche approach, delivering solutions that 
                    are both technologically advanced and creatively compelling.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card variant="cyber" className="h-full">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
                  <p className="text-neutral-300 text-lg leading-relaxed">
                    To become the global leader in dual-niche innovation, setting new standards 
                    for what's possible when technology and creativity converge. We envision a 
                    future where every business can access world-class solutions that drive both 
                    operational excellence and creative differentiation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
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
              Meet Our Founder
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Visionary leadership driving innovation across technology and creativity
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card variant="cyber" hoverable>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-48 h-48 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-6xl font-bold text-white">RS</span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">Rohit Sharma</h3>
                    <p className="text-primary-400 font-semibold mb-4">Founder & CEO</p>
                    <p className="text-neutral-300 text-lg leading-relaxed mb-6">
                      Pioneering the convergence of technology and creativity, Rohit brings a unique 
                      vision to the innovation landscape. With expertise spanning AI development, 
                      full-stack engineering, and creative strategy, he leads Tactnova's mission 
                      to deliver exceptional dual-niche solutions that transform businesses and 
                      drive meaningful impact.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                        AI & ML Expert
                      </span>
                      <span className="px-3 py-1 bg-accent-500/20 text-accent-300 rounded-full text-sm">
                        Creative Strategist
                      </span>
                      <span className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded-full text-sm">
                        Innovation Leader
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
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
              Our Core Values
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Tactnova
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" hoverable className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {value.title}
                      </h3>
                      <p className="text-neutral-300">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
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
              Our Journey
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Milestones in our mission to revolutionize dual-niche innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  variant="cyber" 
                  hoverable 
                  className={`h-full ${milestone.status === 'current' ? 'border-primary-400' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 text-primary-400 mr-2" />
                      <span className="text-2xl font-bold text-white">{milestone.year}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {milestone.title}
                    </h3>
                    <p className="text-neutral-300 text-sm mb-4">
                      {milestone.description}
                    </p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      milestone.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                      milestone.status === 'current' ? 'bg-primary-500/20 text-primary-300' :
                      'bg-neutral-600/20 text-neutral-400'
                    }`}>
                      {milestone.status === 'completed' ? 'Completed' :
                       milestone.status === 'current' ? 'In Progress' : 'Planned'}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
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
              Global Presence
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Building a worldwide network of innovation and excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalPresence.map((location, index) => (
              <motion.div
                key={location.region}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card 
                  variant="cyber" 
                  hoverable 
                  className={`h-full ${location.active ? 'border-primary-400' : 'opacity-60'}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <MapPin className={`w-5 h-5 mr-2 ${location.active ? 'text-primary-400' : 'text-neutral-500'}`} />
                      <span className="text-xl font-bold text-white">{location.region}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {location.city}
                    </h3>
                    <p className="text-neutral-300 text-sm mb-4">
                      {location.description}
                    </p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      location.status === 'headquarters' ? 'bg-primary-500/20 text-primary-300' :
                      'bg-neutral-600/20 text-neutral-400'
                    }`}>
                      {location.status === 'headquarters' ? 'Headquarters' : 'Coming Soon'}
                    </span>
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
              Ready to Transform Your Business?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join the innovation revolution. Let's create something extraordinary together 
              with our dual-niche approach to technology and creativity.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/tech-solutions">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Explore Solutions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
