'use client';

import { ComboboxType } from '@/components/combobox-type';
import { PokemonCard } from '@/components/pokemon-card';
import { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { useGetPokemons } from '../hooks/useGetPokemons';

export default function Home() {
  const [page, setPage] = useState(1);
  const { isLoading, pokemonDatas } = useGetPokemons({
    page: page,
  });
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const lastElement = useIntersectionObserver(lastElementRef, {});
  const isVisible = !!lastElement?.isIntersecting;

  useEffect(() => {
    if (!isLoading && isVisible) {
      setPage((prev) => prev + 1);
    }
  }, [isVisible, isLoading]);

  return (
    <main>
      <ComboboxType className="mt-6" />
      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? 'Loading...'
          : pokemonDatas
              .sort((a, b) => a.id - b.id)
              .map((pokemon, i) =>
                i === pokemonDatas.length - 1 ? (
                  <PokemonCard
                    ref={lastElementRef}
                    key={pokemon.id}
                    name={pokemon.name}
                    types={pokemon.types.map((type: any) => type.type.name)}
                    image={
                      pokemon.sprites.other['official-artwork'].front_default!
                    }
                    id={pokemon.id}
                  />
                ) : (
                  <PokemonCard
                    key={pokemon.id}
                    name={pokemon.name}
                    types={pokemon.types.map((type: any) => type.type.name)}
                    image={
                      pokemon.sprites.other['official-artwork'].front_default!
                    }
                    id={pokemon.id}
                  />
                ),
              )}
      </section>
    </main>
  );
}
