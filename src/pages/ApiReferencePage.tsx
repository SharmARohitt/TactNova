import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Search, Key, Zap, Shield, Clock, Copy, Check } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  description: string;
  parameters?: string[];
  response: string;
  authentication: boolean;
  category: string;
}

const apiEndpoints: APIEndpoint[] = [
  {
    method: 'GET',
    endpoint: '/api/v1/ai/analyze',
    description: 'Analyze data using our advanced AI models for pattern recognition and insights',
    parameters: ['data', 'model_type', 'analysis_depth'],
    response: '{ "insights": [...], "confidence": 0.95, "recommendations": [...] }',
    authentication: true,
    category: 'AI & Machine Learning'
  },
  {
    method: 'POST',
    endpoint: '/api/v1/quantum/simulate',
    description: 'Execute quantum algorithm simulations with error correction',
    parameters: ['circuit', 'qubits', 'shots', 'noise_model'],
    response: '{ "result": {...}, "fidelity": 0.98, "execution_time": "2.3s" }',
    authentication: true,
    category: 'Quantum Computing'
  },
  {
    method: 'GET',
    endpoint: '/api/v1/security/scan',
    description: 'Comprehensive security vulnerability scanning and threat assessment',
    parameters: ['target', 'scan_type', 'depth_level'],
    response: '{ "vulnerabilities": [...], "risk_score": 7.2, "mitigation": [...] }',
    authentication: true,
    category: 'Cybersecurity'
  },
  {
    method: 'POST',
    endpoint: '/api/v1/creative/generate',
    description: 'Generate brand assets, content, and creative materials using AI',
    parameters: ['content_type', 'brand_guidelines', 'specifications'],
    response: '{ "assets": [...], "variations": [...], "brand_compliance": 0.92 }',
    authentication: true,
    category: 'Creative Solutions'
  },
  {
    method: 'GET',
    endpoint: '/api/v1/analytics/insights',
    description: 'Real-time business intelligence and predictive analytics',
    parameters: ['metrics', 'timeframe', 'granularity'],
    response: '{ "trends": [...], "predictions": [...], "actionable_insights": [...] }',
    authentication: true,
    category: 'Business Intelligence'
  },
  {
    method: 'POST',
    endpoint: '/api/v1/blockchain/deploy',
    description: 'Deploy smart contracts and blockchain solutions',
    parameters: ['contract_code', 'network', 'gas_limit'],
    response: '{ "contract_address": "0x...", "transaction_hash": "0x...", "status": "deployed" }',
    authentication: true,
    category: 'Blockchain'
  }
];

const categories = Array.from(new Set(apiEndpoints.map(endpoint => endpoint.category)));

export const ApiReferencePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null);

  const filteredEndpoints = apiEndpoints.filter(endpoint => {
    const matchesCategory = selectedCategory === 'all' || endpoint.category === selectedCategory;
    const matchesSearch = endpoint.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(text);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-500';
      case 'POST': return 'bg-blue-500';
      case 'PUT': return 'bg-yellow-500';
      case 'DELETE': return 'bg-red-500';
      case 'PATCH': return 'bg-purple-500';
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
              API Documentation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent">
              TactNova API Reference
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Integrate cutting-edge AI, quantum computing, cybersecurity, and creative solutions into your applications with our powerful REST API.
            </p>
          </motion.div>
        </div>
      </section>

      {/* API Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Shield className="w-8 h-8 text-primary-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-neutral-400">OAuth 2.0, API keys, and enterprise-grade encryption for all endpoints.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Zap className="w-8 h-8 text-accent-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">High Performance</h3>
              <p className="text-neutral-400">Sub-100ms response times with global CDN and intelligent caching.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-6 rounded-2xl border border-neutral-700"
            >
              <Clock className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">99.9% Uptime</h3>
              <p className="text-neutral-400">Guaranteed availability with redundant infrastructure and monitoring.</p>
            </motion.div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search endpoints..."
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

          {/* API Endpoints */}
          <div className="space-y-6">
            {filteredEndpoints.map((endpoint, index) => (
              <motion.div
                key={`${endpoint.method}-${endpoint.endpoint}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-6 hover:border-primary-500/50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-lg text-white text-sm font-medium ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-primary-300 font-mono text-lg">
                        {endpoint.endpoint}
                      </code>
                      <button
                        onClick={() => copyToClipboard(endpoint.endpoint)}
                        className="p-1 hover:bg-neutral-700 rounded transition-colors"
                      >
                        {copiedEndpoint === endpoint.endpoint ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-neutral-400" />
                        )}
                      </button>
                    </div>
                    
                    <p className="text-neutral-300 mb-4">{endpoint.description}</p>
                    
                    <div className="space-y-3">
                      {endpoint.parameters && (
                        <div>
                          <h4 className="text-sm font-semibold text-neutral-200 mb-2">Parameters:</h4>
                          <div className="flex flex-wrap gap-2">
                            {endpoint.parameters.map(param => (
                              <span key={param} className="px-3 py-1 bg-neutral-800 border border-neutral-600 rounded-lg text-sm">
                                {param}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-200 mb-2">Response:</h4>
                        <pre className="bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-sm overflow-x-auto">
                          <code className="text-green-300">{endpoint.response}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className="px-3 py-1 bg-accent-500/20 border border-accent-500/30 rounded-full text-accent-300 text-sm">
                      {endpoint.category}
                    </span>
                    {endpoint.authentication && (
                      <div className="flex items-center gap-1 text-sm text-yellow-400">
                        <Key className="w-4 h-4" />
                        Auth Required
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Get Started Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center bg-gradient-to-br from-primary-600/20 to-accent-600/20 border border-primary-500/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Join thousands of developers building the future with TactNova's APIs. Get your API key and start integrating in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" className="bg-primary-600 hover:bg-primary-700">
                Get API Key
              </Button>
              <Button variant="outline" className="border-neutral-600 hover:border-primary-500">
                View Examples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ApiReferencePage;
