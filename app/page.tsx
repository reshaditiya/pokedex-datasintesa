'use client';

import { ComboboxType } from '@/components/combobox-type';
import PokemonCard from '@/components/pokemon-card';
import { PokemonData, PokemonList } from '@/types/pokeapiDB.type';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const DATA_PER_FETCH = 12;

function useGetPokemons({
  page,
  setData,
}: {
  page: number;
  setData: Function;
}) {
  // get list of pokemon
  const {
    data: getPokemonList,
    refetch: refetchPokemonList,
    isLoading: isLoadingPokemonList,
  } = useQuery<PokemonList>(
    ['pokemonList'],
    () =>
      fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${DATA_PER_FETCH}&offset=${
          (page - 1) * DATA_PER_FETCH
        }`,
      ).then((data) => data.json()),
    { enabled: false },
  );

  //get next pokemon when page change
  useEffect(() => {
    refetchPokemonList();
  }, [page, refetchPokemonList]);

  const pokemonList = getPokemonList?.results || [];
  //fetch all sub data from pokemon list
  const pokemonDatas = useQueries({
    queries: pokemonList.map((pokemon) => {
      return {
        queryKey: ['pokemons', pokemon.name],
        queryFn: () => fetch(pokemon.url).then((data) => data.json()),
        staleTime: Infinity,
        onSuccess: (data: PokemonData) => {
          setData(data);
        },
      };
    }),
  });
  //loading state on last sub data or pokemmon list
  const isLoading =
    pokemonDatas.every((val) => val === undefined) ?? isLoadingPokemonList;

  return {
    isLoading: isLoading,
  };
}

export default function Home() {
  const [page, setPage] = useState(1);
  const [pokemonDatas, setPokemonDatas] = useState<Array<PokemonData>>([]);
  const { isLoading } = useGetPokemons({
    page: page,
    setData: (data: any) => {
      setPokemonDatas((prev) => [...prev, data]);
    },
  });

  return (
    <main>
      <ComboboxType className="mt-6" />
      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? 'Loading...'
          : pokemonDatas.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                types={pokemon.types.map((type: any) => type.type.name)}
                image={pokemon.sprites.other['official-artwork'].front_default!}
                id={pokemon.id}
              />
            ))}
      </section>
    </main>
  );
}
