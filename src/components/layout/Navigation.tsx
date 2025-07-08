import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { cn } from '../../utils';
import tactnovaLogo from '../../assets/images/tactnovawithoutbg.png';

interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Solutions', 
    href: '/solutions',
    children: [
      { name: 'Tech Innovation', href: '/solutions/tech' },
      { name: 'Non-Tech Impact', href: '/solutions/non-tech' },
    ]
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

interface NavigationProps {
  user?: any;
  onSignOut?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const NavLink: React.FC<{ item: NavItem; mobile?: boolean }> = ({ item, mobile = false }) => {
    const isActive = location.pathname === item.href;
    const hasChildren = item.children && item.children.length > 0;

    if (mobile) {
      return (
        <div className="space-y-2">
          <Link
            to={item.href}
            className={cn(
              "block px-3 py-2 text-base font-medium rounded-lg transition-all duration-200",
              isActive 
                ? "text-primary-400 bg-primary-500/10" 
                : "text-neutral-300 hover:text-primary-400 hover:bg-primary-500/5"
            )}
          >
            {item.name}
          </Link>
          {hasChildren && (
            <div className="pl-4 space-y-1">
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className={cn(
                    "block px-3 py-1 text-sm rounded-lg transition-all duration-200",
                    location.pathname === child.href
                      ? "text-primary-400 bg-primary-500/10"
                      : "text-neutral-400 hover:text-primary-400 hover:bg-primary-500/5"
                  )}
                >
                  {child.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div 
        className="relative"
        onMouseEnter={() => hasChildren && setActiveDropdown(item.name)}
        onMouseLeave={() => hasChildren && setActiveDropdown(null)}
      >
        <Link
          to={item.href}
          className={cn(
            "relative px-3 py-2 text-sm font-medium transition-all duration-200 group",
            isActive 
              ? "text-primary-400" 
              : "text-neutral-300 hover:text-primary-400"
          )}
        >
          {item.name}
          <span 
            className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 transition-all duration-300",
              isActive ? "w-full" : "w-0 group-hover:w-full"
            )}
          />
        </Link>
        
        {hasChildren && (
          <AnimatePresence>
            {activeDropdown === item.name && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-48 bg-neutral-900/95 backdrop-blur-sm border border-neutral-800 rounded-lg shadow-xl z-50"
              >
                {item.children!.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      "block px-4 py-2 text-sm transition-all duration-200 first:rounded-t-lg last:rounded-b-lg",
                      location.pathname === child.href
                        ? "text-primary-400 bg-primary-500/10"
                        : "text-neutral-300 hover:text-primary-400 hover:bg-primary-500/5"
                    )}
                  >
                    {child.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={tactnovaLogo} 
              alt="TactNova Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-bold text-white font-display">
              TACTNOVA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </div>

          {/* User Menu & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
                
                <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-900/95 backdrop-blur-sm border border-neutral-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    to="/dashboard"
                    className="flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-primary-400 hover:bg-primary-500/5 transition-all duration-200 rounded-t-lg"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <button
                    onClick={onSignOut}
                    className="w-full flex items-center px-4 py-2 text-sm text-neutral-300 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 rounded-b-lg"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-primary-400 hover:bg-primary-500/5 transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-neutral-900/95 backdrop-blur-sm border-t border-neutral-800"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <NavLink key={item.href} item={item} mobile />
              ))}
              
              {!user && (
                <div className="pt-4 border-t border-neutral-800 space-y-3">
                  <Link to="/signin" className="block">
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" className="block">
                    <Button variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
