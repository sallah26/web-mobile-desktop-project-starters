import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import * as React from 'react';

const variants = {
  contain: {
    primary: 'bg-primary text-primary-foreground  hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground  hover:bg-secondary/80',
    success: 'bg-success text-foreground  hover:bg-success/80',
    warning: 'bg-warning text-foreground  hover:bg-warning/80',
    error: 'bg-error text-foreground  hover:bg-error/80',
    white: 'bg-white text-white-foreground  hover:bg-white/80',
  },
  outline: {
    primary: 'border-primary/75 text-primary bg-primary/5 hover:bg-primary/10',
    secondary:
      'border-secondary/75 text-secondary bg-secondary/5 hover:bg-secondary/10',
    success: 'border-success/75 text-success bg-success/5 hover:bg-success/10',
    warning: 'border-warning/75 text-warning bg-warning/5 hover:bg-warning/10',
    error: 'border-error/75  text-error bg-error/5 hover:bg-error/10',
    white: 'border-white/75  text-white bg-white/5 hover:bg-white/10',
  },
  link: {
    primary: 'text-primary bg-primary/5 ',
    secondary: 'text-secondary bg-secondary/5 ',
    success: 'text-success bg-success/5 ',
    warning: 'text-warning bg-warning/5 ',
    error: 'text-error bg-error/5 ',
    white: 'text-white bg-white/5 ',
  },
  ghost: {
    primary: '',
    secondary: '',
    success: '',
    warning: '',
    error: '',
    white: '',
  },
};

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8',
        xl: 'h-14 px-8',
      },
      rounded: {
        default: 'rounded-md',
        left: 'rounded-l-full',
        right: 'rounded-r-full',
        both: 'rounded-r-full rounded-l-full',
        full: 'rounded-full',
      },
      variant: {
        contain: '',
        outline: 'border',
        link: 'underline-offset-4 hover:underline',
        ghost: 'hover:bg-accent/80 text-foreground',
      },
      color: {
        primary: '',
        secondary: '',
        success: '',
        warning: '',
        error: '',
        white: '',
      },
      width: {
        default: 'aspect-auto',
        icon: 'aspect-square p-2',
        full: 'w-full',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
      variant: 'contain',
      rounded: 'default',
      width: 'default',
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      width,
      rounded,
      className,
      variant,
      color,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const selectedVariant = variant ? variants[variant] : variants.contain;
    const selectedColor = color ? selectedVariant[color] : '';

    return (
      <Comp
        className={cn(
          buttonVariants({
            size,
            width,
            variant,
            rounded,
            className,
          }),
          selectedColor,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
  VariantProps<typeof buttonVariants> {
  href: string;
}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { size, width, rounded, className, href, variant, color, ...props },
    ref,
  ) => {
    const selectedVariant = variant ? variants[variant] : variants.contain;
    const selectedColor = color ? selectedVariant[color] : '';

    return (
      <Link
        className={cn(
          buttonVariants({
            size,
            width,
            rounded,
            variant,
            className,
          }),
          selectedColor,
        )}
        ref={ref}
        href={href}
        {...props}
      />
    );
  },
);
LinkButton.displayName = 'LinkButton';

export { Button, LinkButton, buttonVariants };
