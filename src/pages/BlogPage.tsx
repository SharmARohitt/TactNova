import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Clock, Search, TrendingUp, Eye, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  featured: boolean;
  views: number;
  comments: number;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'quantum-computing-breakthrough',
    title: 'Quantum Computing Breakthrough: Achieving 99.9% Fidelity in Error Correction',
    excerpt: 'Our latest research demonstrates unprecedented error correction capabilities in quantum systems, bringing us closer to fault-tolerant quantum computing.',
    content: '',
    author: {
      name: 'Dr. Rohit Sharma',
      avatar: '/api/placeholder/40/40',
      role: 'Founder & CEO'
    },
    publishedAt: '2024-01-15',
    readTime: 8,
    category: 'Quantum Computing',
    tags: ['Quantum', 'Error Correction', 'Research', 'Innovation'],
    featured: true,
    views: 15420,
    comments: 234,
    image: '/api/placeholder/800/400'
  },
  {
    id: 'ai-ethics-framework',
    title: 'Building Ethical AI: Our Comprehensive Framework for Responsible Development',
    excerpt: 'Exploring the principles and practices that guide our approach to developing AI systems that are fair, transparent, and beneficial for humanity.',
    content: '',
    author: {
      name: 'Dr. Rohit Sharma',
      avatar: '/api/placeholder/40/40',
      role: 'Founder & CEO'
    },
    publishedAt: '2024-01-12',
    readTime: 12,
    category: 'Artificial Intelligence',
    tags: ['AI Ethics', 'Responsible AI', 'Framework', 'Guidelines'],
    featured: true,
    views: 12850,
    comments: 189,
    image: '/api/placeholder/800/400'
  },
  {
    id: 'cybersecurity-trends-2024',
    title: 'Cybersecurity Trends 2024: Zero Trust Architecture and Beyond',
    excerpt: 'An in-depth analysis of emerging cybersecurity threats and the evolution of zero-trust security models in enterprise environments.',
    content: '',
    author: {
      name: 'Dr. Rohit Sharma',
      avatar: '/api/placeholder/40/40',
      role: 'Founder & CEO'
    },
    publishedAt: '2024-01-10',
    readTime: 10,
    category: 'Cybersecurity',
    tags: ['Zero Trust', 'Security', 'Enterprise', 'Trends'],
    featured: false,
    views: 9840,
    comments: 156,
    image: '/api/placeholder/800/400'
  },
  {
    id: 'creative-ai-revolution',
    title: 'The Creative AI Revolution: Transforming Brand Storytelling',
    excerpt: 'How artificial intelligence is revolutionizing creative processes and enabling brands to tell more compelling, personalized stories.',
    content: '',
    author: {
      name: 'Dr. Rohit Sharma',
      avatar: '/api/placeholder/40/40',
      role: 'Founder & CEO'
    },
    publishedAt: '2024-01-08',
    readTime: 7,
    category: 'Creative Solutions',
    tags: ['Creative AI', 'Branding', 'Storytelling', 'Innovation'],
    featured: false,
    views: 7650,
    comments: 98,
    image: '/api/placeholder/800/400'
  },
  {
    id: 'blockchain-enterprise-adoption',
    title: 'Enterprise Blockchain Adoption: Lessons from Real-World Implementations',
    excerpt: 'Key insights and best practices derived from successful blockchain implementations across various enterprise sectors.',
    content: '',
    author: {
      name: 'Dr. Rohit Sharma',
      avatar: '/api/placeholder/40/40',
      role: 'Founder & CEO'
    },
    publishedAt: '2024-01-05',
    readTime: 9,
    category: 'Blockchain',
    tags: ['Blockchain', 'Enterprise', 'Implementation', 'Case Study'],
    featured: false,
    views: 6420,
    comments: 87,
    image: '/api/placeholder/800/400'
  },
  {
    id: 'future-of-work-ai',
    title: 'The Future of Work: How AI is Reshaping Industries',
    excerpt: 'Examining the transformative impact of AI on various industries and the implications for the future workforce.',
    content: '',
    author: {
      name: 'Dr. Rohit Sharma',
      avatar: '/api/placeholder/40/40',
      role: 'Founder & CEO'
    },
    publishedAt: '2024-01-03',
    readTime: 11,
    category: 'Industry Insights',
    tags: ['Future of Work', 'AI Impact', 'Industry', 'Transformation'],
    featured: false,
    views: 5890,
    comments: 72,
    image: '/api/placeholder/800/400'
  }
];

const categories = Array.from(new Set(blogPosts.map(post => post.category)));
const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
              <TrendingUp className="w-4 h-4 mr-2" />
              Tech Insights & Innovation
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-primary-200 to-accent-200 bg-clip-text text-transparent">
              TactNova Blog
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Insights, trends, and breakthrough innovations from the frontiers of technology and creative solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8"
          >
            Featured Articles
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="aspect-video bg-neutral-800 flex items-center justify-center border-b border-neutral-700">
                  <TrendingUp className="w-16 h-16 text-neutral-600" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-xs font-medium">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {post.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-300 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-neutral-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">{post.author.name}</div>
                        <div className="text-xs text-neutral-400">{post.author.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime} min
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
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

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    selectedTag === tag
                      ? 'bg-primary-500 border-primary-500 text-white'
                      : 'border-neutral-600 text-neutral-300 hover:border-primary-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 group"
              >
                <div className="aspect-video bg-neutral-800 flex items-center justify-center border-b border-neutral-700">
                  <TrendingUp className="w-12 h-12 text-neutral-600" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-accent-500/20 border border-accent-500/30 rounded text-accent-300 text-xs">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-neutral-400">
                      <Clock className="w-3 h-3" />
                      {post.readTime} min
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center bg-gradient-to-br from-primary-600/20 to-accent-600/20 border border-primary-500/30 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
              Get the latest insights on technology trends, innovation breakthroughs, and industry analysis delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-primary-500"
              />
              <Button variant="primary" className="bg-primary-600 hover:bg-primary-700">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
