'use client';

import { BackButton } from '@/components/back-button';
import EmptyState from '@/components/empty-state';
import { PokemonCard } from '@/components/pokemon-card';
import { Button } from '@/components/ui/button';
import { PokemonList } from '@/types/pokeapiDB.type';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

export default function Page() {
  const [favPokemon] = useLocalStorage<PokemonList['results']>(
    'favPokemon',
    [],
  );

  return (
    <main className="flex flex-1 flex-col">
      <h1 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        My Favorite
      </h1>
      <div className="mt-6 flex items-center">
        <BackButton />
      </div>
      {favPokemon.length === 0 ? (
        <EmptyState
          title="Favorite Is Empty!"
          description="Go to the home page and add star the pokemon you like."
          action={
            <Button asChild>
              <Link href="/">
                <Plus className="mr-2 h-4 w-4" />
                Catch Them All
              </Link>
            </Button>
          }
        />
      ) : (
        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {favPokemon
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
            ))}
        </section>
      )}
    </main>
  );
}
