import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Brain, Shield, Layers, Palette, Video, Target, TrendingUp, 
  ArrowRight, Zap, Globe, Code,
  ChevronDown, CheckCircle, Star
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

interface Solution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  icon: React.ReactNode;
  category: 'tech' | 'creative';
  features: string[];
  technologies: string[];
  useCases: string[];
  pricing: {
    starter: string;
    pro: string;
    enterprise: string;
  };
  caseStudies: number;
  clientSuccess: string;
  gradient: string;
}

const solutions: Solution[] = [
  {
    id: 'quantum-ai-fusion',
    title: 'Quantum-Enhanced AI Systems',
    subtitle: 'Where quantum computing meets artificial intelligence',
    description: 'Revolutionary AI models powered by quantum algorithms that solve problems classical computers cannot touch.',
    detailedDescription: 'Our Quantum-Enhanced AI Systems represent the bleeding edge of computational intelligence. By harnessing quantum superposition and entanglement, we create AI models that process information in ways previously thought impossible. These systems can solve optimization problems with millions of variables in seconds, predict market anomalies with unprecedented accuracy, and discover patterns in chaotic data that escape traditional analysis.',
    icon: <Brain className="w-8 h-8" />,
    category: 'tech',
    features: [
      'Quantum-accelerated machine learning',
      'Exponential speedup for complex optimization',
      'Quantum error correction integration',
      'Hybrid classical-quantum architectures'
    ],
    technologies: ['Qiskit', 'TensorFlow Quantum', 'Cirq', 'IBM Quantum'],
    useCases: [
      'Financial portfolio optimization',
      'Drug discovery and molecular simulation',
      'Climate modeling and prediction',
      'Cryptographic protocol development'
    ],
    pricing: {
      starter: '$50,000/month',
      pro: '$150,000/month',
      enterprise: 'Custom pricing'
    },
    caseStudies: 12,
    clientSuccess: '340% increase in problem-solving efficiency',
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    id: 'neural-cybersecurity',
    title: 'Neural Threat Intelligence',
    subtitle: 'Predictive cybersecurity powered by deep learning',
    description: 'AI-driven security systems that predict, prevent, and neutralize cyber threats before they materialize.',
    detailedDescription: 'Our Neural Threat Intelligence platform transforms cybersecurity from reactive defense to predictive protection. Using advanced neural networks and behavioral analysis, we create digital immune systems that learn from every interaction, predict attack patterns, and automatically evolve countermeasures. The system operates at the speed of thought, identifying zero-day exploits and advanced persistent threats in real-time.',
    icon: <Shield className="w-8 h-8" />,
    category: 'tech',
    features: [
      'Real-time threat prediction',
      'Autonomous incident response',
      'Behavioral anomaly detection',
      'Zero-trust architecture implementation'
    ],
    technologies: ['PyTorch', 'SIEM Integration', 'Graph Neural Networks', 'Kubernetes'],
    useCases: [
      'Enterprise network protection',
      'Cloud infrastructure security',
      'IoT device protection',
      'Financial fraud prevention'
    ],
    pricing: {
      starter: '$25,000/month',
      pro: '$75,000/month',
      enterprise: 'Custom pricing'
    },
    caseStudies: 28,
    clientSuccess: '95% reduction in successful cyber attacks',
    gradient: 'from-red-600 to-orange-600'
  },
  {
    id: 'blockchain-ecosystem',
    title: 'Decentralized Innovation Platforms',
    subtitle: 'Building the infrastructure for Web3 and beyond',
    description: 'Comprehensive blockchain solutions that power decentralized applications, smart contracts, and digital economies.',
    detailedDescription: 'Our Decentralized Innovation Platforms create the foundation for the next generation of internet applications. We architect blockchain ecosystems that seamlessly integrate with existing infrastructure while enabling revolutionary new business models. From DeFi protocols to NFT marketplaces, our platforms handle billions in transaction value while maintaining security, scalability, and user experience.',
    icon: <Layers className="w-8 h-8" />,
    category: 'tech',
    features: [
      'Cross-chain interoperability',
      'Smart contract automation',
      'Decentralized identity management',
      'Tokenomics design and implementation'
    ],
    technologies: ['Solidity', 'Ethereum', 'Polygon', 'IPFS'],
    useCases: [
      'DeFi protocol development',
      'NFT marketplace creation',
      'Supply chain transparency',
      'Decentralized governance systems'
    ],
    pricing: {
      starter: '$30,000/month',
      pro: '$100,000/month',
      enterprise: 'Custom pricing'
    },
    caseStudies: 15,
    clientSuccess: '$2.5B in transaction volume processed',
    gradient: 'from-green-600 to-teal-600'
  },
  {
    id: 'immersive-brand-realities',
    title: 'Immersive Brand Realities',
    subtitle: 'Crafting experiences that transcend physical boundaries',
    description: 'Revolutionary brand experiences using AR, VR, and mixed reality that create emotional connections impossible in traditional media.',
    detailedDescription: 'Our Immersive Brand Realities service transforms how customers interact with brands by creating parallel universes where products come alive, stories unfold in three dimensions, and customers become active participants in brand narratives. We design experiences that blur the line between digital and physical, creating memories that last a lifetime and driving unprecedented engagement metrics.',
    icon: <Palette className="w-8 h-8" />,
    category: 'creative',
    features: [
      'AR/VR experience design',
      'Interactive 3D environments',
      'Haptic feedback integration',
      'Multi-sensory brand activation'
    ],
    technologies: ['Unity', 'Unreal Engine', 'WebXR', 'ARKit/ARCore'],
    useCases: [
      'Virtual product launches',
      'Immersive retail experiences',
      'Training and education programs',
      'Entertainment and gaming'
    ],
    pricing: {
      starter: '$20,000/month',
      pro: '$60,000/month',
      enterprise: 'Custom pricing'
    },
    caseStudies: 22,
    clientSuccess: '850% increase in brand engagement',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 'neural-content-engines',
    title: 'Neural Content Engines',
    subtitle: 'AI-powered content that thinks, feels, and adapts',
    description: 'Intelligent content systems that understand context, emotion, and intent to create personalized experiences at scale.',
    detailedDescription: 'Our Neural Content Engines represent the evolution of content creation from static messaging to dynamic, living narratives. These AI systems understand not just what to say, but how to say it, when to say it, and to whom. They adapt tone, style, and messaging in real-time based on audience psychology, market conditions, and brand objectives, creating content that resonates on a deeply personal level.',
    icon: <Video className="w-8 h-8" />,
    category: 'creative',
    features: [
      'Real-time content adaptation',
      'Emotion-driven storytelling',
      'Multi-modal content generation',
      'Performance-based optimization'
    ],
    technologies: ['GPT-4', 'DALL-E', 'Stable Diffusion', 'Natural Language Processing'],
    useCases: [
      'Personalized marketing campaigns',
      'Dynamic video production',
      'Interactive storytelling',
      'Automated social media management'
    ],
    pricing: {
      starter: '$15,000/month',
      pro: '$45,000/month',
      enterprise: 'Custom pricing'
    },
    caseStudies: 35,
    clientSuccess: '420% increase in content engagement',
    gradient: 'from-indigo-600 to-blue-600'
  },
  {
    id: 'strategic-intelligence-networks',
    title: 'Strategic Intelligence Networks',
    subtitle: 'Business intelligence that predicts the future',
    description: 'Advanced analytics platforms that combine market data, human psychology, and AI predictions to guide strategic decisions.',
    detailedDescription: 'Our Strategic Intelligence Networks transform business decision-making from intuition-based to intelligence-driven. By weaving together market signals, consumer behavior patterns, competitive intelligence, and predictive modeling, we create comprehensive strategic frameworks that anticipate market shifts months before they occur. Leaders using our systems consistently outperform their competitors by making informed decisions with unprecedented foresight.',
    icon: <Target className="w-8 h-8" />,
    category: 'creative',
    features: [
      'Predictive market modeling',
      'Competitive intelligence automation',
      'Consumer psychology analysis',
      'Strategic scenario planning'
    ],
    technologies: ['Apache Spark', 'TensorFlow', 'Power BI', 'Python Analytics'],
    useCases: [
      'Market expansion strategy',
      'Product development roadmaps',
      'Investment decision support',
      'Risk assessment and mitigation'
    ],
    pricing: {
      starter: '$25,000/month',
      pro: '$75,000/month',
      enterprise: 'Custom pricing'
    },
    caseStudies: 18,
    clientSuccess: '180% improvement in strategic accuracy',
    gradient: 'from-yellow-600 to-orange-600'
  }
];

