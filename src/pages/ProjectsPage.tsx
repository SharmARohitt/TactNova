import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  ExternalLink, 
  Github, 
  Calendar,
  Zap,
  Brain,
  Shield,
  Palette,
  Video,
  Camera,
  FileText,
  Star,
  TrendingUp,
  Cpu,
  Target,
  Megaphone,
  Settings,
  Heart
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const categories = [
  { id: 'all', label: 'All Projects', count: 48 },
  { id: 'tech', label: 'Tech Innovation', count: 24 },
  { id: 'non-tech', label: 'Creative Solutions', count: 24 },
  { id: 'ai', label: 'AI & ML', count: 8 },
  { id: 'web', label: 'Web Development', count: 7 },
  { id: 'mobile', label: 'Mobile Apps', count: 5 },
  { id: 'branding', label: 'Brand Identity', count: 8 },
  { id: 'strategy', label: 'Strategy', count: 6 },
  { id: 'marketing', label: 'Marketing', count: 4 },
  { id: 'operations', label: 'Operations', count: 3 },
  { id: 'iot', label: 'IoT Solutions', count: 4 },
  { id: 'blockchain', label: 'Blockchain', count: 3 },
];

const projects = [
  {
    id: 1,
    title: 'QuantumAI - Predictive Analytics Platform',
    description: 'Revolutionary AI platform that predicts market trends with 94% accuracy using quantum computing algorithms, transforming financial decision-making across global markets.',
    category: 'ai',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop&crop=center',
    technologies: ['Python', 'TensorFlow', 'Quantum Computing', 'React', 'Node.js', 'D3.js'],
    metrics: {
      accuracy: '94% prediction accuracy',
      revenue: '$2.4M client savings',
      users: '50K+ active users',
      roi: '320% average ROI'
    },
    client: 'FinTech Innovations',
    date: '2024',
    featured: true,
    impact: 'Revolutionized quantitative trading for 15+ hedge funds, processing $2B+ daily transactions.',
    links: {
      live: 'https://quantumai-demo.com',
      github: 'https://github.com/tactnova/quantumai'
    }
  },
  {
    id: 2,
    title: 'CyberShield Pro - Enterprise Security Suite',
    description: 'Comprehensive cybersecurity solution protecting 1000+ enterprises from advanced persistent threats with AI-powered threat detection and real-time response systems.',
    category: 'tech',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop&crop=center',
    technologies: ['Rust', 'Go', 'Docker', 'Kubernetes', 'ML Detection', 'Zero Trust'],
    metrics: {
      threats: '99.7% threat prevention',
      response: '< 30s detection time',
      coverage: '1000+ enterprises',
      savings: '$50M+ breach prevention'
    },
    client: 'SecureEnterprise Inc.',
    date: '2024',
    featured: true,
    impact: 'Prevented 50,000+ cyber attacks, saving clients over $50M in potential breach costs.',
    links: {
      live: 'https://cybershield-demo.com'
    }
  },
  {
    id: 3,
    title: 'SmartGrid - IoT Energy Management',
    description: 'AI-driven IoT platform optimizing energy consumption for smart cities, reducing power waste by 40% through predictive analytics and automated grid management.',
    category: 'iot',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=400&fit=crop&crop=center',
    technologies: ['IoT Sensors', 'Edge Computing', 'Machine Learning', 'Time Series DB', 'MQTT'],
    metrics: {
      efficiency: '40% energy savings',
      cities: '25+ smart cities',
      sensors: '100K+ IoT devices',
      carbon: '2M tons CO2 reduced'
    },
    client: 'GreenCity Solutions',
    date: '2024',
    featured: true,
    impact: 'Deployed across 25 cities, managing 100,000+ IoT sensors and reducing carbon footprint by 2M tons.',
    links: {
      live: 'https://smartgrid-demo.com'
    }
  },
  {
    id: 4,
    title: 'NeuralNet - AI Customer Service Platform',
    description: 'Advanced conversational AI platform providing 24/7 customer support with 95% resolution rate, integrating natural language processing and sentiment analysis.',
    category: 'ai',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&crop=center',
    technologies: ['GPT-4', 'NLP', 'Sentiment Analysis', 'WebRTC', 'React Native', 'MongoDB'],
    metrics: {
      resolution: '95% first-call resolution',
      satisfaction: '4.8/5 customer rating',
      reduction: '70% support costs',
      languages: '25+ languages'
    },
    client: 'CustomerFirst Corp',
    date: '2024',
    featured: true,
    impact: 'Handled 2M+ customer interactions, reducing support costs by 70% while improving satisfaction.',
    links: {
      live: 'https://neuralnet-ai.com'
    }
  },
  {
    id: 5,
    title: 'EcoVision - Sustainability Brand Identity',
    description: 'Complete brand transformation for a clean energy startup, creating a powerful visual identity that increased brand recognition by 400% and secured Series A funding.',
    category: 'branding',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center',
    technologies: ['Adobe Creative Suite', 'Figma', 'Cinema 4D', 'After Effects', 'Brand Strategy'],
    metrics: {
      recognition: '400% brand awareness',
      engagement: '250% social engagement',
      conversion: '180% lead conversion',
      funding: '$15M Series A secured'
    },
    client: 'EcoVision Energy',
    date: '2024',
    featured: true,
    impact: 'Brand redesign directly contributed to securing $15M Series A funding and 400% increase in brand recognition.',
    links: {
      live: 'https://ecovision-brand.com'
    }
  },
  {
    id: 6,
    title: 'MedFlow - Healthcare Management System',
    description: 'AI-powered healthcare platform streamlining patient care and reducing administrative overhead by 60%, HIPAA-compliant with predictive health analytics.',
    category: 'web',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center',
    technologies: ['React', 'Node.js', 'MongoDB', 'AI/ML', 'HIPAA Compliant', 'HL7 FHIR'],
    metrics: {
      efficiency: '60% admin efficiency',
      satisfaction: '98% patient satisfaction',
      hospitals: '150+ hospitals',
      time: '45% reduced wait times'
    },
    client: 'MedFlow Solutions',
    date: '2023',
    featured: true,
    impact: 'Deployed in 150+ hospitals, improving patient care for 500K+ patients and reducing wait times by 45%.',
    links: {
      live: 'https://medflow-demo.com'
    }
  },
  {
    id: 7,
    title: 'FinTech Pro - Mobile Banking Revolution',
    description: 'Next-generation mobile banking app with biometric security, AI financial advisor, and seamless UX that attracted 2M+ users within 6 months of launch.',
    category: 'mobile',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center',
    technologies: ['React Native', 'Biometric Auth', 'AI/ML', 'Blockchain', 'Cloud Functions'],
    metrics: {
      users: '2M+ active users',
      transactions: '$500M+ processed',
      rating: '4.9/5 app store rating',
      growth: '300% user growth rate'
    },
    client: 'NextGen Bank',
    date: '2024',
    featured: true,
    impact: 'Disrupted traditional banking with 2M+ users and $500M+ in transactions processed safely.',
    links: {
      live: 'https://fintechpro-app.com'
    }
  },
  {
    id: 8,
    title: 'Creative Studio - Portfolio Rebrand',
    description: 'Complete digital transformation for creative agency, developing new brand identity, website, and marketing strategy that tripled their client acquisition rate.',
    category: 'branding',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop&crop=center',
    technologies: ['Brand Design', 'UI/UX', 'Motion Graphics', 'Content Strategy', 'SEO'],
    metrics: {
      clients: '300% client increase',
      revenue: '$2M revenue growth',
      awards: '5 design awards won',
      traffic: '500% website traffic'
    },
    client: 'Artisan Creative Studio',
    date: '2024',
    featured: false,
    impact: 'Transformed boutique agency into industry leader with 300% client growth and $2M revenue increase.',
    links: {
      live: 'https://artisan-creative.com'
    }
  },
  {
    id: 9,
    title: 'DroneVision - Autonomous Surveillance',
    description: 'AI-powered drone surveillance system for smart city security, featuring real-time threat detection, facial recognition, and automated incident response.',
    category: 'ai',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=400&fit=crop&crop=center',
    technologies: ['Computer Vision', 'Edge AI', 'Drone SDK', 'Real-time Analytics', 'Cloud Integration'],
    metrics: {
      coverage: '100 sq km monitored',
      incidents: '99% incident detection',
      response: '2min average response',
      cities: '12 cities deployed'
    },
    client: 'SafeCity Solutions',
    date: '2023',
    featured: false,
    impact: 'Deployed across 12 cities, monitoring 100+ sq km and achieving 99% incident detection accuracy.',
    links: {
      live: 'https://dronevision-security.com'
    }
  },
  {
    id: 10,
    title: 'E-Commerce NextGen Platform',
    description: 'Revolutionary e-commerce platform with AI-powered recommendations, AR try-on features, and voice commerce that increased conversion rates by 250%.',
    category: 'web',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'AI Recommendations', 'AR/VR', 'Voice UI', 'Microservices'],
    metrics: {
      conversion: '250% conversion increase',
      revenue: '$10M+ monthly GMV',
      users: '1M+ active users',
      performance: '2s page load time'
    },
    client: 'RetailTech Giants',
    date: '2023',
    featured: false,
    impact: 'Generated $10M+ monthly GMV with innovative AR features and AI-powered personalization.',
    links: {
      live: 'https://ecommerce-nextgen.com'
    }
  },
  {
    id: 11,
    title: 'MarketingAI - Automation Suite',
    description: 'Comprehensive marketing automation platform using AI to optimize campaigns, personalize content, and predict customer behavior with 85% accuracy.',
    category: 'ai',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
    technologies: ['Machine Learning', 'Predictive Analytics', 'Marketing APIs', 'Real-time Personalization'],
    metrics: {
      campaigns: '10K+ campaigns managed',
      accuracy: '85% prediction accuracy',
      roi: '400% average campaign ROI',
      automation: '90% workflow automation'
    },
    client: 'Marketing Innovators',
    date: '2023',
    featured: false,
    impact: 'Managed 10,000+ marketing campaigns with 400% average ROI and 85% prediction accuracy.',
    links: {
      live: 'https://marketingai-suite.com'
    }
  },
  {
    id: 12,
    title: 'VR Training - Immersive Learning Platform',
    description: 'Virtual reality training platform for enterprise skill development, reducing training time by 60% while improving retention rates to 95%.',
    category: 'tech',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop&crop=center',
    technologies: ['Unity 3D', 'VR SDK', 'Cloud Computing', 'Analytics Dashboard', 'LMS Integration'],
    metrics: {
      retention: '95% knowledge retention',
      time: '60% training time reduction',
      employees: '50K+ trained',
      satisfaction: '4.8/5 user rating'
    },
    client: 'Corporate Learning Corp',
    date: '2023',
    featured: false,
    impact: 'Trained 50,000+ employees with 95% knowledge retention and 60% time savings.',
    links: {
      live: 'https://vr-training-platform.com'
    }
  },
  {
    id: 13,
    title: 'Blockchain Supply Chain Tracker',
    description: 'Transparent supply chain management using blockchain technology, providing end-to-end traceability and reducing counterfeit products by 95%.',
    category: 'blockchain',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop&crop=center',
    technologies: ['Ethereum', 'Smart Contracts', 'IPFS', 'QR Codes', 'Supply Chain APIs'],
    metrics: {
      traceability: '100% product tracking',
      counterfeit: '95% reduction',
      companies: '200+ supply chains',
      transactions: '1M+ tracked items'
    },
    client: 'Global Supply Solutions',
    date: '2023',
    featured: false,
    impact: 'Tracking 1M+ products across 200+ supply chains, reducing counterfeits by 95%.',
    links: {
      live: 'https://blockchain-supply.com'
    }
  },
  {
    id: 14,
    title: 'Content Creator - Personal Brand Identity',
    description: 'Complete personal branding solution for digital content creator, including logo design, social media strategy, and content templates that grew following by 800%.',
    category: 'branding',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
    technologies: ['Brand Strategy', 'Social Media Design', 'Content Templates', 'Video Editing'],
    metrics: {
      followers: '800% follower growth',
      engagement: '450% engagement rate',
      sponsorships: '$500K+ deal value',
      reach: '10M+ monthly reach'
    },
    client: 'Digital Creator Pro',
    date: '2024',
    featured: false,
    impact: 'Transformed personal brand resulting in 800% follower growth and $500K+ in sponsorship deals.',
    links: {
      live: 'https://digitalcreator-pro.com'
    }
  },
  {
    id: 15,
    title: 'Stellar - Cryptocurrency Trading Platform',
    description: 'Advanced trading platform with real-time analytics, automated trading strategies, and institutional-grade security handling $500M+ daily volume.',
    category: 'web',
    type: 'tech',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'TypeScript', 'WebSocket', 'Blockchain', 'TradingView', 'Redis'],
    metrics: {
      volume: '$500M+ daily volume',
      users: '100K+ active traders',
      uptime: '99.99% uptime',
      latency: '<10ms execution'
    },
    client: 'Stellar Trading',
    date: '2023',
    featured: false,
    impact: 'Processing $500M+ daily trading volume with institutional-grade performance and security.',
    links: {
      live: 'https://stellar-trading.com'
    }
  },
  {
    id: 16,
    title: 'NovaBrand - Tech Startup Visual Identity',
    description: 'Futuristic brand identity for AI startup, creating a memorable visual presence that helped secure $10M Series A funding and win design awards.',
    category: 'branding',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1634007463940-c00b6eb8f896?w=600&h=400&fit=crop&crop=center',
    technologies: ['Brand Strategy', 'Logo Design', 'Motion Graphics', 'UI Design', 'Brand Guidelines'],
    metrics: {
      funding: '$10M Series A secured',
      recognition: '3 design awards',
      growth: '500% website traffic',
      conversion: '200% lead conversion'
    },
    client: 'NovaBrand AI',
    date: '2023',
    featured: false,
    impact: 'Brand identity directly contributed to $10M Series A funding and multiple design awards.',
    links: {
      live: 'https://novabrand-ai.com'
    }
  },
  {
    id: 17,
    title: 'GlobalCorp - Digital Transformation Strategy',
    description: 'Comprehensive digital transformation strategy for multinational corporation, modernizing operations across 15 countries and achieving 45% efficiency improvement.',
    category: 'strategy',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop&crop=center',
    technologies: ['Change Management', 'Process Optimization', 'Strategic Planning', 'Cultural Transformation'],
    metrics: {
      efficiency: '45% efficiency improvement',
      countries: '15 countries transformed',
      employees: '50K+ employees trained',
      savings: '$25M annual savings'
    },
    client: 'GlobalCorp Industries',
    date: '2024',
    featured: true,
    impact: 'Led digital transformation across 15 countries, training 50,000+ employees and achieving $25M in annual savings.',
    links: {
      live: 'https://globalcorp-transformation.com'
    }
  },
  {
    id: 18,
    title: 'Luxury Resort - Premium Brand Experience',
    description: 'Complete brand redesign and experiential strategy for luxury resort chain, increasing guest satisfaction by 60% and revenue per guest by 35%.',
    category: 'branding',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop&crop=center',
    technologies: ['Brand Strategy', 'Experience Design', 'Interior Design Consultation', 'Customer Journey Mapping'],
    metrics: {
      satisfaction: '60% guest satisfaction increase',
      revenue: '35% revenue per guest increase',
      bookings: '80% repeat bookings',
      awards: '5 hospitality awards won'
    },
    client: 'Azure Luxury Resorts',
    date: '2024',
    featured: true,
    impact: 'Transformed luxury hospitality experience, winning 5 industry awards and achieving 80% repeat bookings.',
    links: {
      live: 'https://azure-luxury-resorts.com'
    }
  },
  {
    id: 19,
    title: 'Tech Startup - Growth Marketing Strategy',
    description: 'Data-driven growth marketing strategy for SaaS startup, achieving 500% user growth and $10M ARR within 18 months through innovative customer acquisition.',
    category: 'marketing',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
    technologies: ['Growth Hacking', 'Content Marketing', 'Performance Analytics', 'Conversion Optimization'],
    metrics: {
      growth: '500% user growth',
      arr: '$10M ARR achieved',
      acquisition: '70% lower CAC',
      retention: '95% customer retention'
    },
    client: 'InnovateSaaS',
    date: '2024',
    featured: true,
    impact: 'Drove explosive growth from startup to $10M ARR with innovative marketing strategies and 95% retention.',
    links: {
      live: 'https://innovatesaas.com'
    }
  },
  {
    id: 20,
    title: 'Manufacturing - Operational Excellence Program',
    description: 'Lean manufacturing and operational excellence implementation across 8 facilities, reducing waste by 50% and increasing productivity by 35%.',
    category: 'operations',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop&crop=center',
    technologies: ['Lean Six Sigma', 'Process Optimization', 'Quality Management', 'Performance Analytics'],
    metrics: {
      waste: '50% waste reduction',
      productivity: '35% productivity increase',
      facilities: '8 facilities transformed',
      savings: '$15M annual savings'
    },
    client: 'ProManufacturing Corp',
    date: '2023',
    featured: false,
    impact: 'Transformed manufacturing operations across 8 facilities, achieving $15M in annual savings.',
    links: {
      live: 'https://promanufacturing.com'
    }
  },
  {
    id: 21,
    title: 'Healthcare Network - Patient Experience Redesign',
    description: 'Comprehensive patient experience strategy for healthcare network, reducing wait times by 40% and improving satisfaction scores to 98%.',
    category: 'experience',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop&crop=center',
    technologies: ['Service Design', 'Patient Journey Mapping', 'Process Improvement', 'Staff Training'],
    metrics: {
      waitTime: '40% wait time reduction',
      satisfaction: '98% patient satisfaction',
      efficiency: '30% operational efficiency',
      staff: '95% staff satisfaction'
    },
    client: 'HealthFirst Network',
    date: '2023',
    featured: false,
    impact: 'Revolutionized patient experience across healthcare network, achieving 98% satisfaction and 40% faster service.',
    links: {
      live: 'https://healthfirst-network.com'
    }
  },
  {
    id: 22,
    title: 'Financial Services - Cultural Transformation',
    description: 'Organization-wide cultural transformation for financial services firm, improving employee engagement by 70% and reducing turnover by 50%.',
    category: 'strategy',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center',
    technologies: ['Change Management', 'Leadership Development', 'Cultural Assessment', 'Employee Engagement'],
    metrics: {
      engagement: '70% engagement increase',
      turnover: '50% turnover reduction',
      productivity: '25% productivity boost',
      retention: '90% talent retention'
    },
    client: 'Premier Financial Group',
    date: '2023',
    featured: false,
    impact: 'Led cultural transformation resulting in 70% higher engagement and 90% talent retention.',
    links: {
      live: 'https://premier-financial.com'
    }
  },
  {
    id: 23,
    title: 'E-commerce - Brand Repositioning Strategy',
    description: 'Complete brand repositioning for struggling e-commerce platform, resulting in 300% sales increase and successful market expansion into 12 new countries.',
    category: 'branding',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
    technologies: ['Brand Strategy', 'Market Research', 'Competitive Analysis', 'International Expansion'],
    metrics: {
      sales: '300% sales increase',
      expansion: '12 new countries',
      recognition: '85% brand recognition',
      market: '40% market share gain'
    },
    client: 'GlobalShop Platform',
    date: '2024',
    featured: false,
    impact: 'Repositioned struggling e-commerce brand, achieving 300% sales growth and expansion to 12 countries.',
    links: {
      live: 'https://globalshop-platform.com'
    }
  },
  {
    id: 24,
    title: 'Media Company - Content Strategy Revolution',
    description: 'Revolutionary content strategy and audience development for media company, growing viewership by 400% and increasing ad revenue by 250%.',
    category: 'content',
    type: 'non-tech',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
    technologies: ['Content Strategy', 'Audience Analytics', 'Social Media Strategy', 'Brand Storytelling'],
    metrics: {
      viewership: '400% viewership growth',
      revenue: '250% ad revenue increase',
      engagement: '180% engagement boost',
      reach: '50M+ monthly reach'
    },
    client: 'NextGen Media',
    date: '2024',
    featured: false,
    impact: 'Revolutionized content strategy achieving 400% viewership growth and 50M+ monthly reach.',
    links: {
      live: 'https://nextgen-media.com'
    }
  }
];

