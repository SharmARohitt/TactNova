import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, Lock, Eye, EyeOff, User, Building2, Phone,
  ArrowRight, Chrome, Github, Linkedin, Shield, 
  Check, X
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import tactnovaLogo from '../assets/images/tactnovawithoutbg.png';

// Form data interface
interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
  newsletter?: boolean;
}

const SignUpPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger
  } = useForm<SignUpFormData>({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      phone: '',
      password: '',
      confirmPassword: '',
      terms: false,
      newsletter: false
    }
  });

  const password = watch('password');

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    const checks = [
      { label: 'At least 8 characters', test: password.length >= 8 },
      { label: 'Contains uppercase letter', test: /[A-Z]/.test(password) },
      { label: 'Contains lowercase letter', test: /[a-z]/.test(password) },
      { label: 'Contains number', test: /\d/.test(password) },
      { label: 'Contains special character', test: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
    ];
    return checks;
  };

  const passwordChecks = getPasswordStrength(password || '');
  const passwordStrength = passwordChecks.filter(check => check.test).length;

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(['firstName', 'lastName', 'email', 'company', 'phone']);
      if (isValid) {
        setCurrentStep(2);
      }
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock registration success
      toast.success('Account created successfully! Please check your email to verify your account.');
      
      // In a real app, you would:
      // 1. Call your registration API
      // 2. Handle email verification
      // 3. Redirect to sign-in or dashboard
      console.log('Sign up data:', data);
      
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignUp = (provider: string) => {
    toast.success(`${provider} sign-up coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center px-4 py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl" />
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
              <h1 className="text-3xl font-bold text-white mb-2">Join TactNova</h1>
              <p className="text-gray-400">Create your account to get started</p>
            </motion.div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center space-x-2 mb-6">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-2 rounded-full transition-colors ${
                    index + 1 <= currentStep ? 'bg-purple-500' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Sign Up Form */}
          <Card className="backdrop-blur-sm bg-gray-800/50 border-gray-700/50">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-white mb-2">Personal Information</h2>
                      <p className="text-gray-400 text-sm">Tell us about yourself</p>
                    </div>

                    {/* Name Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            className="pl-10"
                            {...register('firstName')}
                            error={errors.firstName?.message}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          {...register('lastName')}
                          error={errors.lastName?.message}
                        />
                      </div>
                    </div>

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
                          placeholder="john@company.com"
                          className="pl-10"
                          {...register('email')}
                          error={errors.email?.message}
                        />
                      </div>
                    </div>

                    {/* Company Field */}
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Your Company"
                          className="pl-10"
                          {...register('company')}
                          error={errors.company?.message}
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                          {...register('phone')}
                          error={errors.phone?.message}
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-full"
                      size="lg"
                    >
                      Next Step
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-semibold text-white mb-2">Security & Preferences</h2>
                      <p className="text-gray-400 text-sm">Set up your password and preferences</p>
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
                          placeholder="Create a strong password"
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

                      {/* Password Strength Indicator */}
                      {password && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Password Strength</span>
                            <span className={`text-sm ${
                              passwordStrength <= 2 ? 'text-red-400' :
                              passwordStrength <= 4 ? 'text-yellow-400' : 'text-green-400'
                            }`}>
                              {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                passwordStrength <= 2 ? 'bg-red-400' :
                                passwordStrength <= 4 ? 'bg-yellow-400' : 'bg-green-400'
                              }`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                          </div>
                          <div className="space-y-1">
                            {passwordChecks.map((check, index) => (
                              <div key={index} className="flex items-center text-xs">
                                {check.test ? (
                                  <Check className="h-3 w-3 text-green-400 mr-2" />
                                ) : (
                                  <X className="h-3 w-3 text-gray-500 mr-2" />
                                )}
                                <span className={check.test ? 'text-green-400' : 'text-gray-500'}>
                                  {check.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          className="pl-10 pr-10"
                          {...register('confirmPassword')}
                          error={errors.confirmPassword?.message}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Terms and Newsletter */}
                    <div className="space-y-4">
                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          {...register('terms')}
                          className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                        />
                        <span className="ml-3 text-sm text-gray-300">
                          I agree to the{' '}
                          <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {errors.terms && (
                        <p className="text-red-400 text-sm">{errors.terms.message}</p>
                      )}

                      <label className="flex items-start">
                        <input
                          type="checkbox"
                          {...register('newsletter')}
                          className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2 mt-1"
                        />
                        <span className="ml-3 text-sm text-gray-300">
                          Subscribe to our newsletter for updates and insights
                        </span>
                      </label>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={isLoading}
                        size="lg"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </form>

              {currentStep === 1 && (
                <>
                  {/* Divider */}
                  <div className="my-8">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-600" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-gray-800/50 text-gray-400">Or sign up with</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Sign Up */}
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleSocialSignUp('Google')}
                    >
                      <Chrome className="mr-2 h-5 w-5" />
                      Continue with Google
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp('GitHub')}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp('LinkedIn')}
                      >
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>
                </>
              )}

              {/* Sign In Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link
                    to="/sign-in"
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Sign in
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
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
