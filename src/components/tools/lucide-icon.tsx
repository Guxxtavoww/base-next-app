import {
  forwardRef,
  type RefAttributes,
  type ForwardRefExoticComponent,
} from 'react';
import type { LucideProps } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const lucideIconVariants = cva('fade-in-10 transition-all select-none', {
  variants: {
    size: {
      default: 'h-4.5 w-4.5',
      sm: 'h-3.5 w-3.5',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
      xs: 'w-2 h-2',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type LucideIconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

interface iLucideIconProps extends VariantProps<typeof lucideIconVariants> {
  className?: string;
  icon: LucideIconType;
}

const LucideIcon = forwardRef<SVGSVGElement, iLucideIconProps>(
  ({ icon: PropLucideIcon, className, size }, ref) => (
    <PropLucideIcon
      className={lucideIconVariants({ className, size })}
      ref={ref}
    />
  )
);
LucideIcon.displayName = 'LucideIcon';

export { LucideIcon };
