'use client';

import { Star, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useLocalStorage } from 'usehooks-ts';
import { PokemonData, PokemonList } from '@/types/pokeapiDB.type';
import { useToast } from './ui/use-toast';
import { ToastAction } from './ui/toast';
import { capitalizeFirstChar, removeHyphen, titleCase } from '@/lib/utils';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Close } from '@radix-ui/react-popover';

export function FavoriteButton({
  pokemonUrl,
  pokemon,
}: {
  pokemonUrl: string;
  pokemon: PokemonData;
}) {
  const { toast } = useToast();
  const [favPokemon, setFavPokemon] = useLocalStorage<PokemonList['results']>(
    'favPokemon',
    [],
  );
  const isFavorited = !!favPokemon.find(
    (localFav) => localFav.name === pokemon.name,
  );

  function handleClick() {
    if (isFavorited) {
      setFavPokemon((prev) =>
        prev.filter((localFav) => localFav.name !== pokemon.name),
      );
      toast({
        title: `${titleCase(
          removeHyphen(pokemon.name),
        )} removed from favorite!.`,
        description: 'Whoops! you release a pokemon from your favorite.',
        action: (
          <ToastAction altText="My Favorite" asChild>
            <Link href="/favorite">My Favorite</Link>
          </ToastAction>
        ),
        duration: 3000,
      });
    } else {
      setFavPokemon((prevFav) => [
        ...prevFav,
        { name: pokemon.name, url: pokemonUrl },
      ]);
      toast({
        title: `${titleCase(removeHyphen(pokemon.name))} added to favorite!.`,
        description:
          'Gotcha! you add a pokemon to your favorite, catch them all.',
        action: (
          <ToastAction altText="My Favorite" asChild>
            <Link href="/favorite">My Favorite</Link>
          </ToastAction>
        ),
        duration: 3000,
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
      className="text-yellow-800 dark:text-yellow-200"
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
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="text-yellow-800 dark:text-yellow-200"
        >
          <Star className="h-4 w-4 fill-yellow-800 dark:fill-yellow-200" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end">
        <>
          <h4 className="font-medium leading-none">
            Remove {titleCase(removeHyphen(pokemonName))} From Favorite ?
          </h4>
          <p className="text-muted-foreground mt-1 text-sm">
            {`You can manually add ${titleCase(
              removeHyphen(pokemonName),
            )} later after removing.`}
          </p>
          <div className="mt-4 flex gap-3">
            <Button variant="destructive" size="sm" onClick={handleClick}>
              <Trash2 className="mr-1.5 h-4 w-4" />
              Remove
            </Button>
            <Close asChild>
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
