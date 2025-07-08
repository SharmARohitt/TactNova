import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  MapPin, 
  Users, 
  Plus,
  X,
  Mail,
  Phone,
  Linkedin,
  Github
} from 'lucide-react';

interface JoinTeamFormData {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio: string;
  linkedin: string;
  github: string;
  whyJoin: string;
  skills: string;
}

export const TeamPage: React.FC = () => {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState<JoinTeamFormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    portfolio: '',
    linkedin: '',
    github: '',
    whyJoin: '',
    skills: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Team application submitted:', formData);
    alert('Thank you for your interest! We will review your application and get back to you soon.');
    setShowJoinForm(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      portfolio: '',
      linkedin: '',
      github: '',
      whyJoin: '',
      skills: ''
    });
  };

  return (
    <div className="min-h-screen bg-neutral-950 pt-20">
      {/* Hero Section */}
      <section className="py-20 cyber-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
            Meet Our <span className="text-gradient">Team</span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
            The brilliant minds behind Tactnova's innovation. We're building the future of dual-niche solutions.
          </p>
        </div>
      </section>

      {/* Current Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Our Leadership</h2>
            <p className="text-neutral-400 text-lg">Passionate innovators driving technological excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Founder Card */}
            <Card className="bg-neutral-800/50 border-neutral-700 hover:border-primary-500/50 transition-all duration-300 group">
              <div className="text-center p-6">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 p-1">
                  <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center text-6xl font-bold text-white">
                    RS
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Rohit Sharma</h3>
                <p className="text-primary-400 font-semibold mb-4">Founder & CEO</p>
                <p className="text-neutral-400 text-sm mb-6">
                  Visionary leader and tech innovator driving Tactnova's mission to revolutionize 
                  dual-niche solutions across technology and creative domains.
                </p>
                <div className="flex justify-center space-x-4">
                  <a href="mailto:tactnovaofficial@gmail.com" className="text-neutral-400 hover:text-primary-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                  <a href="tel:+919205828350" className="text-neutral-400 hover:text-primary-400 transition-colors">
                    <Phone className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-neutral-400 hover:text-primary-400 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </Card>

            {/* Coming Soon Cards */}
            <Card className="bg-neutral-800/30 border-neutral-700 border-dashed">
              <CardContent className="text-center py-16">
                <Users className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-500 mb-2">CTO Position</h3>
                <p className="text-neutral-600 text-sm">Coming Soon</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/30 border-neutral-700 border-dashed">
              <CardContent className="text-center py-16">
                <Users className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-500 mb-2">Lead Designer</h3>
                <p className="text-neutral-600 text-sm">Coming Soon</p>
              </CardContent>
            </Card>
          </div>

          {/* Global Presence */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Global Presence</h2>
            <p className="text-neutral-400 text-lg mb-12">Building innovation hubs worldwide</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* India Office */}
              <Card className="bg-neutral-800/50 border-neutral-700">
                <div className="text-center p-6">
                  <MapPin className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">India Headquarters</h3>
                  <p className="text-primary-400 font-semibold mb-2">New Delhi</p>
                  <p className="text-neutral-400 text-sm">
                    Our primary innovation hub and headquarters, driving technological excellence 
                    across the Indian subcontinent.
                  </p>
                  <div className="mt-4 px-3 py-1 bg-green-500/20 rounded-full">
                    <span className="text-green-400 text-sm font-medium">Active</span>
                  </div>
                </div>
              </Card>

              {/* Coming Soon Offices */}
              <Card className="bg-neutral-800/30 border-neutral-700 border-dashed">
                <CardContent className="text-center py-12">
                  <MapPin className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-500 mb-2">USA Office</h3>
                  <p className="text-neutral-600 text-sm mb-4">Silicon Valley expansion planned</p>
                  <div className="px-3 py-1 bg-neutral-700 rounded-full">
                    <span className="text-neutral-400 text-sm">Coming 2026</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-800/30 border-neutral-700 border-dashed">
                <CardContent className="text-center py-12">
                  <MapPin className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-500 mb-2">Europe Office</h3>
                  <p className="text-neutral-600 text-sm mb-4">London operations planned</p>
                  <div className="px-3 py-1 bg-neutral-700 rounded-full">
                    <span className="text-neutral-400 text-sm">Coming 2027</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Company Timeline */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-white mb-12 text-center font-display">Our Journey</h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-accent-500"></div>
                
                <div className="space-y-12">
                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                      2024
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-bold text-white mb-2">Vision & Planning</h3>
                      <p className="text-neutral-400">
                        Rohit Sharma conceptualized Tactnova's dual-niche innovation model, 
                        researching market gaps and developing the foundation for revolutionary 
                        tech and creative solutions.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center text-white font-bold text-lg z-10">
                      2025
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-bold text-white mb-2">Launch & Growth</h3>
                      <p className="text-neutral-400">
                        Official launch of Tactnova with headquarters in New Delhi. 
                        Platform development, first client acquisitions, and establishing 
                        our presence in both technology and creative domains.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center">
                    <div className="w-16 h-16 bg-neutral-700 rounded-full flex items-center justify-center text-neutral-400 font-bold text-lg z-10">
                      2026
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-bold text-neutral-500 mb-2">Global Expansion</h3>
                      <p className="text-neutral-600">
                        Planned expansion to Silicon Valley, team scaling, and establishing 
                        strategic partnerships across international markets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Join Team CTA */}
          <Card className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-primary-500/30">
            <CardContent className="text-center py-16">
              <h2 className="text-3xl font-bold text-white mb-4">Join Our Mission</h2>
              <p className="text-neutral-300 text-lg mb-8 max-w-2xl mx-auto">
                We're looking for passionate innovators who want to shape the future of 
                dual-niche solutions. Be part of something extraordinary.
              </p>
              <Button 
                onClick={() => setShowJoinForm(true)}
                variant="primary" 
                className="px-8 py-3 text-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Join Our Team
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Join Team Modal */}
      {showJoinForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Join Our Team</h2>
                <button 
                  onClick={() => setShowJoinForm(false)}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Full Name *</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Email *</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Phone Number *</label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Position Interested In *</label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    >
                      <option value="">Select a position</option>
                      <option value="fullstack-developer">Full Stack Developer</option>
                      <option value="frontend-developer">Frontend Developer</option>
                      <option value="backend-developer">Backend Developer</option>
                      <option value="ui-ux-designer">UI/UX Designer</option>
                      <option value="graphic-designer">Graphic Designer</option>
                      <option value="content-creator">Content Creator</option>
                      <option value="digital-marketer">Digital Marketer</option>
                      <option value="business-analyst">Business Analyst</option>
                      <option value="project-manager">Project Manager</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Years of Experience *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years (Fresher/Entry Level)</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-8">5-8 years</option>
                      <option value="8+">8+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Portfolio/Website</label>
                    <Input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">LinkedIn Profile</label>
                    <Input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">GitHub Profile</label>
                    <Input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleInputChange}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Key Skills *</label>
                  <Input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., React, Node.js, Python, Figma, Photoshop"
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Why do you want to join Tactnova? *</label>
                  <textarea
                    name="whyJoin"
                    value={formData.whyJoin}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us about your motivation, passion, and what excites you about Tactnova's mission..."
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-primary-500 resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    onClick={() => setShowJoinForm(false)}
                    variant="secondary"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
