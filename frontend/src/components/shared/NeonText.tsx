import { cn } from '@/lib/utils';

interface NeonTextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'purple' | 'blue' | 'green';
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

export function NeonText({
  children,
  className,
  color = 'purple',
  as: Tag = 'span',
}: NeonTextProps) {
  const colorClass = {
    purple: 'neon-text',
    blue: 'neon-text-blue',
    green: 'neon-text-green',
  }[color];

  return <Tag className={cn(colorClass, className)}>{children}</Tag>;
}
