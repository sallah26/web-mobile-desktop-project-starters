import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const variants = {
  contain: {
    primary: 'bg-primary text-primary-foreground  [&>svg]:text-primary/80',
    secondary:
      'bg-secondary text-secondary-foreground  [&>svg]:text-secondary/80',
    success: 'bg-success text-foreground  [&>svg]:text-success/80',
    warning: 'bg-warning text-foreground  [&>svg]:text-warning/80',
    error: 'bg-error text-foreground  [&>svg]:text-error/80',
  },
  outline: {
    primary:
      'border-primary/75 text-primary bg-primary/5 [&>svg]:text-primary/10',
    secondary:
      'border-secondary/75 text-secondary bg-secondary/5 [&>svg]:text-secondary/10',
    success:
      'border-success/75 text-success bg-success/5 [&>svg]:text-success/10',
    warning:
      'border-warning/75 text-warning bg-warning/5 [&>svg]:text-warning/10',
    error: 'border-error/75  text-error bg-error/5 [&>svg]:text-error/10',
  },
};

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      color: {
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        error: '',
      },
      variant: {
        contain: '',
        outline: 'border',
      },
    },
    defaultVariants: {
      color: 'primary',
      variant: 'outline',
    },
  },
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, color, variant, ...props }, ref) => {
  const selectedVariant = variant ? variants[variant] : variants.contain;
  const selectedColor = color
    ? selectedVariant[color]
    : variants.outline.primary;

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ color }), selectedColor, className)}
      {...props}
    />
  );
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription };
