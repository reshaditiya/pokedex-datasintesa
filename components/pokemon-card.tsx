import { FavoriteButton } from './favorite-button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { capitalizeFirstChar } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';
import { Ref, forwardRef } from 'react';
import { PokemonData } from '@/types/pokeapiDB.type';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

export const PokemonCard = forwardRef(function PokemonCard(
  {
    pokemonUrl,
  }: {
    pokemonUrl: string;
  },
  ref: Ref<HTMLDivElement>,
) {
  const {
    data: pokemonData,
    isLoading: isLoadingPokemonData,
    isError: isErrorPokemonData,
  } = useQuery<PokemonData>(['pokemonData', pokemonUrl], () =>
    fetch(pokemonUrl).then((data) => data.json()),
  );

  if (isLoadingPokemonData) return 'Loading...';
  if (isErrorPokemonData) return 'Error';

  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {capitalizeFirstChar(pokemonData.name)}
          <span className="ml-2 text-sm font-medium">#{pokemonData.id}</span>
        </CardTitle>
        <div className="mt-2 flex gap-2">
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
            src={pokemonData.sprites.other['official-artwork'].front_default!}
            fill
            alt={pokemonData.name}
            className="object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary" asChild>
          <Link href={pokemonData.name}>
            <BookOpen className="mr-2 h-4 w-4" />
            See Detail
          </Link>
        </Button>
        <FavoriteButton pokemonUrl={pokemonUrl} pokemon={pokemonData} />
      </CardFooter>
    </Card>
  );
});
