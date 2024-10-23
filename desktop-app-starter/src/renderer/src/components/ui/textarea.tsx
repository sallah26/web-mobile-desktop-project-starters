import * as React from 'react';

import { cn } from '@/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder: focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-1',
  {
    variants: {
      rounded: {
        default: 'rounded-md',
        left: 'rounded-l-full',
        right: 'rounded-r-full',
        both: 'rounded-r-full rounded-l-full',
        full: 'rounded-full',
      },
      color: {
        default: 'border text-default-foreground  focus-visible:bg-default/20',
        primary:
          'border border-primary-foreground/40 bg-primary/30 text-primary/90  focus-visible:bg-primary/20',
        secondary:
          'border border-secondary-foreground/40 bg-secondary/30 text-secondary/90  focus-visible:bg-secondary/20',
        success:
          'border border-success-foreground/40 bg-success/30 text-success/90  focus-visible:bg-success/20',
        warning:
          'border border-warning-foreground/40 bg-warning/30 text-warning/90  focus-visible:bg-warning/20',
        error:
          'border border-error-foreground/40 bg-error/30 text-error/90  focus-visible:bg-error/20',
      },
    },
    defaultVariants: {
      color: 'default',
      rounded: 'default',
    },
  },
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'color'>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ color, rounded, className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants({
            color,
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
Textarea.displayName = 'Textarea';

export { Textarea };
