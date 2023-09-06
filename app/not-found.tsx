import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <EmptyState
      title="Oops, Seems Like You Got Lost"
      description="Go to the home page and start to catch the pokemon you like."
      action={
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Home Page
          </Link>
        </Button>
      }
    />
  );
}
