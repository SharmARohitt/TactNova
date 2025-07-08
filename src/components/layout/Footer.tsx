import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone,
  ArrowRight,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const footerLinks = {
  Solutions: [
    { name: 'AI Development', href: '/solutions/tech/ai' },
    { name: 'Full Stack Development', href: '/solutions/tech/fullstack' },
    { name: 'Cybersecurity', href: '/solutions/tech/security' },
    { name: 'Brand Identity', href: '/solutions/non-tech/branding' },
    { name: 'Content Creation', href: '/solutions/non-tech/content' },
    { name: 'Business Strategy', href: '/solutions/non-tech/strategy' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Blog', href: '/blog' },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Whitepapers', href: '/resources/whitepapers' },
    { name: 'API Reference', href: '/api' },
    { name: 'Developer Tools', href: '/tools' },
    { name: 'Community', href: '/community' },
  ],
  Support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Support', href: '/support' },
    { name: 'Status Page', href: '/status' },
    { name: 'Bug Reports', href: '/bugs' },
    { name: 'Feature Requests', href: '/features' },
    { name: 'Security', href: '/security' },
  ],
};

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Email', href: 'mailto:tactnovaofficial@gmail.com', icon: Mail },
];

export const Footer: React.FC = () => {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white font-display">
                TACTNOVA
              </span>
            </Link>
            
            <p className="text-neutral-400 mb-6 max-w-md">
              Pioneering dual-niche innovation across tech and non-tech domains. 
              We transform ideas into reality with cutting-edge solutions and 
              creative excellence.
            </p>

            <div className="space-y-3 text-sm text-neutral-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span>New Delhi, India & Global Operations</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+91 9205828350</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>tactnovaofficial@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400 hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-neutral-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-white font-semibold text-lg mb-2">
                Stay Updated with Tactnova
              </h3>
              <p className="text-neutral-400 text-sm">
                Get the latest insights, case studies, and innovation updates 
                delivered directly to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                variant="cyber"
                className="flex-1"
                required
              />
              <Button type="submit" variant="primary" className="shrink-0">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-400 text-sm">
              © 2025 Tactnova. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animated ticker */}
      <div className="overflow-hidden bg-gradient-to-r from-primary-600 to-accent-600 py-2">
        <div className="animate-pulse text-center">
          <span className="text-white text-sm font-medium">
            🚀 Now accepting new projects for Q2 2025 • Get 20% off your first project consultation
          </span>
        </div>
      </div>
    </footer>
  );
};
