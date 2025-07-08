import React from 'react';
import { cn } from '../../utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'cyber' | 'glass';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type = 'text',
    label,
    error,
    icon,
    variant = 'default',
    ...props 
  }, ref) => {
    const baseStyles = "w-full px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50";
    
    const variants = {
      default: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-primary-500 focus:border-primary-500",
      cyber: "bg-neutral-900 border-2 border-primary-500/30 rounded-lg text-primary-100 placeholder-primary-300/50 focus:border-primary-500 focus:ring-primary-500/50 shadow-sm shadow-primary-500/10",
      glass: "glass backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary-500 focus:ring-primary-500/50"
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-400">{icon}</span>
            </div>
          )}
          <input
            type={type}
            className={cn(
              baseStyles,
              variants[variant],
              icon && "pl-10",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'default' | 'cyber' | 'glass';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    label,
    error,
    variant = 'default',
    ...props 
  }, ref) => {
    const baseStyles = "w-full px-3 py-2 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical min-h-[80px]";
    
    const variants = {
      default: "bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg focus:ring-primary-500 focus:border-primary-500",
      cyber: "bg-neutral-900 border-2 border-primary-500/30 rounded-lg text-primary-100 placeholder-primary-300/50 focus:border-primary-500 focus:ring-primary-500/50 shadow-sm shadow-primary-500/10",
      glass: "glass backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-primary-500 focus:ring-primary-500/50"
    };

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            baseStyles,
            variants[variant],
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
export type { InputProps, TextareaProps };
