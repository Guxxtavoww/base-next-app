import {
  forwardRef,
  type RefAttributes,
  type ForwardRefExoticComponent,
} from 'react';
import type { lucide-reactProps } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

const lucide-reactIconVariants = cva('fade-in-10 transition-all select-none', {
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

export type lucide-reactIconType = ForwardRefExoticComponent<
  Omit<lucide-reactProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

interface ilucide-reactIconProps extends VariantProps<typeof lucide-reactIconVariants> {
  className?: string;
  icon: lucide-reactIconType;
}

const lucide-reactIcon = forwardRef<SVGSVGElement, ilucide-reactIconProps>(
  ({ icon: Proplucide-reactIcon, className, size }, ref) => (
    <Proplucide-reactIcon
      className={lucide-reactIconVariants({ className, size })}
      ref={ref}
    />
  )
);
lucide-reactIcon.displayName = 'lucide-reactIcon';

export { lucide-reactIcon };
