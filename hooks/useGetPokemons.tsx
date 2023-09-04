'use client';
import { PokemonData, PokemonList } from '@/types/pokeapiDB.type';
import { useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const DATA_PER_FETCH = 12;
export function useGetPokemons({ page }: { page: number }) {
  const [pokemonDatasState, setPokemonDatasState] = useState<
    Array<PokemonData>
  >([]);

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
  const pokemonList = getPokemonList?.results || [];

  //get next pokemon when page change
  useEffect(() => {
    refetchPokemonList();
  }, [page, refetchPokemonList]);

  //fetch all sub data from pokemon list
  const pokemonDatas = useQueries({
    queries: pokemonList.map((pokemon) => {
      return {
        queryKey: ['pokemons', pokemon.name],
        queryFn: () => fetch(pokemon.url).then((data) => data.json()),
        onSuccess: (data: PokemonData) => {
          setPokemonDatasState((prev) => [...prev, data]);
        },
      };
    }),
  });

  const isLoading =
    pokemonDatas.every((val) => val === undefined) ?? isLoadingPokemonList;

  return {
    pokemonDatas: pokemonDatasState,
    isLoading: isLoading,
  };
}
