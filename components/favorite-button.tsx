'use client';

import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { useLocalStorage } from 'usehooks-ts';
import { PokemonData } from '@/types/pokeapiDB.type';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { capitalizeFirstChar, cn } from '@/lib/utils';
import Link from 'next/link';

export function FavoriteButton({ pokemon }: { pokemon: PokemonData }) {
  const { toast } = useToast();
  const [favPokemon, setFavPokemon] = useLocalStorage<PokemonData[]>(
    'favPokemon',
    [],
  );
  const isFavorited = !!favPokemon.find((p) => p.id === pokemon.id);

  function handleClick() {
    if (isFavorited) {
      setFavPokemon((prev) => prev.filter((p) => p.id !== pokemon.id));
      toast({
        title: `${capitalizeFirstChar(pokemon.name)} removed from favorite!.`,
        description: 'Whoops! you release a pokemon from your favorite.',
        action: (
          <ToastAction altText="My Favorite" asChild>
            <Link href="/favorite">My Favorite</Link>
          </ToastAction>
        ),
      });
    } else {
      setFavPokemon((prev) => [...prev, pokemon]);
      toast({
        title: `${capitalizeFirstChar(pokemon.name)} added to favorite!.`,
        description:
          'Gotcha! you add a pokemon to your favorite, catch them all.',
        action: (
          <ToastAction altText="My Favorite" asChild>
            <Link href="/favorite">My Favorite</Link>
          </ToastAction>
        ),
      });
    }
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      className="text-yellow-800"
      onClick={handleClick}
    >
      <Star className={cn('h-4 w-4', isFavorited && 'fill-yellow-800')} />
    </Button>
  );
}
