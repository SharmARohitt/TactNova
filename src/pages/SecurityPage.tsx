import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: 'Data Protection',
    description: 'Enterprise-grade encryption and secure data handling practices'
  },
  {
    icon: Lock,
    title: 'Access Control',
    description: 'Multi-factor authentication and role-based access controls'
  },
  {
    icon: Eye,
    title: 'Privacy First',
    description: 'Transparent privacy policies and user data protection'
  },
  {
    icon: FileText,
    title: 'Compliance',
    description: 'GDPR, CCPA, and industry standard compliance measures'
  }
];

const vulnerabilityProcess = [
  {
    step: 1,
    title: 'Report',
    description: 'Submit vulnerability details through our secure channel'
  },
  {
    step: 2,
    title: 'Acknowledge',
    description: 'We acknowledge receipt within 24 hours'
  },
  {
    step: 3,
    title: 'Investigate',
    description: 'Our security team investigates and validates the issue'
  },
  {
    step: 4,
    title: 'Fix & Notify',
    description: 'Issue is resolved and reporter is notified of the fix'
  }
];

export const SecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950 pt-20">
      {/* Hero Section */}
      <section className="py-20 cyber-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display">
            Security & <span className="text-gradient">Trust</span>
          </h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
            Your security is our priority. Learn about our comprehensive security measures 
            and responsible disclosure practices.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Security Measures</h2>
            <p className="text-neutral-400 text-lg">Comprehensive protection for your data and privacy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-neutral-800/50 border-neutral-700 hover:border-primary-500/50 transition-all duration-300">
                  <CardContent className="text-center py-8">
                    <Icon className="w-12 h-12 text-primary-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-neutral-400 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 font-display">Responsible Disclosure</h2>
            <p className="text-neutral-400 text-lg">Help us maintain security through responsible vulnerability reporting</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Report Security Issues</h3>
              <p className="text-neutral-400 mb-8">
                We appreciate security researchers and users who help us maintain the security 
                of our platform. If you discover a security vulnerability, please follow our 
                responsible disclosure process.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">In Scope</h4>
                    <p className="text-neutral-400 text-sm">
                      Web applications, mobile apps, APIs, and infrastructure components
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">Out of Scope</h4>
                    <p className="text-neutral-400 text-sm">
                      Social engineering, physical attacks, third-party services, or denial of service
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="primary" className="mr-4">
                  <Mail className="w-4 h-4 mr-2" />
                  Report Vulnerability
                </Button>
                <Button variant="secondary">
                  <FileText className="w-4 h-4 mr-2" />
                  Security Policy
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Disclosure Process</h3>
              <div className="space-y-6">
                {vulnerabilityProcess.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                      <p className="text-neutral-400 text-sm">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-primary-500/10 to-accent-500/10 border-primary-500/30">
            <CardContent className="p-12 text-center">
              <Shield className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Security Contact</h2>
              <p className="text-neutral-300 text-lg mb-8 max-w-2xl mx-auto">
                For security-related inquiries, vulnerability reports, or compliance questions, 
                please contact our security team directly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Email</h3>
                  <p className="text-neutral-300">security@tactnova.com</p>
                  <p className="text-neutral-400 text-sm mt-1">Encrypted communication preferred</p>
                </div>
                
                <div className="text-center">
                  <Phone className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                  <h3 className="text-white font-semibold mb-2">Emergency</h3>
                  <p className="text-neutral-300">+91 9205828350</p>
                  <p className="text-neutral-400 text-sm mt-1">Critical vulnerabilities only</p>
                </div>
              </div>

              <div className="mt-8 text-sm text-neutral-400">
                <p>Expected response time: 24 hours for critical issues, 72 hours for others</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Security Certifications */}
      <section className="py-20 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-display">Security Standards</h2>
          <p className="text-neutral-400 text-lg mb-12">We adhere to industry-leading security standards</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">ISO 27001</h3>
                <p className="text-neutral-400 text-sm">Information Security Management (Planned)</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">SOC 2</h3>
                <p className="text-neutral-400 text-sm">Security & Availability (In Progress)</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-800/50 border-neutral-700">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">GDPR</h3>
                <p className="text-neutral-400 text-sm">Data Protection Compliance</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