const iconMap: Record<string, any> = {
  ai: Brain,
  tech: Zap,
  web: ExternalLink,
  mobile: ExternalLink,
  branding: Palette,
  security: Shield,
  video: Video,
  photo: Camera,
  docs: FileText,
  iot: Cpu,
  blockchain: Shield,
  strategy: Target,
  marketing: Megaphone,
  operations: Settings,
  experience: Heart,
  content: FileText,
};

export const ProjectsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredProjects = projects
    .filter(project => {
      let matchesCategory = false;
      
      if (selectedCategory === 'all') {
        matchesCategory = true;
      } else if (selectedCategory === 'tech') {
        matchesCategory = project.type === 'tech';
      } else if (selectedCategory === 'non-tech') {
        matchesCategory = project.type === 'non-tech';
      } else {
        matchesCategory = project.category === selectedCategory;
      }
      
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.date.localeCompare(a.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const featuredProjects = projects.filter(p => p.featured);

  return (
    <div className="min-h-screen pt-16 bg-neutral-950">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              Our <span className="text-primary-400">Innovation</span> Portfolio
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Explore our diverse portfolio of cutting-edge projects spanning technology innovation 
              and creative excellence. Each project showcases our commitment to transforming ideas into reality.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-primary-500/20 px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4 text-primary-400" />
                <span className="text-primary-300">1000+ Projects Delivered</span>
              </div>
              <div className="flex items-center space-x-2 bg-accent-500/20 px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-accent-400" />
                <span className="text-accent-300">98% Client Satisfaction</span>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Award-Winning Innovation</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center font-display">
              Featured <span className="text-primary-400">Projects</span>
            </h2>
            <p className="text-neutral-300 text-center max-w-2xl mx-auto">
              Spotlight on our most impactful and innovative projects that have driven 
              significant results for our clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 6).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-neutral-300 text-sm line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-neutral-800 text-neutral-300 text-xs rounded"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-neutral-700 text-neutral-400 text-xs rounded">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Business Impact */}
                      <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-3">
                        <h5 className="text-sm font-semibold text-primary-300 mb-1">Business Impact</h5>
                        <p className="text-xs text-neutral-300">{project.impact}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-3 border-t border-neutral-700">
                        {Object.entries(project.metrics).slice(0, 4).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-sm font-semibold text-primary-400">{value}</div>
                            <div className="text-xs text-neutral-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4">
                        <div className="flex items-center space-x-2 text-sm text-neutral-400">
                          <Calendar className="w-4 h-4" />
                          <span>{project.date}</span>
                        </div>
                        <div className="flex space-x-2">
                          {project.links.live && (
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                          {project.links.github && (
                            <Button variant="ghost" size="sm">
                              <Github className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <h2 className="text-3xl font-bold text-white font-display">
                All Projects
              </h2>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:border-primary-500 focus:outline-none"
                />
                
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:border-primary-500 focus:outline-none"
                >
                  <option value="date">Sort by Date</option>
                  <option value="title">Sort by Title</option>
                  <option value="featured">Sort by Featured</option>
                </select>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mt-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => {
                const Icon = iconMap[project.category] || Zap;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card variant="glass" hoverable className="h-full group">
                      <div className="relative overflow-hidden rounded-t-xl">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <div className="w-8 h-8 bg-primary-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-primary-500/30">
                            <Icon className="w-4 h-4 text-primary-400" />
                          </div>
                        </div>
                        {project.featured && (
                          <div className="absolute top-4 right-4">
                            <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-neutral-300 text-sm line-clamp-2">
                            {project.description}
                          </p>

                          {/* Impact Summary */}
                          <div className="bg-accent-500/10 border border-accent-500/20 rounded p-2">
                            <p className="text-xs text-accent-300 font-medium">
                              Impact: {project.impact}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 2).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-neutral-800/50 text-neutral-400 text-xs rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-3">
                            <span className="text-xs text-neutral-500">{project.date}</span>
                            <div className="flex space-x-1">
                              {project.links.live && (
                                <Button variant="ghost" size="sm">
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              )}
                              {project.links.github && (
                                <Button variant="ghost" size="sm">
                                  <Github className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Filter className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-neutral-400 mb-2">
                No projects found
              </h3>
              <p className="text-neutral-500">
                Try adjusting your filters or search terms.
              </p>
            </motion.div>
          )}
        </div>
      </section>

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
              Ready to Join Our Success Stories?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Let's create the next featured project together. Transform your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Start Your Project
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Download Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
