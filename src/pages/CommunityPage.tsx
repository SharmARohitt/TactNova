import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  Trophy,
  ArrowRight,
  Calendar,
  Github,
  ExternalLink,
  Code,
  Lightbulb,
  Award
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const communityStats = [
  { label: 'Active Members', value: '2,500+', icon: Users },
  { label: 'Monthly Discussions', value: '1,200+', icon: MessageSquare },
  { label: 'Shared Projects', value: '350+', icon: Code },
  { label: 'Expert Contributors', value: '75+', icon: Award }
];

const communityChannels = [
  {
    icon: MessageSquare,
    title: 'General Discussion',
    description: 'Ask questions, share ideas, and connect with fellow developers',
    members: '1,850',
    activity: 'Very Active',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Code,
    title: 'Technical Support',
    description: 'Get help with implementation, debugging, and best practices',
    members: '1,420',
    activity: 'Active',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Lightbulb,
    title: 'Feature Requests',
    description: 'Propose new features and vote on community suggestions',
    members: '980',
    activity: 'Moderate',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Trophy,
    title: 'Showcase',
    description: 'Share your projects and see what others are building',
    members: '1,200',
    activity: 'Active',
    color: 'from-purple-500 to-purple-600'
  }
];

const featuredMembers = [
  {
    name: 'Sarah Chen',
    role: 'AI Engineer',
    company: 'TechCorp',
    contributions: 142,
    specialties: ['Machine Learning', 'Python', 'TensorFlow'],
    avatar: 'SC'
  },
  {
    name: 'Michael Rodriguez',
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    contributions: 98,
    specialties: ['React', 'Node.js', 'AWS'],
    avatar: 'MR'
  },
  {
    name: 'Emily Johnson',
    role: 'Security Analyst',
    company: 'CyberSafe Inc',
    contributions: 87,
    specialties: ['Cybersecurity', 'Penetration Testing', 'Compliance'],
    avatar: 'EJ'
  },
  {
    name: 'David Kim',
    role: 'UI/UX Designer',
    company: 'Design Studio',
    contributions: 76,
    specialties: ['Design Systems', 'Figma', 'User Research'],
    avatar: 'DK'
  }
];

const upcomingEvents = [
  {
    title: 'AI Development Workshop',
    date: '2025-02-15',
    time: '2:00 PM IST',
    type: 'Virtual Workshop',
    attendees: 156,
    description: 'Build your first AI chatbot with our expert guidance'
  },
  {
    title: 'Cybersecurity Best Practices',
    date: '2025-02-22',
    time: '3:00 PM IST',
    type: 'Webinar',
    attendees: 203,
    description: 'Learn about the latest security threats and prevention methods'
  },
  {
    title: 'Community Meetup - Delhi',
    date: '2025-03-05',
    time: '6:00 PM IST',
    type: 'In-Person',
    attendees: 45,
    description: 'Network with local developers and tech enthusiasts'
  }
];

const resources = [
  {
    icon: Github,
    title: 'Open Source Projects',
    description: 'Contribute to community-driven projects and templates',
    link: '#',
    type: 'Repository'
  },
  {
    icon: Code,
    title: 'Code Snippets',
    description: 'Useful code examples and reusable components',
    link: '#',
    type: 'Library'
  },
  {
    icon: Award,
    title: 'Certification Programs',
    description: 'Get certified in various technologies and skills',
    link: '#',
    type: 'Course'
  }
];

export const CommunityPage: React.FC = () => {
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
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Community</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Connect with developers, creators, and innovators from around the world. 
              Share knowledge, collaborate on projects, and grow together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg">
                Join Community
                <Users className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Browse Discussions
                <MessageSquare className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" className="text-center">
                    <CardContent className="p-6">
                      <Icon className="w-8 h-8 text-primary-400 mx-auto mb-4" />
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-neutral-300 text-sm">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community Channels */}
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
              Community Channels
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Engage with different aspects of our community through specialized channels
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" hoverable className="h-full group">
                    <CardContent className="p-8">
                      <div className="flex items-start space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                            {channel.title}
                          </h3>
                          <p className="text-neutral-300 mb-4">
                            {channel.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <span className="text-neutral-400">
                                {channel.members} members
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                channel.activity === 'Very Active' ? 'bg-green-500/20 text-green-300' :
                                channel.activity === 'Active' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-neutral-600/20 text-neutral-400'
                              }`}>
                                {channel.activity}
                              </span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-400 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Members */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Community Members
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Meet some of our most active and helpful community contributors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="cyber" hoverable className="h-full group">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-lg">{member.avatar}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-400 text-sm mb-1">{member.role}</p>
                    <p className="text-neutral-400 text-xs mb-4">{member.company}</p>
                    
                    <div className="mb-4">
                      <div className="text-2xl font-bold text-accent-400 mb-1">
                        {member.contributions}
                      </div>
                      <div className="text-xs text-neutral-400">contributions</div>
                    </div>

                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
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
              Upcoming Events
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Join our workshops, webinars, and meetups to learn and network
            </p>
          </motion.div>

          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="cyber" hoverable className="group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {event.title}
                          </h3>
                          <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-sm">
                            {event.type}
                          </span>
                        </div>
                        <p className="text-neutral-300 mb-3">
                          {event.description}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-neutral-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.attendees} registered
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button variant="primary" size="sm">
                          Register
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Community Resources
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              Access shared resources, projects, and learning materials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" hoverable className="h-full group">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-accent-400 transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-neutral-300 text-sm mb-4">
                        {resource.description}
                      </p>
                      <div className="mb-4">
                        <span className="px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full text-xs">
                          {resource.type}
                        </span>
                      </div>
                      <Button variant="outline" className="w-full group-hover:bg-accent-500 group-hover:border-accent-500 transition-colors">
                        Explore
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
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
              Ready to Join Our Community?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Connect with like-minded individuals, share your expertise, and accelerate 
              your learning journey with our vibrant community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="secondary" size="lg">
                Create Account
                <Users className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
