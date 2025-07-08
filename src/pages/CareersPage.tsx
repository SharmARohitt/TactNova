import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  Calendar
} from 'lucide-react';

const jobOpenings = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    department: 'Technology',
    location: 'New Delhi, India / Remote',
    type: 'Full-time',
    salary: '₹8-15 LPA',
    experience: '3-5 years',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    description: 'Lead the development of cutting-edge web applications and contribute to our technology architecture.',
    posted: '2025-06-20'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'New Delhi, India / Remote',
    type: 'Full-time',
    salary: '₹6-12 LPA',
    experience: '2-4 years',
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Prototyping', 'User Research'],
    description: 'Create exceptional user experiences and beautiful interfaces for our dual-niche platform.',
    posted: '2025-06-18'
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'New Delhi, India / Remote',
    type: 'Full-time',
    salary: '₹4-8 LPA',
    experience: '1-3 years',
    skills: ['SEO', 'Social Media', 'Content Marketing', 'Analytics', 'PPC'],
    description: 'Drive our digital presence and help build brand awareness across multiple channels.',
    posted: '2025-06-15'
  },
  {
    id: 4,
    title: 'Business Development Executive',
    department: 'Sales',
    location: 'New Delhi, India',
    type: 'Full-time',
    salary: '₹3-6 LPA + Incentives',
    experience: '1-2 years',
    skills: ['Sales', 'Client Relations', 'Negotiation', 'CRM', 'Communication'],
    description: 'Identify new business opportunities and build relationships with potential clients.',
    posted: '2025-06-12'
  }
];

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Salary',
    description: 'Industry-leading compensation packages with performance bonuses'
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Work-life balance with flexible working hours and remote options'
  },
  {
    icon: Users,
    title: 'Team Culture',
    description: 'Collaborative environment with passionate and talented professionals'
  },
  {
    icon: Zap,
    title: 'Growth Opportunities',
    description: 'Career advancement with learning and development programs'
  }
];

export const CareersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20">
      {/* Hero Section */}
      <section className="py-20 cyber-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
            Build the <span className="text-gradient">Future</span> with Us
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
            Join Tactnova's mission to revolutionize dual-niche innovation. 
            Work with cutting-edge technology and creative excellence.
          </p>
          <Button variant="primary" className="px-8 py-3 text-lg">
            View Open Positions
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Why Choose Tactnova?</h2>
            <p className="text-neutral-400 text-lg">Be part of an innovative team shaping the future</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-neutral-800/50 border-neutral-700 hover:border-primary-500/50 transition-all duration-300">
                  <CardContent className="text-center py-8">
                    <Icon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                    <p className="text-neutral-400 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Open Positions</h2>
            <p className="text-neutral-400 text-lg">Find your perfect role and grow with us</p>
          </div>

          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <Card key={job.id} className="bg-neutral-800/50 border-neutral-700 hover:border-primary-500/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2 sm:mb-0">{job.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                            {job.department}
                          </span>
                          <span className="px-3 py-1 bg-accent-500/20 text-accent-400 rounded-full text-sm">
                            {job.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-neutral-400 mb-4">{job.description}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-sm">
                        <div className="flex items-center text-neutral-300">
                          <MapPin className="w-4 h-4 text-primary-400 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-neutral-300">
                          <DollarSign className="w-4 h-4 text-primary-400 mr-2" />
                          {job.salary}
                        </div>
                        <div className="flex items-center text-neutral-300">
                          <Briefcase className="w-4 h-4 text-primary-400 mr-2" />
                          {job.experience}
                        </div>
                        <div className="flex items-center text-neutral-300">
                          <Calendar className="w-4 h-4 text-primary-400 mr-2" />
                          Posted {new Date(job.posted).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-neutral-700 text-neutral-300 rounded-lg text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:ml-8 mt-6 lg:mt-0">
                      <Button variant="primary" className="w-full lg:w-auto">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Our Culture</h2>
            <p className="text-neutral-400 text-lg">Innovation, collaboration, and excellence</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Work That Matters</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-primary-400 mb-2">Innovation First</h4>
                  <p className="text-neutral-400">
                    We encourage creative thinking and provide the tools and freedom to innovate. 
                    Your ideas can shape the future of our platform.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-primary-400 mb-2">Continuous Learning</h4>
                  <p className="text-neutral-400">
                    Stay ahead with our learning and development programs, conference attendance, 
                    and skill enhancement opportunities.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-primary-400 mb-2">Global Impact</h4>
                  <p className="text-neutral-400">
                    Work on projects that reach global audiences and make a real difference 
                    in both technology and creative industries.
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-primary-500/10 to-accent-500/10 border-primary-500/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Employee Testimonial</h3>
                <blockquote className="text-neutral-300 text-lg italic mb-6">
                  "Working at Tactnova has been an incredible journey. The company's vision 
                  for dual-niche innovation and the supportive team environment make it a 
                  perfect place to grow professionally and personally."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    RS
                  </div>
                  <div>
                    <div className="text-white font-semibold">Rohit Sharma</div>
                    <div className="text-neutral-400 text-sm">Founder & CEO</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500/10 to-accent-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-display">Ready to Join Us?</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Don't see a perfect match? Send us your resume anyway. 
            We're always looking for exceptional talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="px-8 py-3 text-lg">
              Send Resume
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="secondary" className="px-8 py-3 text-lg">
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
