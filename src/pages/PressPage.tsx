import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Newspaper, 
  Calendar, 
  ArrowRight, 
  ExternalLink,
  Award,
  Users,
  Zap
} from 'lucide-react';

const pressReleases = [
  {
    id: 1,
    title: 'Tactnova Launches Revolutionary Dual-Niche Innovation Platform',
    excerpt: 'New Delhi-based startup introduces groundbreaking approach to technology and creative solutions',
    date: '2025-06-20',
    category: 'Launch',
    link: '#'
  },
  {
    id: 2,
    title: 'Tactnova Founder Rohit Sharma Selected for Young Innovators Summit 2025',
    excerpt: 'Recognition for pioneering dual-domain expertise in technology and creative industries',
    date: '2025-06-15',
    category: 'Awards',
    link: '#'
  },
  {
    id: 3,
    title: 'Tactnova Announces Expansion Plans for Global Markets',
    excerpt: 'Strategic roadmap includes Silicon Valley and European operations by 2026-2027',
    date: '2025-06-10',
    category: 'Expansion',
    link: '#'
  }
];

const mediaKit = [
  {
    title: 'Company Logo Package',
    description: 'High-resolution logos in various formats (PNG, SVG, AI)',
    size: '2.5 MB'
  },
  {
    title: 'Brand Guidelines',
    description: 'Complete brand identity and usage guidelines',
    size: '1.8 MB'
  },
  {
    title: 'Press Kit',
    description: 'Company overview, founder bio, and high-res photos',
    size: '3.2 MB'
  }
];

export const PressPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20">
      {/* Hero Section */}
      <section className="py-20 cyber-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
            Press & <span className="text-gradient">Media</span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
            Latest news, announcements, and media resources about Tactnova's innovation journey.
          </p>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Latest News</h2>
            <p className="text-neutral-400 text-lg">Stay updated with our recent announcements</p>
          </div>

          <div className="space-y-8">
            {pressReleases.map((release) => (
              <Card key={release.id} className="bg-neutral-800/50 border-neutral-700 hover:border-primary-500/50 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                          {release.category}
                        </span>
                        <div className="flex items-center text-neutral-400 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(release.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3">{release.title}</h3>
                      <p className="text-neutral-400 mb-6">{release.excerpt}</p>
                    </div>

                    <div className="lg:ml-8 mt-6 lg:mt-0">
                      <Button variant="secondary" className="w-full lg:w-auto">
                        Read More
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Media Kit</h2>
            <p className="text-neutral-400 text-lg">Resources for journalists and media professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {mediaKit.map((item, index) => (
              <Card key={index} className="bg-neutral-800/50 border-neutral-700 hover:border-primary-500/50 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Newspaper className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-neutral-400 text-sm mb-4">{item.description}</p>
                  <p className="text-neutral-500 text-xs mb-6">{item.size}</p>
                  <Button variant="primary" className="w-full">
                    Download
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Facts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Company Facts</h2>
            <p className="text-neutral-400 text-lg">Key information about Tactnova</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-neutral-800/50 border-neutral-700 text-center">
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">2025</h3>
                <p className="text-neutral-400 text-sm">Founded</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700 text-center">
              <CardContent className="p-6">
                <Users className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">1+</h3>
                <p className="text-neutral-400 text-sm">Team Members</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700 text-center">
              <CardContent className="p-6">
                <Zap className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">2</h3>
                <p className="text-neutral-400 text-sm">Core Domains</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700 text-center">
              <CardContent className="p-6">
                <Award className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-white mb-2">New Delhi</h3>
                <p className="text-neutral-400 text-sm">Headquarters</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Press */}
      <section className="py-20 bg-gradient-to-r from-primary-500/10 to-accent-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-display">Press Inquiries</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            For press inquiries, interviews, or additional information, please contact our media team.
          </p>
          
          <Card className="max-w-md mx-auto bg-neutral-800/50 border-neutral-700">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">Media Contact</h3>
              <div className="space-y-3 text-left">
                <div>
                  <p className="text-neutral-400 text-sm">Email</p>
                  <p className="text-white">tactnovaofficiall@gmail.com</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Phone</p>
                  <p className="text-white">+91 9205828350</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-sm">Response Time</p>
                  <p className="text-white">Within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