export const SolutionsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'tech' | 'creative'>('all');
  const [expandedSolution, setExpandedSolution] = useState<string | null>(null);

  const filteredSolutions = solutions.filter(solution => 
    activeCategory === 'all' || solution.category === activeCategory
  );

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
              <Zap className="w-4 h-4 mr-2" />
              Transformative Solutions
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent">
              Solutions That Redefine Possible
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Breakthrough technologies and creative innovations that don't just solve today's challenges—they anticipate tomorrow's opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-4 mb-12">
            {[
              { key: 'all', label: 'All Solutions', icon: <Globe className="w-4 h-4" /> },
              { key: 'tech', label: 'Technology', icon: <Cpu className="w-4 h-4" /> },
              { key: 'creative', label: 'Creative', icon: <Palette className="w-4 h-4" /> }
            ].map(category => (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-primary-600 border-primary-500 text-white'
                    : 'border-neutral-600 text-neutral-300 hover:border-primary-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Solutions Grid */}
          <div className="space-y-8">
            {filteredSolutions.map((solution, index) => (
              <motion.div
                key={solution.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Main Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`p-4 rounded-2xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center text-white shadow-lg`}>
                          {solution.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-white">{solution.title}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              solution.category === 'tech' 
                                ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' 
                                : 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                            }`}>
                              {solution.category.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-lg text-primary-300 font-medium mb-3">{solution.subtitle}</p>
                          <p className="text-neutral-300 text-lg leading-relaxed">{solution.description}</p>
                        </div>
                      </div>

                      {/* Key Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-neutral-400">Case Studies</span>
                          </div>
                          <div className="text-xl font-bold text-white">{solution.caseStudies}+</div>
                        </div>
                        <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-neutral-400">Client Success</span>
                          </div>
                          <div className="text-sm font-bold text-white">{solution.clientSuccess}</div>
                        </div>
                        <div className="bg-neutral-800/50 p-4 rounded-xl border border-neutral-700">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-primary-400" />
                            <span className="text-sm text-neutral-400">Starting at</span>
                          </div>
                          <div className="text-sm font-bold text-white">{solution.pricing.starter}</div>
                        </div>
                      </div>

                      {/* Quick Features */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {solution.features.slice(0, 4).map(feature => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-sm text-neutral-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                          variant="primary"
                          className={`bg-gradient-to-r ${solution.gradient} hover:shadow-lg transition-all duration-300 flex items-center gap-2`}
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          className="border-neutral-600 hover:border-primary-500"
                        >
                          View Case Studies
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedSolution(
                            expandedSolution === solution.id ? null : solution.id
                          )}
                          className="border-neutral-600 hover:border-primary-500 flex items-center gap-2"
                        >
                          <span>Technical Details</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            expandedSolution === solution.id ? 'rotate-180' : ''
                          }`} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Technical Details */}
                  {expandedSolution === solution.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 pt-8 border-t border-neutral-700"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary-300">Deep Dive</h4>
                          <p className="text-neutral-300 text-sm leading-relaxed">{solution.detailedDescription}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary-300">Technologies</h4>
                          <div className="space-y-2">
                            {solution.technologies.map(tech => (
                              <div key={tech} className="flex items-center gap-2">
                                <Code className="w-3 h-3 text-accent-400" />
                                <span className="text-sm text-neutral-300">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-primary-300">Use Cases</h4>
                          <div className="space-y-2">
                            {solution.useCases.map(useCase => (
                              <div key={useCase} className="flex items-center gap-2">
                                <Target className="w-3 h-3 text-green-400" />
                                <span className="text-sm text-neutral-300">{useCase}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center bg-gradient-to-br from-primary-600/20 to-accent-600/20 border border-primary-500/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h3>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Discover how our revolutionary solutions can solve your most complex challenges and unlock unprecedented opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" className="bg-primary-600 hover:bg-primary-700">
                  Schedule Consultation
                </Button>
              </Link>
              <Button variant="outline" className="border-neutral-600 hover:border-primary-500">
                Download Solution Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
