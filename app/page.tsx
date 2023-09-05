'use client';

import { ComboboxType } from '@/components/combobox-type';
import { PokemonCard } from '@/components/pokemon-card';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PokemonList, PokemonTypesAPI } from '@/types/pokeapiDB.type';
import { useIntersectionObserver } from 'usehooks-ts';
import SkeletonHomePage from '@/components/skeleton-home-page';
import EmptyState from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import ErrorState from '@/components/error-state';

const DATA_PER_FETCH = 12;

function pokemonListReducer(
  state: PokemonList['results'],
  action: {
    type: 'insert' | 'upsert' | 'reset';
    payload: PokemonList['results'];
  },
) {
  switch (action.type) {
    case 'insert': {
      return [...action.payload].sort((a, b) => a.name.localeCompare(b.name));
    }
    case 'upsert': {
      //insert pokemon if not exist
      state = [
        ...state,
        ...action.payload.filter(
          (dataPayload) =>
            !state.some((dataState) => dataState.name === dataPayload.name),
        ),
      ];
      return state.sort((a, b) => a.name.localeCompare(b.name));
    }
    case 'reset': {
      return [];
    }
    default:
      return state;
  }
}

export default function Home() {
  const [filterType, setFilterType] = useState<Array<string>>([]);
  const [page, setPage] = useState(1);
  const [pokemonList, dispatchPokemonList] = useReducer(pokemonListReducer, []);

  //element for infinite scrolling
  const lastElementRef = useRef<HTMLDivElement | null>(null);
  const lastElement = useIntersectionObserver(lastElementRef, {});

  const { data, refetch, isLoading, isError } = useQuery<
    PokemonList['results']
  >({
    queryKey: ['pokemonList'],
    queryFn: async () => {
      //automatically fetch filtered data or all
      if (filterType.length > 0) {
        const response: PokemonTypesAPI = await fetch(
          `${process.env.NEXT_PUBLIC_POKEMON_API}/type/${
            filterType[filterType.length - 1]
          }`,
        ).then((data) => data.json());

        return response.pokemon.map((pokemon) => pokemon.pokemon);
      }

      const response: PokemonList = await fetch(
        `${process.env.NEXT_PUBLIC_POKEMON_API}/pokemon?limit=100000&offset=0`,
      ).then((data) => data.json());

      return response.results;
    },
    cacheTime: Infinity,
  });

  //side effect for infinite scrolling
  useEffect(() => {
    if (lastElement?.isIntersecting) setPage((prev) => prev + 1);
  }, [lastElement]);

  //side effect for data change
  useEffect(() => {
    if (data?.length) {
      if (filterType.length === 1 || filterType.length === 0) {
        //for empty filter or new filter
        dispatchPokemonList({ type: 'insert', payload: data });
      } else {
        //adding new filter
        dispatchPokemonList({ type: 'upsert', payload: data });
      }
    } else if (data?.length === 0 && filterType.length === 1) {
      //if type exist but not the data
      dispatchPokemonList({ type: 'reset', payload: [] });
    }

    refetch();
  }, [data, filterType, refetch]);

  //state guard
  if (isLoading) return <SkeletonHomePage />;
  if (isError) return <ErrorState />;

  return (
    <main className="relative flex flex-1 flex-col">
      <ComboboxType
        className="mt-6"
        value={filterType}
        handleChange={setFilterType}
      />
      {pokemonList.length === 0 ? (
        <EmptyState
          title="No Pokemon Found!"
          description="Oops, there is no sight of the pokemon nearby, reset the filter to see them."
          action={
            <Button onClick={() => setFilterType([])}>
              <RotateCcw className="mr-2 h-4 w-4" /> Reset Filter
            </Button>
          }
        />
      ) : (
        <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pokemonList.slice(0, DATA_PER_FETCH * page).map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemonUrl={pokemon.url} />
          ))}
        </section>
      )}

      {/* infinite scroll trigger */}
      <div
        ref={lastElementRef}
        className="absolute bottom-96 h-1 w-1 opacity-0"
      ></div>
    </main>
  );
}
