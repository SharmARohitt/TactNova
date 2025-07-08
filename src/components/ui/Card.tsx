import React from 'react';
import { cn } from '../../utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'cyber' | 'neon';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = 'default', 
    padding = 'md',
    hoverable = false,
    children, 
    ...props 
  }, ref) => {
    const baseStyles = "rounded-xl transition-all duration-300";
    
    const variants = {
      default: "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm",
      glass: "glass backdrop-blur-sm border border-white/20",
      cyber: "bg-gradient-to-br from-neutral-900 to-neutral-800 border border-primary-500/30 shadow-lg shadow-primary-500/10",
      neon: "bg-neutral-900 border-2 border-primary-500 neon-glow shadow-lg shadow-primary-500/25"
    };
    
    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    };

    const hoverEffect = hoverable ? "hover:scale-105 hover:shadow-xl cursor-pointer" : "";

    return (
      <div
        className={cn(
          baseStyles,
          variants[variant],
          paddings[padding],
          hoverEffect,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent 
};

// Compound component pattern
Object.assign(Card, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter
});

export type { CardProps };
