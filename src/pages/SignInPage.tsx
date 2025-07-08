import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, ArrowRight, 
  Chrome, Github, Linkedin, Shield
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import tactnovaLogo from '../assets/images/tactnovawithoutbg.png';

// Form data interface
interface SignInFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

const SignInPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    }
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock authentication success
      toast.success('Welcome back! Redirecting to dashboard...');
      
      // In a real app, you would:
      // 1. Call your authentication API
      // 2. Store the token/session
      // 3. Redirect to dashboard or intended page
      console.log('Sign in data:', data);
      
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (provider: string) => {
    toast.success(`${provider} sign-in coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 flex items-center justify-center px-4 py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="mx-auto w-20 h-20 mb-4 flex items-center justify-center">
                <img 
                  src={tactnovaLogo} 
                  alt="TactNova Logo" 
                  className="w-16 h-16 object-contain filter drop-shadow-lg"
                />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to continue to TactNova</p>
            </motion.div>
          </div>

          {/* Sign In Form */}
          <Card className="backdrop-blur-sm bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      {...register('email')}
                      error={errors.email?.message}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      {...register('password')}
                      error={errors.password?.message}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="w-4 h-4 text-blue-500 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-800/50 text-gray-400">Or continue with</span>
                  </div>
                </div>
              </div>

              {/* Social Sign In */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleSocialSignIn('Google')}
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  Continue with Google
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignIn('GitHub')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialSignIn('LinkedIn')}
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link
                    to="/sign-up"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Shield className="h-4 w-4 mr-2" />
              Your information is encrypted and secure
            </div>
          </motion.div>

          {/* Demo Credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6"
          >
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="text-sm font-medium text-blue-400 mb-2">Demo Credentials</h3>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>Email: demo@tactnova.com</p>
                    <p>Password: demo123456</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;
