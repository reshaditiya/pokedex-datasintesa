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

export const PokemonCard = forwardRef(function PokemonCard(
  {
    pokemon,
  }: {
    pokemon: PokemonData;
  },
  ref: Ref<HTMLDivElement>,
) {
  return (
    <Card ref={ref}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {pokemon.name}
          <span className="ml-2 text-sm font-medium">#{pokemon.id}</span>
        </CardTitle>
        <div className="mt-2 flex gap-2">
          {pokemon.types.map((type) => (
            <Badge variant="outline" key={type.type.name}>
              {capitalizeFirstChar(type.type.name)}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={1 / 1}>
          <Image
            src={pokemon.sprites.other['official-artwork'].front_default!}
            fill
            alt={pokemon.name}
            className="object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary">
          <BookOpen className="mr-2 h-4 w-4" />
          See Detail
        </Button>
        <FavoriteButton pokemon={pokemon} />
      </CardFooter>
    </Card>
  );
});
