'use client';

import { FavoriteButton } from '@/components/favorite-button';
import { PokemonCard } from '@/components/pokemon-card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { capitalizeFirstChar } from '@/lib/utils';
import {
  PokemonData,
  PokemonList,
  PokemonSpecies,
} from '@/types/pokeapiDB.type';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

export async function generateStaticParams() {
  const pokemons: PokemonList = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0',
  ).then((res) => res.json());

  return pokemons.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

export default function Page({ params }: { params: { id: string | number } }) {
  const {
    isLoading: isLoadingPokemonData,
    error: errorPokemonData,
    data: pokemonData,
  } = useQuery<PokemonData>({
    queryKey: ['pokemonDetail'],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_POKEMON_API}/pokemon/${params.id}`).then(
        (res) => res.json(),
      ),
    cacheTime: Infinity,
  });

  const {
    isLoading: isLoadingPokemonSpecies,
    error: errorPokemonSpecies,
    data: pokemonSpecies,
  } = useQuery<PokemonSpecies>({
    queryKey: ['pokemonSpecies'],
    queryFn: () =>
      fetch(pokemonData?.species.url!, {}).then((res) => res.json()),
    cacheTime: Infinity,
    enabled: !!pokemonData?.species.url,
  });

  if (!pokemonData || !pokemonSpecies) return 'Loading';

  const chartData = [
    {
      subject: 'HP',
      val: pokemonData.stats[0].base_stat,
      fullMark: 100,
    },
    {
      subject: 'ATK',
      val: pokemonData.stats[1].base_stat,
      fullMark: 100,
    },
    {
      subject: 'DFS',
      val: pokemonData.stats[2].base_stat,
      fullMark: 100,
    },
    {
      subject: 'ATK+',
      val: pokemonData.stats[3].base_stat,
      fullMark: 100,
    },
    {
      subject: 'DFS+',
      val: pokemonData.stats[4].base_stat,
      fullMark: 100,
    },
    {
      subject: 'SPD',
      val: pokemonData.stats[5].base_stat,
      fullMark: 100,
    },
  ];

  return (
    <main>
      <Button variant="secondary" className="mt-6" asChild>
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back Home
        </Link>
      </Button>

      <section className="mt-6 flex flex-col items-start gap-6 md:flex-row">
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              {capitalizeFirstChar(pokemonData.name)}
              <span className="ml-2 text-base font-medium">
                #{pokemonData.id}
              </span>
            </CardTitle>
            <div className="flex gap-2">
              {pokemonData.types.map((type) => (
                <Badge variant="outline" key={type.type.name}>
                  {capitalizeFirstChar(type.type.name)}
                </Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={1 / 1}>
              <Image
                src={
                  pokemonData.sprites.other['official-artwork'].front_default!
                }
                fill
                alt={pokemonData.name}
                className="object-cover"
              />
            </AspectRatio>
          </CardContent>
          <CardFooter className="flex justify-end">
            <FavoriteButton
              pokemonUrl={`https://pokeapi.co/api/v2/pokemon/${pokemonData.name}`}
              pokemon={pokemonData}
            />
          </CardFooter>
        </Card>

        <div className="flex flex-1 flex-col gap-4">
          <div className="max-w-lg">
            <h3 className="font-semibold">Description</h3>
            <p className="mt-1">
              {
                pokemonSpecies.flavor_text_entries.find(
                  (favlorText) => favlorText.language.name === 'en',
                )?.flavor_text
              }
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Basic</h3>
            <ul className="mt-1 w-full max-w-[8rem]">
              <li className="flex justify-between">
                Height: <span>{pokemonData.height}</span>
              </li>
              <li className="flex justify-between">
                Weight: <span>{pokemonData.weight}</span>
              </li>
            </ul>
          </div>

          <div className="max-w-lg">
            <h3 className="font-semibold">Abilities</h3>
            <p className="mt-1">
              {pokemonData.abilities.map(
                (ability, i) =>
                  capitalizeFirstChar(ability.ability.name) +
                  (i < pokemonData.abilities.length - 1 ? ', ' : ''),
              )}
            </p>
          </div>

          <div className="max-w-lg">
            <h3 className="font-semibold">Stats</h3>
            <div className="mt-1">
              <RadarChart
                width={280}
                height={200}
                data={chartData}
                className="text-sm"
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name={pokemonData.name}
                  dataKey="val"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Varieties</h3>
            <div className="mt-1 grid grid-cols-2 gap-3">
              {pokemonSpecies.varieties.length > 1
                ? pokemonSpecies.varieties
                    .filter(
                      (variety) => variety.pokemon.name !== pokemonData.name,
                    )
                    .map((variety) => (
                      <PokemonCard
                        pokemonUrl={variety.pokemon.url}
                        key={variety.pokemon.name}
                      />
                    ))
                : 'No varieties'}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
