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
import { BookOpen, Star } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from './ui/aspect-ratio';

export default function PokemonCard({
  name,
  id,
  types,
  image,
}: {
  name: string;
  id: string;
  types: string[];
  image: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {name}
          <span className="ml-2 text-sm font-medium">#{id}</span>
        </CardTitle>
        <div className="mt-2 flex gap-2">
          {types.map((type) => (
            <Badge variant="outline" key={type}>
              {capitalizeFirstChar(type)}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={1 / 1}>
          <Image src={image} fill alt={name} className="object-cover" />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary">
          <BookOpen className="mr-2 h-4 w-4" />
          See Detail
        </Button>
        <Button size="icon" variant="secondary" className="text-yellow-800">
          <Star className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
