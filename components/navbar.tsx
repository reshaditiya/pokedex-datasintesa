'use client';

import { Swords, Star, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ThemeToggleButton } from './theme-toggle-button';
import { useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { smoothScroll } from '@/lib/utils';

export function Navbar({}) {
  const navBarRef = useRef<HTMLDivElement | null>(null);
  const navBar = useIntersectionObserver(navBarRef, {});

  return (
    <>
      <nav
        className="mt-6 flex items-center justify-between"
        ref={navBarRef}
        id="navBar"
      >
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

      {!navBar?.isIntersecting && (
        <Button
          variant="secondary"
          className="fixed bottom-6 right-6 z-10 shadow-md"
          onClick={(e) => smoothScroll(e, 'navBar')}
        >
          <ChevronUp className="mr-2 h-4 w-4" />
          Back to Top
        </Button>
      )}
    </>
  );
}
