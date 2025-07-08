import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  User,
  ArrowRight,
  Search,
  Eye,
  Clock,
  BookOpen,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Brain
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const whitepapers = [
  {
    id: 1,
    title: 'The Future of AI in Business: A Comprehensive Guide to Intelligent Automation',
    category: 'Artificial Intelligence',
    description: 'Explore how AI is transforming modern businesses, from customer service automation to predictive analytics and decision-making processes.',
    author: 'Dr. Sarah Chen',
    publishDate: '2025-01-15',
    readTime: '25 min',
    downloads: '2.3K',
    featured: true,
    preview: 'This comprehensive whitepaper examines the current state of AI adoption in enterprise environments, providing actionable insights for business leaders looking to implement intelligent automation solutions.',
    icon: Brain,
    tags: ['AI', 'Machine Learning', 'Business Strategy', 'Automation']
  },
  {
    id: 2,
    title: 'Cybersecurity in the Age of Remote Work: Best Practices and Framework',
    category: 'Cybersecurity',
    description: 'A detailed analysis of cybersecurity challenges in distributed work environments and proven strategies to protect digital assets.',
    author: 'Michael Rodriguez',
    publishDate: '2025-01-10',
    readTime: '18 min',
    downloads: '1.8K',
    featured: true,
    preview: 'As remote work becomes the norm, organizations face unprecedented security challenges. This whitepaper provides a comprehensive framework for securing distributed workforces.',
    icon: Shield,
    tags: ['Cybersecurity', 'Remote Work', 'Data Protection', 'Risk Management']
  },
  {
    id: 3,
    title: 'Building Scalable Web Applications: Modern Architecture Patterns',
    category: 'Full-Stack Development',
    description: 'Modern approaches to building scalable, maintainable web applications using microservices, cloud architecture, and containerization.',
    author: 'Emily Johnson',
    publishDate: '2024-12-20',
    readTime: '22 min',
    downloads: '1.5K',
    featured: false,
    preview: 'This technical whitepaper covers essential architecture patterns for building web applications that can scale from thousands to millions of users.',
    icon: Globe,
    tags: ['Web Development', 'Microservices', 'Cloud Computing', 'DevOps']
  },
  {
    id: 4,
    title: 'Brand Identity in the Digital Age: Psychology and Design Principles',
    category: 'Creative Strategy',
    description: 'Understanding the psychological impact of brand identity and how to create memorable, effective brand experiences in digital environments.',
    author: 'David Kim',
    publishDate: '2024-12-15',
    readTime: '20 min',
    downloads: '1.2K',
    featured: false,
    preview: 'Explore the intersection of psychology and design in creating powerful brand identities that resonate with modern consumers across digital touchpoints.',
    icon: Zap,
    tags: ['Branding', 'Design Psychology', 'Digital Marketing', 'User Experience']
  },
  {
    id: 5,
    title: 'Quantum Computing: Practical Applications for Enterprise Solutions',
    category: 'Emerging Technologies',
    description: 'An in-depth look at quantum computing applications that are ready for enterprise adoption and their potential business impact.',
    author: 'Dr. Alex Chen',
    publishDate: '2024-12-05',
    readTime: '30 min',
    downloads: '980',
    featured: false,
    preview: 'Quantum computing is moving from theoretical to practical. This whitepaper examines real-world applications and implementation strategies for forward-thinking enterprises.',
    icon: TrendingUp,
    tags: ['Quantum Computing', 'Enterprise Technology', 'Innovation', 'Future Tech']
  },
  {
    id: 6,
    title: 'Content Strategy Revolution: Data-Driven Approaches to Audience Engagement',
    category: 'Content Marketing',
    description: 'Leveraging analytics and user behavior data to create content strategies that drive engagement and conversion.',
    author: 'Lisa Park',
    publishDate: '2024-11-28',
    readTime: '16 min',
    downloads: '1.4K',
    featured: false,
    preview: 'Transform your content strategy with data-driven insights. This whitepaper reveals how to use analytics to create content that truly resonates with your audience.',
    icon: BookOpen,
    tags: ['Content Marketing', 'Data Analytics', 'Audience Engagement', 'Digital Strategy']
  }
];

const categories = ['All', 'Artificial Intelligence', 'Cybersecurity', 'Full-Stack Development', 'Creative Strategy', 'Emerging Technologies', 'Content Marketing'];

export const WhitepapersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredWhitepapers = whitepapers.filter(paper => {
    const matchesSearch = paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         paper.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || paper.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPapers = whitepapers.filter(paper => paper.featured);

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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Whitepapers</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Deep insights and research on the latest trends in technology, design, and innovation. 
              Download our comprehensive guides to stay ahead of the curve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <Input
                  type="text"
                  placeholder="Search whitepapers by title, topic, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3"
                  variant="cyber"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Whitepapers */}
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
              Featured Research
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Our most comprehensive and impactful research papers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPapers.map((paper, index) => {
              const Icon = paper.icon;
              return (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" hoverable className="h-full group border-primary-400/30">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="inline-block px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm font-medium mb-2">
                            Featured
                          </span>
                          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                            {paper.title}
                          </h3>
                          <p className="text-accent-400 text-sm font-medium">{paper.category}</p>
                        </div>
                      </div>

                      <p className="text-neutral-300 mb-6 leading-relaxed">
                        {paper.preview}
                      </p>

                      <div className="flex items-center justify-between text-sm text-neutral-400 mb-6">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {paper.author}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(paper.publishDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {paper.readTime}
                          </div>
                          <div className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {paper.downloads}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {paper.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="primary" className="flex-1">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Whitepapers */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              All Research Papers
            </h2>
            <p className="text-neutral-300">
              {filteredWhitepapers.length} whitepapers found
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWhitepapers.map((paper, index) => {
              const Icon = paper.icon;
              return (
                <motion.div
                  key={paper.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" hoverable className="h-full group">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <span className="text-accent-400 text-sm font-medium">{paper.category}</span>
                          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-400 transition-colors line-clamp-2">
                            {paper.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-neutral-300 text-sm mb-4 line-clamp-3">
                        {paper.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-neutral-400 mb-4">
                        <span>{paper.author}</span>
                        <span>{paper.readTime}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-neutral-400">
                          <Download className="w-3 h-3 mr-1" />
                          {paper.downloads} downloads
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredWhitepapers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FileText className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
              <p className="text-neutral-400 text-lg">
                No whitepapers found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Updated with Latest Research
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Get notified when we publish new whitepapers and research insights. 
              Be the first to access cutting-edge knowledge in technology and innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg">
                Subscribe to Updates
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                View All Resources
                <BookOpen className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
