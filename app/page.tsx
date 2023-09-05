'use client';

import { ComboboxType } from '@/components/combobox-type';
import { PokemonCard } from '@/components/pokemon-card';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PokemonList } from '@/types/pokeapiDB.type';
import { useIntersectionObserver } from 'usehooks-ts';

const DATA_PER_FETCH = 12;

export default function Home() {
  const { data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<PokemonList>({
      queryKey: ['pokemonList'],
      queryFn: ({ pageParam = 1 }) =>
        fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${DATA_PER_FETCH}&offset=${
            (pageParam - 1) * DATA_PER_FETCH
          }`,
        ).then((data) => data.json()),
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: {
        pages: [],
        pageParams: [1],
      },
      cacheTime: Infinity,
    });
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const lastElement = useIntersectionObserver(lastElementRef, {});

  useEffect(() => {
    if (lastElement?.isIntersecting) fetchNextPage();
  }, [lastElement, fetchNextPage]);

  const pokemonListPages = data?.pages.flatMap((page) => page);

  return (
    <main>
      <ComboboxType className="mt-6" />
      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonListPages?.map((pokemonList) =>
          pokemonList.results.map((pokemon, i) =>
            i === pokemonList.results.length - 1 ? (
              <PokemonCard
                ref={lastElementRef}
                key={pokemon.name}
                pokemonUrl={pokemon.url}
              />
            ) : (
              <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
            ),
          ),
        )}
      </section>
    </main>
  );
}
