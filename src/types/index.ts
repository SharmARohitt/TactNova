// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client';
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Service types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'tech' | 'non-tech';
  tags: string[];
  icon: string;
  featured?: boolean;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'tech' | 'non-tech';
  services: string[];
  client: User;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  budget?: number;
  timeline?: string;
  files?: FileUpload[];
  createdAt: Date;
  updatedAt: Date;
}

// File upload types
export interface FileUpload {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: Date;
}

// Contact form types
export interface ContactForm {
  id: string;
  name: string;
  email: string;
  domain: string;
  message: string;
  files?: FileUpload[];
  status: 'new' | 'responded' | 'closed';
  createdAt: Date;
}

// Chat types
export interface ChatMessage {
  id: string;
  userId?: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ChatSession {
  id: string;
  userId?: string;
  messages: ChatMessage[];
  startedAt: Date;
  endedAt?: Date;
  status: 'active' | 'ended';
}

// Analytics types
export interface AnalyticsData {
  visits: number;
  conversions: number;
  projectRequests: number;
  chatSessions: number;
  revenue: number;
  period: 'day' | 'week' | 'month' | 'year';
  date: Date;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Form validation types
export interface ValidationError {
  field: string;
  message: string;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
}

// 3D Model types
export interface Model3D {
  id: string;
  name: string;
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

// Dashboard statistics
export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalClients: number;
  revenue: number;
  conversionRate: number;
  avgProjectValue: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export type Theme = 'light' | 'dark' | 'auto';
