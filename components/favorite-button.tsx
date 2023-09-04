'use client';

import { Star, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useLocalStorage } from 'usehooks-ts';
import { PokemonData } from '@/types/pokeapiDB.type';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { capitalizeFirstChar, cn } from '@/lib/utils';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Close } from '@radix-ui/react-popover';

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

  return isFavorited ? (
    <RemoveButton handleClick={handleClick} pokemonName={pokemon.name} />
  ) : (
    <AddButton handleClick={handleClick} />
  );
}

function AddButton({ handleClick }: { handleClick: () => void }) {
  return (
    <Button
      size="icon"
      variant="secondary"
      className="text-yellow-800"
      onClick={handleClick}
    >
      <Star className="h-4 w-4" />
    </Button>
  );
}

function RemoveButton({
  handleClick,
  pokemonName,
}: {
  handleClick: () => void;
  pokemonName: string;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Button size="icon" variant="secondary" className="text-yellow-800">
          <Star className="h-4 w-4 fill-yellow-800" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <>
          <h4 className="font-medium leading-none">
            Remove {capitalizeFirstChar(pokemonName)} ?
          </h4>
          <p className="text-muted-foreground mt-1 text-sm">
            Remove action cannot be undone.
          </p>
          <div className="mt-4 flex gap-3">
            <Button variant="destructive" size="sm" onClick={handleClick}>
              <Trash2 className="mr-1.5 h-4 w-4" />
              Remove
            </Button>
            <Close>
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
            </Close>
          </div>
        </>
      </PopoverContent>
    </Popover>
  );
}