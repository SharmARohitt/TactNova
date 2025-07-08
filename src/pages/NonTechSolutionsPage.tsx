import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Target, TrendingUp, Users, Brain, Presentation,
  Briefcase, Award, DollarSign, BarChart3, Lightbulb,
  CheckCircle, Clock, Star, ChevronRight, PlayCircle,
  Download, Calendar, Phone
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent } from '../components/ui/Card';

// Service interface
interface NonTechService {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: string[];
  methodologies: string[];
  deliverables: string[];
  timeline: string;
  startingPrice: string;
  category: 'strategy' | 'operations' | 'marketing' | 'hr' | 'finance';
  caseStudy?: {
    client: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

// Industry expertise
interface Industry {
  name: string;
  icon: string;
  description: string;
  services: string[];
}

const NonTechSolutionsPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<NonTechService | null>(null);

  // Non-tech services data
  const nonTechServices: NonTechService[] = [
    {
      id: 'business-strategy',
      title: 'Business Strategy Consulting',
      description: 'Strategic planning and execution to drive sustainable growth and competitive advantage.',
      icon: Target,
      features: [
        'Market Analysis & Research',
        'Competitive Intelligence',
        'Strategic Planning',
        'Business Model Innovation',
        'Growth Strategy Development',
        'Performance Metrics Design'
      ],
      methodologies: ['SWOT Analysis', 'Porter\'s Five Forces', 'Blue Ocean Strategy', 'Lean Canvas'],
      deliverables: [
        'Strategic roadmap',
        'Market analysis report',
        'Competitive landscape study',
        'Financial projections',
        'Implementation timeline'
      ],
      timeline: '8-12 weeks',
      startingPrice: '$15,000',
      category: 'strategy',
      caseStudy: {
        client: 'Mid-size Manufacturing Company',
        challenge: 'Declining market share and profitability',
        solution: 'Developed new market entry strategy and operational efficiency program',
        results: ['35% increase in market share', '25% cost reduction', '$5M additional revenue']
      }
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation Strategy',
      description: 'End-to-end digital transformation planning and change management.',
      icon: TrendingUp,
      features: [
        'Digital Maturity Assessment',
        'Technology Roadmap',
        'Change Management',
        'Process Optimization',
        'Digital Culture Development',
        'ROI Measurement'
      ],
      methodologies: ['Agile Transformation', 'Design Thinking', 'Lean Six Sigma', 'Kotter\'s 8-Step'],
      deliverables: [
        'Digital transformation strategy',
        'Change management plan',
        'Technology assessment',
        'Training programs',
        'Success metrics dashboard'
      ],
      timeline: '12-16 weeks',
      startingPrice: '$25,000',
      category: 'strategy'
    },
    {
      id: 'operations-optimization',
      title: 'Operations Optimization',
      description: 'Streamline processes, reduce costs, and improve operational efficiency.',
      icon: Briefcase,
      features: [
        'Process Mapping & Analysis',
        'Workflow Optimization',
        'Quality Management',
        'Supply Chain Enhancement',
        'Cost Reduction Programs',
        'Performance Monitoring'
      ],
      methodologies: ['Lean Manufacturing', 'Six Sigma', 'Kaizen', 'Value Stream Mapping'],
      deliverables: [
        'Process improvement plan',
        'Standard operating procedures',
        'Quality control systems',
        'Cost savings analysis',
        'Performance dashboards'
      ],
      timeline: '10-14 weeks',
      startingPrice: '$18,000',
      category: 'operations',
      caseStudy: {
        client: 'Logistics Company',
        challenge: 'Inefficient warehouse operations and high costs',
        solution: 'Implemented lean principles and automated key processes',
        results: ['40% reduction in processing time', '30% cost savings', '99.5% accuracy rate']
      }
    },
    {
      id: 'marketing-strategy',
      title: 'Marketing Strategy & Branding',
      description: 'Comprehensive marketing strategies that build brand awareness and drive growth.',
      icon: Presentation,
      features: [
        'Brand Strategy Development',
        'Market Positioning',
        'Customer Segmentation',
        'Marketing Mix Optimization',
        'Digital Marketing Strategy',
        'Campaign Performance Analysis'
      ],
      methodologies: ['Brand Archetypes', 'Customer Journey Mapping', 'Growth Hacking', 'A/B Testing'],
      deliverables: [
        'Brand strategy document',
        'Marketing playbook',
        'Customer personas',
        'Campaign templates',
        'Analytics framework'
      ],
      timeline: '6-10 weeks',
      startingPrice: '$12,000',
      category: 'marketing'
    },
    {
      id: 'financial-planning',
      title: 'Financial Planning & Analysis',
      description: 'Strategic financial planning, budgeting, and performance analysis.',
      icon: DollarSign,
      features: [
        'Financial Modeling',
        'Budget Planning & Control',
        'Cash Flow Management',
        'Investment Analysis',
        'Risk Assessment',
        'Performance Reporting'
      ],
      methodologies: ['NPV Analysis', 'Scenario Planning', 'Monte Carlo Simulation', 'Variance Analysis'],
      deliverables: [
        'Financial models',
        'Budget templates',
        'Cash flow forecasts',
        'Investment proposals',
        'Risk management plan'
      ],
      timeline: '8-12 weeks',
      startingPrice: '$16,000',
      category: 'finance'
    },
    {
      id: 'hr-transformation',
      title: 'HR Strategy & Transformation',
      description: 'Modern HR strategies that attract, develop, and retain top talent.',
      icon: Users,
      features: [
        'HR Strategy Development',
        'Talent Acquisition',
        'Performance Management',
        'Learning & Development',
        'Employee Engagement',
        'Compensation Planning'
      ],
      methodologies: ['Competency Modeling', 'OKRs', 'Design Thinking for HR', 'Agile HR'],
      deliverables: [
        'HR strategic plan',
        'Talent management framework',
        'Performance review system',
        'Training programs',
        'Employee handbook'
      ],
      timeline: '10-14 weeks',
      startingPrice: '$14,000',
      category: 'hr'
    },
    {
      id: 'innovation-management',
      title: 'Innovation Management',
      description: 'Build innovation capabilities and create sustainable innovation processes.',
      icon: Lightbulb,
      features: [
        'Innovation Strategy',
        'Idea Management Systems',
        'Innovation Culture Development',
        'R&D Portfolio Management',
        'Innovation Metrics',
        'Partnership Strategy'
      ],
      methodologies: ['Stage-Gate Process', 'Design Sprint', 'Lean Startup', 'Open Innovation'],
      deliverables: [
        'Innovation strategy',
        'Idea management platform',
        'Innovation processes',
        'Metrics dashboard',
        'Training materials'
      ],
      timeline: '12-16 weeks',
      startingPrice: '$22,000',
      category: 'strategy'
    },
    {
      id: 'change-management',
      title: 'Change Management',
      description: 'Navigate organizational change with proven methodologies and expert guidance.',
      icon: Brain,
      features: [
        'Change Readiness Assessment',
        'Stakeholder Analysis',
        'Communication Strategy',
        'Training & Development',
        'Resistance Management',
        'Change Sustainability'
      ],
      methodologies: ['ADKAR Model', 'Kotter\'s 8-Step', 'Bridges Transition Model', 'Nudge Theory'],
      deliverables: [
        'Change management plan',
        'Communication framework',
        'Training curriculum',
        'Success metrics',
        'Sustainability plan'
      ],
      timeline: '8-12 weeks',
      startingPrice: '$18,000',
      category: 'strategy'
    }
  ];

  // Industries we serve
  const industries: Industry[] = [
    {
      name: 'Healthcare',
      icon: '🏥',
      description: 'Digital transformation and operational excellence in healthcare delivery',
      services: ['Process Optimization', 'Quality Management', 'Regulatory Compliance', 'Patient Experience']
    },
    {
      name: 'Financial Services',
      icon: '🏦',
      description: 'Strategic planning and risk management for financial institutions',
      services: ['Risk Assessment', 'Compliance Strategy', 'Digital Banking', 'Customer Experience']
    },
    {
      name: 'Manufacturing',
      icon: '🏭',
      description: 'Lean operations and supply chain optimization',
      services: ['Lean Manufacturing', 'Supply Chain', 'Quality Control', 'Cost Reduction']
    },
    {
      name: 'Retail & E-commerce',
      icon: '🛒',
      description: 'Customer experience and omnichannel strategies',
      services: ['Customer Journey', 'Inventory Management', 'Brand Strategy', 'Digital Marketing']
    },
    {
      name: 'Technology',
      icon: '💻',
      description: 'Innovation management and agile transformation',
      services: ['Agile Transformation', 'Innovation Strategy', 'Product Management', 'Scaling Operations']
    },
    {
      name: 'Education',
      icon: '🎓',
      description: 'Educational innovation and organizational development',
      services: ['Digital Learning', 'Curriculum Design', 'Performance Management', 'Student Experience']
    }
  ];

  // Filter services based on category
  const filteredServices = selectedCategory === 'all' 
    ? nonTechServices 
    : nonTechServices.filter(service => service.category === selectedCategory);

  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Services', icon: Briefcase },
    { id: 'strategy', label: 'Strategy', icon: Target },
    { id: 'operations', label: 'Operations', icon: Briefcase },
    { id: 'marketing', label: 'Marketing', icon: Presentation },
    { id: 'hr', label: 'Human Resources', icon: Users },
    { id: 'finance', label: 'Finance', icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(168,85,247,0.1),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent mb-6">
              Non-Tech Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Strategic business solutions that drive growth, optimize operations,
              and transform organizations through proven methodologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Explore Services
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                <PlayCircle className="mr-2 h-5 w-5" />
                Case Studies
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated business icons */}
        <div className="absolute top-1/3 left-10 w-16 h-16 bg-purple-500/10 rounded-lg flex items-center justify-center animate-pulse">
          <Target className="h-8 w-8 text-purple-400" />
        </div>
        <div className="absolute top-1/2 right-16 w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center animate-bounce">
          <TrendingUp className="h-6 w-6 text-pink-400" />
        </div>
      </section>

      {/* Service Categories Filter */}
      <section className="py-12 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <category.icon className="h-4 w-4" />
                {category.label}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Business Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From strategy to execution, we provide comprehensive business solutions
              that drive measurable results and sustainable growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedService(service)}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                          {React.createElement(service.icon, { className: "h-6 w-6 text-purple-400" })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-purple-400 font-bold">{service.startingPrice}</div>
                        <div className="text-gray-400 text-sm">starting at</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {service.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-300 mb-6">{service.description}</p>
                    
                    {/* Key Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">KEY FEATURES</h4>
                      <div className="space-y-2">
                        {service.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                        {service.features.length > 4 && (
                          <div className="text-purple-400 text-sm">
                            +{service.features.length - 4} more features
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Methodologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">METHODOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {service.methodologies.slice(0, 3).map((method) => (
                          <span
                            key={method}
                            className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                          >
                            {method}
                          </span>
                        ))}
                        {service.methodologies.length > 3 && (
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                            +{service.methodologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {service.timeline}
                      </span>
                      {service.caseStudy && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400">Success Story</span>
                        </div>
                      )}
                    </div>

                    {/* CTA */}
                    <Button className="w-full group" size="sm">
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Deep industry expertise across multiple sectors, delivering tailored
              solutions that address specific challenges and opportunities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group hover:bg-gray-800/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-4xl">{industry.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{industry.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{industry.description}</p>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">SPECIALIZED SERVICES</h4>
                      <div className="flex flex-wrap gap-2">
                        {industry.services.map((service) => (
                          <span
                            key={service}
                            className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Proven Methodology
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A structured approach that ensures consistent results and maximum
              impact for every engagement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                phase: '01',
                title: 'Assessment & Analysis',
                description: 'Comprehensive evaluation of current state, challenges, and opportunities.',
                icon: BarChart3,
                color: 'from-purple-400 to-pink-400'
              },
              {
                phase: '02',
                title: 'Strategy Development',
                description: 'Custom strategy design with clear objectives and measurable outcomes.',
                icon: Target,
                color: 'from-pink-400 to-orange-400'
              },
              {
                phase: '03',
                title: 'Implementation',
                description: 'Structured execution with change management and stakeholder engagement.',
                icon: Briefcase,
                color: 'from-orange-400 to-yellow-400'
              },
              {
                phase: '04',
                title: 'Optimization & Support',
                description: 'Continuous monitoring, optimization, and ongoing support for sustainability.',
                icon: TrendingUp,
                color: 'from-yellow-400 to-green-400'
              }
            ].map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardContent className="p-8">
                    <div className={`text-4xl font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent mb-4`}>
                      {phase.phase}
                    </div>
                    <div className="p-4 bg-purple-500/20 rounded-full w-fit mx-auto mb-6">
                      <phase.icon className="h-8 w-8 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{phase.title}</h3>
                    <p className="text-gray-300">{phase.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proven Results
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our data-driven approach delivers measurable outcomes across all
              business functions and industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { metric: '89%', label: 'Client Satisfaction', icon: Award },
              { metric: '45%', label: 'Average ROI Increase', icon: TrendingUp },
              { metric: '150+', label: 'Projects Completed', icon: CheckCircle },
              { metric: '25+', label: 'Industries Served', icon: Briefcase }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-purple-500/20 rounded-full">
                    <stat.icon className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.metric}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Business Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ready to unlock your organization's potential? Let's discuss your
              challenges and create a customized solution that drives real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                Start Your Transformation
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="mr-2 h-5 w-5" />
                Book Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    {React.createElement(selectedService.icon, { className: "h-8 w-8 text-purple-400" })}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedService.title}</h2>
                    <p className="text-purple-400">{selectedService.startingPrice} starting price</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>

              <p className="text-gray-300 text-lg mb-8">{selectedService.description}</p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Features */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
                  <div className="space-y-3">
                    {selectedService.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Deliverables</h3>
                  <div className="space-y-3">
                    {selectedService.deliverables.map((deliverable) => (
                      <div key={deliverable} className="flex items-center gap-3">
                        <Download className="h-5 w-5 text-purple-400 flex-shrink-0" />
                        <span className="text-gray-300">{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Case Study */}
              {selectedService.caseStudy && (
                <div className="mt-8 p-6 bg-gray-700/30 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-4">Success Story</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-purple-400 mb-2">Client</h4>
                      <p className="text-gray-300">{selectedService.caseStudy.client}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-400 mb-2">Challenge</h4>
                      <p className="text-gray-300">{selectedService.caseStudy.challenge}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-400 mb-2">Solution</h4>
                      <p className="text-gray-300">{selectedService.caseStudy.solution}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-400 mb-2">Results</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedService.caseStudy.results.map((result) => (
                          <span key={result} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-8">
                <Button className="flex-1">
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline">
                  <Phone className="mr-2 h-5 w-5" />
                  Discuss Project
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NonTechSolutionsPage;
