import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Shield,
  Zap,
  Calendar,
  TrendingUp,
  Wifi
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const systemStatus = [
  {
    name: 'Website & Dashboard',
    status: 'operational',
    uptime: '99.98%',
    icon: Globe,
    description: 'Main website and client dashboard'
  },
  {
    name: 'API Services',
    status: 'operational',
    uptime: '99.95%',
    icon: Server,
    description: 'Core API endpoints and integrations'
  },
  {
    name: 'AI & ML Services',
    status: 'operational',
    uptime: '99.92%',
    icon: Zap,
    description: 'AI chatbots and machine learning APIs'
  },
  {
    name: 'Database Systems',
    status: 'operational',
    uptime: '99.99%',
    icon: Database,
    description: 'Primary and backup database clusters'
  },
  {
    name: 'Security Services',
    status: 'operational',
    uptime: '99.97%',
    icon: Shield,
    description: 'Authentication and security monitoring'
  },
  {
    name: 'CDN & Assets',
    status: 'operational',
    uptime: '99.94%',
    icon: Wifi,
    description: 'Content delivery network and static assets'
  }
];

const recentIncidents = [
  {
    id: 1,
    title: 'API Rate Limiting Adjustment',
    status: 'resolved',
    impact: 'Minor',
    startTime: '2025-01-14 14:30 UTC',
    endTime: '2025-01-14 15:15 UTC',
    description: 'Temporary adjustment to API rate limits to optimize performance during high traffic.',
    updates: [
      {
        time: '15:15 UTC',
        message: 'Issue resolved. API rate limits have been restored to normal levels.'
      },
      {
        time: '14:45 UTC',
        message: 'Investigating reports of slower API response times. Adjusting rate limits.'
      },
      {
        time: '14:30 UTC',
        message: 'Monitoring API performance during peak usage hours.'
      }
    ]
  },
  {
    id: 2,
    title: 'Scheduled Database Maintenance',
    status: 'completed',
    impact: 'None',
    startTime: '2025-01-12 02:00 UTC',
    endTime: '2025-01-12 03:30 UTC',
    description: 'Routine database maintenance and performance optimization.',
    updates: [
      {
        time: '03:30 UTC',
        message: 'Maintenance completed successfully. All services are fully operational.'
      },
      {
        time: '02:00 UTC',
        message: 'Starting scheduled database maintenance. No service interruption expected.'
      }
    ]
  }
];

const metrics = [
  {
    label: 'Overall Uptime',
    value: '99.96%',
    period: 'Last 30 days',
    icon: TrendingUp,
    color: 'text-green-400'
  },
  {
    label: 'Average Response Time',
    value: '245ms',
    period: 'Last 24 hours',
    icon: Activity,
    color: 'text-blue-400'
  },
  {
    label: 'Incidents Resolved',
    value: '100%',
    period: 'Last 90 days',
    icon: CheckCircle,
    color: 'text-green-400'
  },
  {
    label: 'Mean Time to Recovery',
    value: '23min',
    period: 'Average',
    icon: Clock,
    color: 'text-yellow-400'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational':
      return 'text-green-400';
    case 'degraded':
      return 'text-yellow-400';
    case 'partial':
      return 'text-orange-400';
    case 'major':
      return 'text-red-400';
    default:
      return 'text-neutral-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational':
      return CheckCircle;
    case 'degraded':
    case 'partial':
      return AlertTriangle;
    case 'major':
      return XCircle;
    default:
      return Clock;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'operational':
      return 'bg-green-500/20 text-green-300';
    case 'degraded':
      return 'bg-yellow-500/20 text-yellow-300';
    case 'partial':
      return 'bg-orange-500/20 text-orange-300';
    case 'major':
      return 'bg-red-500/20 text-red-300';
    case 'resolved':
    case 'completed':
      return 'bg-green-500/20 text-green-300';
    default:
      return 'bg-neutral-500/20 text-neutral-300';
  }
};

export const StatusPage: React.FC = () => {
  const allOperational = systemStatus.every(service => service.status === 'operational');

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
              System <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">Status</span>
            </h1>
            <div className="flex items-center justify-center mb-6">
              {allOperational ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-400 mr-3" />
                  <span className="text-xl text-green-400 font-semibold">All Systems Operational</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3" />
                  <span className="text-xl text-yellow-400 font-semibold">Some Systems Experiencing Issues</span>
                </>
              )}
            </div>
            <p className="text-neutral-300 max-w-2xl mx-auto">
              Real-time status updates for all Tactnova services and infrastructure components.
            </p>
            <div className="text-sm text-neutral-400 mt-4">
              Last updated: {new Date().toLocaleString()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Current Status</h2>
            <p className="text-neutral-300">Live status of all our services and systems</p>
          </motion.div>

          <div className="space-y-4">
            {systemStatus.map((service, index) => {
              const StatusIcon = getStatusIcon(service.status);
              const ServiceIcon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                            <ServiceIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                            <p className="text-sm text-neutral-400">{service.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-neutral-400">Uptime</div>
                            <div className="text-lg font-semibold text-white">{service.uptime}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-5 h-5 ${getStatusColor(service.status)}`} />
                            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusBadge(service.status)}`}>
                              {service.status}
                            </span>
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

      {/* Performance Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Performance Metrics</h2>
            <p className="text-neutral-300">Key performance indicators for our infrastructure</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card variant="cyber">
                    <CardContent className="p-6 text-center">
                      <Icon className={`w-8 h-8 ${metric.color} mx-auto mb-4`} />
                      <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                      <div className="text-white font-medium mb-1">{metric.label}</div>
                      <div className="text-sm text-neutral-400">{metric.period}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Recent Incidents</h2>
            <p className="text-neutral-300">Latest updates on system incidents and maintenance</p>
          </motion.div>

          <div className="space-y-8">
            {recentIncidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card variant="cyber">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{incident.title}</h3>
                        <p className="text-neutral-300 mb-4">{incident.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-neutral-400">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {incident.startTime} - {incident.endTime}
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(incident.status)}`}>
                            {incident.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            incident.impact === 'Minor' ? 'bg-yellow-500/20 text-yellow-300' :
                            incident.impact === 'Major' ? 'bg-red-500/20 text-red-300' :
                            'bg-neutral-500/20 text-neutral-300'
                          }`}>
                            {incident.impact} Impact
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-neutral-700 pt-4">
                      <h4 className="text-white font-medium mb-3">Timeline</h4>
                      <div className="space-y-3">
                        {incident.updates.map((update, updateIndex) => (
                          <div key={updateIndex} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-primary-400 rounded-full mt-2"></div>
                            <div>
                              <div className="text-sm text-neutral-400">{update.time}</div>
                              <div className="text-neutral-300">{update.message}</div>
                            </div>
                          </div>
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

      {/* Subscribe to Updates */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Subscribe to receive notifications about system status changes and planned maintenance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-neutral-100 transition-colors">
                Subscribe to Updates
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                RSS Feed
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
