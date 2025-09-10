import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';

export const TermsOfServicePage: React.FC = () => {
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
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Service</span>
            </h1>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-8">
              Please read these terms and conditions carefully before using our services.
            </p>
            <div className="text-sm text-neutral-400">
              Last updated: January 15, 2025
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-12">
              {/* Acceptance */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    By accessing and using Tactnova's services, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please do not 
                    use this service.
                  </p>
                </div>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">2. Description of Services</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Tactnova provides dual-niche innovation services including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>AI and Machine Learning development</li>
                    <li>Full-stack web development</li>
                    <li>Cybersecurity solutions</li>
                    <li>Creative and design services</li>
                    <li>Business strategy consulting</li>
                    <li>Content creation and marketing</li>
                  </ul>
                </div>
              </div>

              {/* User Responsibilities */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">3. User Responsibilities</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>As a user of our services, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Use our services lawfully and ethically</li>
                    <li>Not attempt to breach our security systems</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not engage in harmful or malicious activities</li>
                  </ul>
                </div>
              </div>

              {/* Payment Terms */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">4. Payment Terms</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Payment terms are established on a project-by-project basis. Standard terms include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>50% payment upon project initiation</li>
                    <li>Remaining balance upon project completion</li>
                    <li>Net 30 payment terms for established clients</li>
                    <li>Late payment fees may apply</li>
                  </ul>
                </div>
              </div>

              {/* Intellectual Property */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">5. Intellectual Property</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Unless otherwise specified in writing, all work products created by Tactnova become 
                    the property of the client upon full payment. Tactnova retains the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Use general methodologies and know-how in future projects</li>
                    <li>Reference the project in portfolios and case studies (with permission)</li>
                    <li>Retain ownership of proprietary tools and frameworks</li>
                  </ul>
                </div>
              </div>

              {/* Confidentiality */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">6. Confidentiality</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Tactnova agrees to maintain the confidentiality of all client information and will 
                    not disclose any proprietary or confidential information without written consent, 
                    except as required by law.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">7. Limitation of Liability</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    In no event shall Tactnova be liable for any indirect, incidental, special, 
                    consequential, or punitive damages, including without limitation, loss of profits, 
                    data, use, or other intangible losses.
                  </p>
                </div>
              </div>

              {/* Service Availability */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">8. Service Availability</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    While we strive for 99.9% uptime, Tactnova does not guarantee uninterrupted access 
                    to our services. We reserve the right to suspend services for maintenance, updates, 
                    or other operational reasons.
                  </p>
                </div>
              </div>

              {/* Termination */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">9. Termination</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Either party may terminate services with written notice. Upon termination:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All outstanding payments become due immediately</li>
                    <li>Work products completed to date will be delivered</li>
                    <li>Confidentiality obligations continue</li>
                    <li>Access to our systems and services will be revoked</li>
                  </ul>
                </div>
              </div>

              {/* Governing Law */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">10. Governing Law</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    These terms shall be governed by and construed in accordance with the laws of India. 
                    Any disputes arising from these terms shall be subject to the jurisdiction of the 
                    courts in New Delhi, India.
                  </p>
                </div>
              </div>

              {/* Changes to Terms */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">11. Changes to Terms</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>
                    Tactnova reserves the right to modify these terms at any time. Changes will be 
                    effective immediately upon posting to our website. Your continued use of our 
                    services constitutes acceptance of the modified terms.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">12. Contact Information</h2>
                <div className="text-neutral-300 space-y-4">
                  <p>If you have any questions about these Terms of Service, please contact us:</p>
                  <div className="bg-neutral-800 rounded-lg p-6 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-primary-400 mr-3" />
                        <span>legal@tactnova.com</span>
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
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Now that you understand our terms, let's begin your innovation journey with Tactnova.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/privacy">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                  Privacy Policy
                  <Shield className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
