'use client';

import { ComboboxType } from '@/components/combobox-type';
import PokemonCard from '@/components/pokemon-card';
import { PokemonData, PokemonList } from '@/types/pokeapiDB.type';
import { useQueries, useQuery } from '@tanstack/react-query';

function useGetPokemons() {
  //get list of pokemon
  const getPokemonList = useQuery<PokemonList>(['pokemonList'], () =>
    fetch('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0').then((data) =>
      data.json(),
    ),
  );
  const pokemonList = getPokemonList.data?.results || [];
  //fetch all sub data from pokemon list
  const pokemonDatas = useQueries({
    queries: pokemonList.map((pokemon) => {
      return {
        queryKey: ['pokemons', pokemon.name],
        queryFn: () => fetch(pokemon.url).then((data) => data.json()),
        staleTime: Infinity,
      };
    }),
  });
  //loading state on last sub data or pokemmon list
  const isLoading =
    pokemonDatas[pokemonDatas.length - 1]?.isLoading ??
    getPokemonList.isLoading;

  return {
    data: [...pokemonDatas.map((pokemon) => pokemon.data)],
    isLoading: isLoading,
  };
}

export default function Home() {
  const pokemonDatas = useGetPokemons();

  console.log(pokemonDatas);

  return (
    <main>
      <ComboboxType className="mt-6" />
      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonDatas.isLoading
          ? 'Loading...'
          : pokemonDatas.data.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                types={pokemon.types.map((type: any) => type.type.name)}
                image={pokemon.sprites.other['official-artwork'].front_default}
                id={pokemon.id}
              />
            ))}
      </section>
    </main>
  );
}
