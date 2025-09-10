import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

const privacyPrinciples = [
  {
    icon: Shield,
    title: 'Data Protection',
    description: 'We implement industry-standard security measures to protect your personal information.'
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We are clear about what data we collect, how we use it, and with whom we share it.'
  },
  {
    icon: Lock,
    title: 'User Control',
    description: 'You have full control over your data with options to access, modify, or delete it.'
  },
  {
    icon: Database,
    title: 'Minimal Collection',
    description: 'We only collect data that is necessary for providing and improving our services.'
  }
];

export const PrivacyPolicyPage: React.FC = () => {
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
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Policy</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Your privacy is our priority. Learn how we collect, use, and protect your information.
            </p>
            <div className="text-sm text-neutral-400">
              Last updated: January 15, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Principles */}
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
              Our Privacy Principles
            </h2>
            <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
              These principles guide how we handle your personal information
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyPrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber" className="h-full text-center">
                    <CardContent className="p-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-neutral-300 text-sm">
                        {principle.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">1. Introduction</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Welcome to Tactnova ("we," "our," or "us"). This Privacy Policy explains how we collect, 
                    use, disclose, and safeguard your information when you use our website, services, or 
                    interact with us.
                  </p>
                  <p>
                    By using our services, you agree to the collection and use of information in accordance 
                    with this policy. If you do not agree with our policies and practices, do not use our services.
                  </p>
                </div>
              </div>

              {/* Information We Collect */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">2. Information We Collect</h2>
                <div className="text-neutral-300 space-y-4">
                  <h3 className="text-lg font-semibold text-primary-400">Personal Information</h3>
                  <p>We may collect the following types of personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, and contact information</li>
                    <li>Company name and job title</li>
                    <li>Payment and billing information</li>
                    <li>Communication preferences</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-primary-400 mt-6">Technical Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and browser information</li>
                    <li>Device information and operating system</li>
                    <li>Usage data and analytics</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>

              {/* How We Use Information */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">3. How We Use Your Information</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Develop new products and services</li>
                    <li>Personalize your experience</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">4. Information Sharing and Disclosure</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our business</li>
                    <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                    <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
                    <li><strong>Consent:</strong> With your explicit consent</li>
                  </ul>
                </div>
              </div>

              {/* Data Security */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">5. Data Security</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your 
                    personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p>These measures include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </div>
              </div>

              {/* Your Rights */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">6. Your Privacy Rights</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Access:</strong> Request access to your personal information</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                    <li><strong>Portability:</strong> Request transfer of your data</li>
                    <li><strong>Objection:</strong> Object to certain processing activities</li>
                    <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at privacy@tactnova.com.
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">7. Cookies and Tracking Technologies</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    We use cookies and similar tracking technologies to enhance your experience on our website. 
                    You can manage your cookie preferences through your browser settings.
                  </p>
                  <p>Types of cookies we use:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how our website is used</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  </ul>
                </div>
              </div>

              {/* Data Retention */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">8. Data Retention</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    We retain your personal information only as long as necessary for the purposes outlined 
                    in this Privacy Policy, unless a longer retention period is required by law.
                  </p>
                </div>
              </div>

              {/* International Transfers */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">9. International Data Transfers</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Your information may be transferred to and processed in countries other than your own. 
                    We ensure appropriate safeguards are in place for such transfers.
                  </p>
                </div>
              </div>

              {/* Children's Privacy */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">10. Children's Privacy</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Our services are not intended for children under 13 years of age. We do not knowingly 
                    collect personal information from children under 13.
                  </p>
                </div>
              </div>

              {/* Changes to Policy */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">11. Changes to This Privacy Policy</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes 
                    by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">12. Contact Us</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>If you have any questions about this Privacy Policy, please contact us:</p>
                  <div className="bg-neutral-800 rounded-lg p-6 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-primary-400 mr-3" />
                        <span>privacy@tactnova.com</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-primary-400 mr-3" />
                        <span>tactnovaofficiall@gmail.com</span>
                      </div>
                      <div className="text-sm text-neutral-400 mt-4">
                        Tactnova<br />
                        New Delhi, India
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
              Questions About Your Privacy?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              We're here to help. Contact our privacy team for any questions or concerns 
              about how we handle your personal information.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Contact Privacy Team
                  <Mail className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/security">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Security Information
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
