import { BackButton } from '@/components/back-button';
import { FavoriteButton } from '@/components/favorite-button';
import { PokemonStats } from '@/components/pokemon-stats';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { removeHyphen } from '@/lib/utils';
import {
  PokemonData,
  PokemonList,
  PokemonSpecies,
} from '@/types/pokeapiDB.type';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const pokemons: PokemonList = await fetch(
    `${process.env.NEXT_PUBLIC_POKEMON_API}/pokemon?limit=100000&offset=0`,
  ).then((res) => res.json());

  return pokemons.results.map((pokemon) => ({
    name: pokemon.name,
  }));
}

export default async function Page({
  params,
}: {
  params: { id: string | number };
}) {
  //fetch data
  const pokemonData: PokemonData = await fetch(
    `${process.env.NEXT_PUBLIC_POKEMON_API}/pokemon/${params.id}`,
  )
    .then((res) => res.json())
    .catch(() => notFound());

  const pokemonSpecies: PokemonSpecies = await fetch(
    `${pokemonData.species.url}`,
  )
    .then((res) => res.json())
    .catch(() => notFound());

  return (
    <main>
      <BackButton />

      <section className="mt-6 flex flex-col items-start gap-6 md:flex-row">
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-semibold capitalize">
              {removeHyphen(pokemonData.name)}
              <span className="ml-2 text-base font-medium text-gray-500">
                #{pokemonData.id}
              </span>
            </CardTitle>
            <div className="flex gap-2">
              {pokemonData.types.map((type) => (
                <Badge
                  variant="outline"
                  key={type.type.name}
                  className="capitalize"
                >
                  {type.type.name}
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
            <p className="mt-1 capitalize">
              {pokemonData.abilities.map(
                (ability, i) =>
                  removeHyphen(ability.ability.name) +
                  (i < pokemonData.abilities.length - 1 ? ', ' : ''),
              )}
            </p>
          </div>

          <div className="max-w-lg">
            <h3 className="font-semibold">Stats</h3>
            <div className="mt-1">
              <PokemonStats pokemonData={pokemonData} />
            </div>
          </div>

          <div className="max-w-lg">
            <h3 className="font-semibold">Sprites</h3>
            <div className="mt-2 flex gap-2">
              {pokemonData.sprites.front_default && (
                <Image
                  src={pokemonData.sprites.front_default}
                  alt="Front Sprite"
                  width={192}
                  height={192}
                />
              )}
              {pokemonData.sprites.back_default && (
                <Image
                  src={pokemonData.sprites.back_default}
                  alt="Back Sprite"
                  width={192}
                  height={192}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
