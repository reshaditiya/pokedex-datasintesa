import { AspectRatio } from './ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function SkeletonPokemonCard() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Skeleton className="inline-block h-6 w-full max-w-[8rem]" />
          <Skeleton className="ml-2 inline-block h-5 w-full max-w-[1.5rem]" />
        </CardTitle>
        <div className="mt-2 flex gap-2">
          <Skeleton className="inline-block h-5 w-full max-w-[4rem] rounded-full" />
          <Skeleton className="inline-block h-5 w-full max-w-[4rem] rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <AspectRatio
          ratio={1 / 1}
          className="flex flex-1 items-center justify-center"
        >
          <Skeleton className="h-3/5 w-3/5 rounded-full" />
        </AspectRatio>
      </CardContent>
      <CardFooter className="mt-auto flex justify-between">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-10" />
      </CardFooter>
    </Card>
  );
}
