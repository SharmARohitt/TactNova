import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Award,
  Target,
  Shield,
  Palette,
  Code,
  Brain
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const caseStudies = [
  {
    id: 1,
    title: 'AI-Powered Customer Service Transformation',
    client: 'Enterprise SaaS Company',
    industry: 'Technology',
    category: 'AI & Machine Learning',
    icon: Brain,
    duration: '4 months',
    teamSize: '8 specialists',
    results: {
      improvement: '85%',
      metric: 'faster response times',
      savings: '$2.3M',
      satisfaction: '94%'
    },
    challenge: 'A growing SaaS company struggled with increasing customer support tickets and declining satisfaction scores due to long response times and inconsistent service quality.',
    solution: 'Implemented a comprehensive AI chatbot system with natural language processing, integrated with their existing CRM, and trained on historical support data.',
    outcomes: [
      'Reduced average response time from 24 hours to 3.6 hours',
      'Increased customer satisfaction from 72% to 94%',
      'Automated 68% of routine inquiries',
      'Saved $2.3M annually in support costs'
    ],
    technologies: ['OpenAI GPT', 'Natural Language Processing', 'CRM Integration', 'Machine Learning'],
    featured: true
  },
  {
    id: 2,
    title: 'Cybersecurity Infrastructure Overhaul',
    client: 'Financial Services Firm',
    industry: 'Finance',
    category: 'Cybersecurity',
    icon: Shield,
    duration: '6 months',
    teamSize: '12 specialists',
    results: {
      improvement: '99.9%',
      metric: 'threat detection accuracy',
      savings: '$5.8M',
      satisfaction: '98%'
    },
    challenge: 'A mid-sized financial firm faced increasing cyber threats and needed to comply with new regulatory requirements while maintaining operational efficiency.',
    solution: 'Designed and implemented a comprehensive cybersecurity framework including threat detection, incident response, and compliance monitoring systems.',
    outcomes: [
      'Achieved 99.9% threat detection accuracy',
      'Reduced security incidents by 92%',
      'Ensured 100% regulatory compliance',
      'Prevented potential losses of $5.8M'
    ],
    technologies: ['SIEM Systems', 'Threat Intelligence', 'Zero Trust Architecture', 'Compliance Automation'],
    featured: true
  },
  {
    id: 3,
    title: 'E-commerce Platform Modernization',
    client: 'Retail Chain',
    industry: 'Retail',
    category: 'Full-Stack Development',
    icon: Code,
    duration: '8 months',
    teamSize: '15 specialists',
    results: {
      improvement: '340%',
      metric: 'mobile conversion rate',
      savings: '$12M',
      satisfaction: '96%'
    },
    challenge: 'A traditional retail chain needed to modernize their outdated e-commerce platform to compete with online-first competitors and improve mobile experience.',
    solution: 'Built a modern, scalable e-commerce platform with progressive web app capabilities, advanced analytics, and personalized shopping experiences.',
    outcomes: [
      'Increased mobile conversion rate by 340%',
      'Improved page load times by 75%',
      'Boosted online revenue by $12M annually',
      'Enhanced customer experience scores by 96%'
    ],
    technologies: ['React', 'Node.js', 'Microservices', 'PWA', 'Cloud Infrastructure'],
    featured: false
  },
  {
    id: 4,
    title: 'Brand Identity & Digital Transformation',
    client: 'Tech Startup',
    industry: 'Technology',
    category: 'Creative Solutions',
    icon: Palette,
    duration: '3 months',
    teamSize: '6 specialists',
    results: {
      improvement: '450%',
      metric: 'brand recognition',
      savings: '$800K',
      satisfaction: '97%'
    },
    challenge: 'A promising tech startup needed to establish a strong brand identity and digital presence to attract investors and customers in a competitive market.',
    solution: 'Created a comprehensive brand identity system, modern website, marketing materials, and digital marketing strategy tailored to their target audience.',
    outcomes: [
      'Increased brand recognition by 450%',
      'Generated $3.2M in new funding',
      'Improved lead generation by 280%',
      'Achieved 97% client satisfaction'
    ],
    technologies: ['Brand Design', 'UI/UX Design', 'Content Strategy', 'Digital Marketing'],
    featured: false
  }
];

const metrics = [
  { label: 'Successful Projects', value: '150+', icon: CheckCircle },
  { label: 'Client Satisfaction', value: '98%', icon: Award },
  { label: 'Average ROI', value: '320%', icon: TrendingUp },
  { label: 'Industries Served', value: '25+', icon: Target }
];

const industries = [
  'Technology', 'Finance', 'Healthcare', 'Retail', 'Manufacturing', 
  'Education', 'Government', 'Non-Profit', 'Real Estate', 'Media'
];

export const CaseStudiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>('All');

  const categories = ['All', 'AI & Machine Learning', 'Cybersecurity', 'Full-Stack Development', 'Creative Solutions'];

  const filteredCaseStudies = caseStudies.filter(study => {
    const categoryMatch = selectedCategory === 'All' || study.category === selectedCategory;
    const industryMatch = selectedIndustry === 'All' || study.industry === selectedIndustry;
    return categoryMatch && industryMatch;
  });

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
              Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Studies</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Explore real-world success stories and discover how Tactnova's dual-niche 
              approach transforms businesses across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" className="text-center">
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-primary-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                      <div className="text-neutral-300 text-sm">{metric.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <label className="block text-white text-sm font-medium mb-2">Filter by Category</label>
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
            <div className="flex-1">
              <label className="block text-white text-sm font-medium mb-2">Filter by Industry</label>
              <div className="flex flex-wrap gap-2">
                {['All', ...industries.slice(0, 6)].map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      selectedIndustry === industry
                        ? 'bg-accent-500 text-white'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCaseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card 
                    variant="cyber" 
                    hoverable 
                    className={`h-full group ${study.featured ? 'border-primary-400' : ''}`}
                  >
                    <CardContent className="p-8">
                      {study.featured && (
                        <div className="inline-flex px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs font-medium mb-4">
                          Featured Case Study
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                            {study.title}
                          </h3>
                          <div className="space-y-1 text-sm">
                            <p className="text-neutral-300">{study.client}</p>
                            <p className="text-neutral-400">{study.industry} • {study.category}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center text-sm text-neutral-400">
                          <Clock className="w-4 h-4 mr-2" />
                          {study.duration}
                        </div>
                        <div className="flex items-center text-sm text-neutral-400">
                          <Users className="w-4 h-4 mr-2" />
                          {study.teamSize}
                        </div>
                      </div>

                      <div className="bg-neutral-900/50 rounded-lg p-4 mb-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-primary-400">
                              {study.results.improvement}
                            </div>
                            <div className="text-xs text-neutral-400">
                              {study.results.metric}
                            </div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-accent-400">
                              {study.results.satisfaction}
                            </div>
                            <div className="text-xs text-neutral-400">
                              satisfaction rate
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-neutral-300 text-sm mb-4 line-clamp-3">
                        {study.challenge}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-white font-medium mb-3">Key Outcomes:</h4>
                        <ul className="space-y-2">
                          {study.outcomes.slice(0, 2).map((outcome, idx) => (
                            <li key={idx} className="text-sm text-neutral-300 flex items-start">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 shrink-0" />
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="outline" className="w-full group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
                        View Full Case Study
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredCaseStudies.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-neutral-400 text-lg">
                No case studies found for the selected filters.
              </p>
            </motion.div>
          )}
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
              Ready to Create Your Success Story?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join our growing list of successful clients and transform your business 
              with Tactnova's innovative solutions.
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
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
