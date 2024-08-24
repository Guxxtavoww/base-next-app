import { cn } from '@/utils/cn.util';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): JSX.Element {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
