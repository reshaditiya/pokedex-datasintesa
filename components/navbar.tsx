import { Swords, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export function Navbar({}) {
  return (
    <>
      <nav className="mt-6 flex items-center justify-between">
        <Link href="/" as="span" className="flex gap-3 text-lg font-semibold">
          <Swords className="h-6 w-6" />
          Pokedex
        </Link>
        <Button variant="secondary" className="text-yellow-800" asChild>
          <Link href="/favorite">
            <Star className="mr-2 h-4 w-4" /> My Favorite
          </Link>
        </Button>
      </nav>
      <Separator className="mt-6" />
    </>
  );
}
