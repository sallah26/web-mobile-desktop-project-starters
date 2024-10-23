import * as React from 'react';

import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const inputVariants = cva(
  'flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder: focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-1',
  {
    variants: {
      rounded: {
        default: 'rounded-md',
        left: 'rounded-l-full',
        right: 'rounded-r-full',
        both: 'rounded-r-full rounded-l-full',
        full: 'rounded-full',
      },
      variant: {
        default: 'border text-default-foreground  focus-visible:bg-default/20',
        ghost: 'text-default-foreground',
        primary:
          'border border-primary-foreground/40 bg-primary/30 text-primary-foreground/90  focus-visible:bg-primary/20',
        secondary:
          'border border-secondary-foreground/40 bg-secondary/30 text-secondary-foreground/90  focus-visible:bg-secondary/20',
        success:
          'border border-success-foreground/40 bg-success/30 text-success-foreground/90  focus-visible:bg-success/20',
        warning:
          'border border-warning-foreground/40 bg-warning/30 text-warning-foreground/90  focus-visible:bg-warning/20',
        error:
          'border border-error-foreground/40 bg-error/30 text-error-foreground/90  focus-visible:bg-error/20',
      },
    },
    defaultVariants: {
      variant: 'default',
      rounded: 'default',
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, rounded, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({
            variant,
            rounded,
            className,
          }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
