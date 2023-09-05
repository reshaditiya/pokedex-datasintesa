import { cn } from '@/lib/utils';
import { CircleDotDashed } from 'lucide-react';

export default function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'my-auto flex w-full flex-1 flex-col items-center justify-center',
        className,
      )}
    >
      <CircleDotDashed className="h-12 w-12 text-gray-800" />
      <h1 className="mt-6 max-w-lg scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        {title}
      </h1>
      <p className="mt-1 max-w-lg text-center">{description}</p>
      <div className="mt-6">{action}</div>
    </div>
  );
}
