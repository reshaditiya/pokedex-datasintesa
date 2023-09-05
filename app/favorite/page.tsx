'use client';

import { PokemonCard } from '@/components/pokemon-card';
import { Button } from '@/components/ui/button';
import { PokemonList } from '@/types/pokeapiDB.type';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

export default function Page() {
  const [favPokemon] = useLocalStorage<PokemonList['results']>(
    'favPokemon',
    [],
  );

  return (
    <main>
      <h1 className="mt-6 scroll-m-20 text-2xl font-semibold tracking-tight">
        My Favorite
      </h1>
      <div className="mt-6 flex items-center">
        <Link href="/">
          <Button variant="secondary">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back Home
          </Button>
        </Link>
      </div>
      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favPokemon
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
          ))}
      </section>
    </main>
  );
}
