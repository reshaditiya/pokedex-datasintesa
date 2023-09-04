'use client';

import { ComboboxType } from '@/components/combobox-type';
import { PokemonCard } from '@/components/pokemon-card';
import { Button } from '@/components/ui/button';
import { PokemonData } from '@/types/pokeapiDB.type';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';

export default function Page() {
  const [favPokemon] = useLocalStorage<PokemonData[]>('favPokemon', []);

  return (
    <main>
      <div className="mt-6 flex items-center">
        <Link href="/">
          <Button variant="secondary">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back Home
          </Button>
        </Link>
        <ComboboxType className="ml-4" />
      </div>
      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    </main>
  );
}
