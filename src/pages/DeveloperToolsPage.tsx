import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Zap, Download, GitBranch, Wrench, Cpu, Cloud, Shield, Rocket, Play } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  features: string[];
  downloadUrl: string;
  documentation: string;
  language: string[];
  status: 'stable' | 'beta' | 'alpha';
}

const tools: Tool[] = [
  {
    id: 'tactnova-cli',
    name: 'TactNova CLI',
    description: 'Command-line interface for managing TactNova projects, deployments, and API interactions',
    category: 'Command Line',
    icon: <Terminal className="w-8 h-8" />,
    features: ['Project scaffolding', 'API testing', 'Deployment automation', 'Real-time monitoring'],
    downloadUrl: 'https://cli.tactnova.com/download',
    documentation: '/docs/cli',
    language: ['TypeScript', 'Node.js'],
    status: 'stable'
  },
  {
    id: 'quantum-simulator',
    name: 'Quantum Simulator SDK',
    description: 'Local quantum circuit simulation and debugging toolkit with error correction',
    category: 'Quantum Computing',
    icon: <Cpu className="w-8 h-8" />,
    features: ['Circuit visualization', 'Error correction', 'Performance profiling', 'Cloud sync'],
    downloadUrl: 'https://quantum.tactnova.com/sdk',
    documentation: '/docs/quantum-sdk',
    language: ['Python', 'Qiskit', 'Cirq'],
    status: 'beta'
  },
  {
    id: 'ai-devkit',
    name: 'AI Development Kit',
    description: 'Comprehensive toolkit for building, training, and deploying AI models with TactNova infrastructure',
    category: 'AI & Machine Learning',
    icon: <Zap className="w-8 h-8" />,
    features: ['Model templates', 'AutoML pipelines', 'Edge deployment', 'A/B testing'],
    downloadUrl: 'https://ai.tactnova.com/devkit',
    documentation: '/docs/ai-devkit',
    language: ['Python', 'TensorFlow', 'PyTorch'],
    status: 'stable'
  },
  {
    id: 'security-scanner',
    name: 'Security Scanner',
    description: 'Advanced vulnerability scanning and penetration testing toolkit for enterprise applications',
    category: 'Cybersecurity',
    icon: <Shield className="w-8 h-8" />,
    features: ['Static analysis', 'Dynamic testing', 'Compliance checks', 'Threat modeling'],
    downloadUrl: 'https://security.tactnova.com/scanner',
    documentation: '/docs/security-scanner',
    language: ['Python', 'Go', 'JavaScript'],
    status: 'stable'
  },
  {
    id: 'blockchain-devkit',
    name: 'Blockchain DevKit',
    description: 'Smart contract development, testing, and deployment platform with multi-chain support',
    category: 'Blockchain',
    icon: <GitBranch className="w-8 h-8" />,
    features: ['Smart contract templates', 'Gas optimization', 'Cross-chain deployment', 'Security auditing'],
    downloadUrl: 'https://blockchain.tactnova.com/devkit',
    documentation: '/docs/blockchain-devkit',
    language: ['Solidity', 'Rust', 'JavaScript'],
    status: 'beta'
  },
  {
    id: 'creative-toolkit',
    name: 'Creative Automation Toolkit',
    description: 'AI-powered creative asset generation and brand management tools for designers and marketers',
    category: 'Creative Solutions',
    icon: <Wrench className="w-8 h-8" />,
    features: ['Asset generation', 'Brand compliance', 'Content optimization', 'Workflow automation'],
    downloadUrl: 'https://creative.tactnova.com/toolkit',
    documentation: '/docs/creative-toolkit',
    language: ['Python', 'JavaScript', 'GraphQL'],
    status: 'alpha'
  }
];

const categories = Array.from(new Set(tools.map(tool => tool.category)));

export const DeveloperToolsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-500';
      case 'beta': return 'bg-yellow-500';
      case 'alpha': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

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
              <Code className="w-4 h-4 mr-2" />
              Developer Resources
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent">
              Developer Tools & SDKs
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Accelerate your development with our comprehensive suite of tools, SDKs, and frameworks designed for the future of technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tools Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Download className="w-8 h-8 text-primary-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">500K+</div>
              <div className="text-neutral-400">Downloads</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <GitBranch className="w-8 h-8 text-accent-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-neutral-400">Contributors</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Cloud className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-neutral-400">Uptime</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Rocket className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-neutral-400">Support</div>
            </motion.div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Terminal className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search tools and SDKs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500"
              />
            </div>
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
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl border border-primary-500/30 text-primary-300">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                      <span className="text-sm text-neutral-400">{tool.category}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getStatusColor(tool.status)}`}>
                    {tool.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-neutral-300 mb-4">{tool.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-200 mb-2">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tool.features.map(feature => (
                        <div key={feature} className="flex items-center gap-2 text-sm text-neutral-400">
                          <div className="w-1.5 h-1.5 bg-primary-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-neutral-200 mb-2">Languages & Frameworks:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.language.map(lang => (
                        <span key={lang} className="px-2 py-1 bg-neutral-800 border border-neutral-600 rounded text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="primary"
                      className="flex-1 bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-neutral-600 hover:border-primary-500 flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Try Online
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Installation Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-primary-400" />
              Quick Start Guide
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3">1. Install TactNova CLI</h4>
                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                  <pre className="text-green-300 font-mono text-sm">
                    <code>{`# Install via npm
npm install -g @tactnova/cli

# Or via curl
curl -fsSL https://cli.tactnova.com/install.sh | sh`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">2. Authenticate</h4>
                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                  <pre className="text-green-300 font-mono text-sm">
                    <code>{`tactnova auth login
# Follow the prompts to authenticate with your TactNova account`}</code>
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3">3. Create Your First Project</h4>
                <div className="bg-neutral-950 border border-neutral-700 rounded-lg p-4">
                  <pre className="text-green-300 font-mono text-sm">
                    <code>{`tactnova create my-project --template ai-starter
cd my-project
tactnova dev`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button variant="primary" className="bg-primary-600 hover:bg-primary-700">
                View Full Documentation
              </Button>
              <Button variant="outline" className="border-neutral-600 hover:border-primary-500">
                Join Discord Community
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperToolsPage;
