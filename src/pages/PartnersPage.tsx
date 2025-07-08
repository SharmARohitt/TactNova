import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Users, Globe, Award, Star, ArrowRight, Building, Zap, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  tier: 'platinum' | 'gold' | 'silver' | 'startup';
  website: string;
  caseStudy?: string;
  technologies: string[];
  location: string;
  employees: string;
  founded: string;
}

const partners: Partner[] = [
  {
    id: 'quantum-innovations',
    name: 'Quantum Innovations Ltd.',
    logo: '/api/placeholder/200/100',
    description: 'Leading quantum computing research and development company, pioneering next-generation quantum algorithms and hardware solutions.',
    category: 'Quantum Computing',
    tier: 'platinum',
    website: 'https://quantum-innovations.com',
    caseStudy: '/case-studies/quantum-innovations',
    technologies: ['Quantum Computing', 'Qiskit', 'Cirq', 'IBM Quantum'],
    location: 'Boston, USA',
    employees: '500-1000',
    founded: '2018'
  },
  {
    id: 'nexus-ai',
    name: 'Nexus AI Corporation',
    logo: '/api/placeholder/200/100',
    description: 'Enterprise AI platform providing advanced machine learning solutions for Fortune 500 companies across multiple industries.',
    category: 'Artificial Intelligence',
    tier: 'platinum',
    website: 'https://nexus-ai.com',
    caseStudy: '/case-studies/nexus-ai',
    technologies: ['Machine Learning', 'TensorFlow', 'PyTorch', 'MLOps'],
    location: 'San Francisco, USA',
    employees: '1000-5000',
    founded: '2015'
  },
  {
    id: 'cyber-fortress',
    name: 'CyberFortress Security',
    logo: '/api/placeholder/200/100',
    description: 'Global cybersecurity leader specializing in zero-trust architecture and advanced threat detection for critical infrastructure.',
    category: 'Cybersecurity',
    tier: 'gold',
    website: 'https://cyberfortress.com',
    technologies: ['Zero Trust', 'SIEM', 'Threat Intelligence', 'Penetration Testing'],
    location: 'London, UK',
    employees: '100-500',
    founded: '2017'
  },
  {
    id: 'blockchain-dynamics',
    name: 'Blockchain Dynamics',
    logo: '/api/placeholder/200/100',
    description: 'Innovative blockchain solutions provider focusing on DeFi, NFTs, and enterprise blockchain infrastructure.',
    category: 'Blockchain',
    tier: 'gold',
    website: 'https://blockchain-dynamics.com',
    technologies: ['Ethereum', 'Solidity', 'DeFi', 'Smart Contracts'],
    location: 'Singapore',
    employees: '50-100',
    founded: '2019'
  },
  {
    id: 'creative-minds',
    name: 'Creative Minds Studio',
    logo: '/api/placeholder/200/100',
    description: 'Award-winning creative agency specializing in immersive brand experiences and digital storytelling for global brands.',
    category: 'Creative Solutions',
    tier: 'silver',
    website: 'https://creative-minds.com',
    technologies: ['Adobe Creative Suite', 'Blender', 'Unity', 'AR/VR'],
    location: 'Mumbai, India',
    employees: '25-50',
    founded: '2020'
  },
  {
    id: 'tech-startup-accelerator',
    name: 'TechStart Accelerator',
    logo: '/api/placeholder/200/100',
    description: 'Premier startup accelerator program empowering the next generation of tech entrepreneurs with funding and mentorship.',
    category: 'Startup Ecosystem',
    tier: 'startup',
    website: 'https://techstart-accelerator.com',
    technologies: ['Startup Incubation', 'Venture Capital', 'Mentorship', 'Networking'],
    location: 'Bangalore, India',
    employees: '10-25',
    founded: '2021'
  }
];

const partnershipBenefits = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Technology Integration',
    description: 'Deep technical integration with our platforms and APIs for seamless collaboration.'
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Co-Marketing Opportunities',
    description: 'Joint marketing campaigns, events, and thought leadership content creation.'
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: 'Certification Programs',
    description: 'Exclusive access to TactNova certification and training programs for your team.'
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Business Development',
    description: 'Priority access to new business opportunities and strategic initiatives.'
  }
];

const tierColors = {
  platinum: 'from-gray-300 to-gray-100',
  gold: 'from-yellow-400 to-yellow-200',
  silver: 'from-gray-400 to-gray-200',
  startup: 'from-green-400 to-green-200'
};

export const PartnersPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');

  const categories = Array.from(new Set(partners.map(partner => partner.category)));
  const tiers = Array.from(new Set(partners.map(partner => partner.tier)));

  const filteredPartners = partners.filter(partner => {
    const matchesCategory = selectedCategory === 'all' || partner.category === selectedCategory;
    const matchesTier = selectedTier === 'all' || partner.tier === selectedTier;
    return matchesCategory && matchesTier;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-neutral-950 via-primary-950/20 to-accent-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-medium">
              <Handshake className="w-4 h-4 mr-2" />
              Strategic Partnerships
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent">
              Our Global Partners
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Collaborating with industry leaders to drive innovation and deliver exceptional solutions across technology and creative domains.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partnership Stats */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Building className="w-8 h-8 text-primary-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">150+</div>
              <div className="text-neutral-400">Global Partners</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Globe className="w-8 h-8 text-accent-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">45</div>
              <div className="text-neutral-400">Countries</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">25</div>
              <div className="text-neutral-400">Platinum Partners</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white">98%</div>
              <div className="text-neutral-400">Success Rate</div>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Tiers</option>
              {tiers.map(tier => (
                <option key={tier} value={tier}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</option>
              ))}
            </select>
          </div>

          {/* Partners Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredPartners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700">
                      <Building className="w-8 h-8 text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{partner.name}</h3>
                      <span className="text-sm text-neutral-400">{partner.category}</span>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium text-neutral-800 bg-gradient-to-r ${tierColors[partner.tier]}`}>
                    {partner.tier.toUpperCase()}
                  </div>
                </div>

                <p className="text-neutral-300 mb-4">{partner.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Location:</span>
                    <span className="text-white">{partner.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Employees:</span>
                    <span className="text-white">{partner.employees}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Founded:</span>
                    <span className="text-white">{partner.founded}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-neutral-200 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {partner.technologies.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-neutral-800 border border-neutral-600 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="primary"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-2"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  {partner.caseStudy && (
                    <Button
                      variant="outline"
                      className="border-neutral-600 hover:border-primary-500"
                    >
                      Case Study
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Partnership Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gradient-to-br from-primary-600/20 to-accent-600/20 border border-primary-500/30 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-2xl font-bold text-center mb-8">Partnership Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipBenefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="text-center space-y-3"
                >
                  <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white">
                    {benefit.icon}
                  </div>
                  <h4 className="font-semibold text-white">{benefit.title}</h4>
                  <p className="text-sm text-neutral-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Become a Partner CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Become a TactNova Partner</h3>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Join our global ecosystem of innovators and help shape the future of technology. We're always looking for strategic partners who share our vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="bg-primary-600 hover:bg-primary-700">
                Apply for Partnership
              </Button>
              <Button variant="outline" className="border-neutral-600 hover:border-primary-500">
                Download Partner Kit
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
