import { Swords, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ThemeToggleButton } from './theme-toggle-button';

export function Navbar({}) {
  return (
    <>
      <nav className="mt-6 flex items-center justify-between">
        <Link href="/" className="flex gap-3 text-lg font-semibold">
          <Swords className="h-6 w-6" />
          Pokedex
        </Link>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="text-yellow-800 dark:text-yellow-200"
            asChild
          >
            <Link href="/favorite">
              <Star className="mr-2 h-4 w-4" /> My Favorite
            </Link>
          </Button>
          <ThemeToggleButton />
        </div>
      </nav>
      <Separator className="mt-6" />
    </>
  );
}
