import React from 'react';
import { cn } from '../../utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    icon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:from-primary-700 hover:to-accent-700 focus:ring-primary-500",
      secondary: "bg-neutral-800 text-white hover:bg-neutral-700 focus:ring-neutral-500",
      outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500",
      ghost: "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 focus:ring-neutral-500",
      cyber: "cyber-button relative overflow-hidden"
    };
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
      xl: "px-8 py-4 text-lg"
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          loading && "cursor-wait",
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && (
          <div className="loading-spinner mr-2 w-4 h-4" />
        )}
        {icon && !loading && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
