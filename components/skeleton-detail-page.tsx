import { AspectRatio } from '@/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SkeletonPokemonCard from './skeleton-pokemon-card';

export default function SkeletonDetailPage() {
  return (
    <main>
      <Skeleton className="mt-6 h-10 w-32" />

      <section className="mt-6 flex flex-col items-start gap-6 md:flex-row">
        <Card className="w-full flex-1">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl font-semibold">
              <Skeleton className="inline-block h-8 w-44" />
              <Skeleton className="ml-2 inline-block h-6 w-full max-w-[2.5rem]" />
            </CardTitle>
            <div className="flex gap-2">
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
          <CardFooter className="flex justify-end">
            <Skeleton className="h-10 w-10" />
          </CardFooter>
        </Card>

        <div className="flex flex-1 flex-col gap-4">
          <div className="max-w-lg">
            <Skeleton className="h-6 w-32" />
            <div className="mt-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="mt-1 h-5 w-3/5" />
            </div>
          </div>

          <div>
            <Skeleton className="h-6 w-20" />
            <ul className="mt-2 w-full max-w-[8rem]">
              <li className="flex justify-between">
                <Skeleton className="mt-1 inline-block h-5 w-16" />
                <Skeleton className="mt-1 inline-block h-5 w-5" />
              </li>
              <li className="flex justify-between">
                <Skeleton className="mt-1 inline-block h-5 w-16" />
                <Skeleton className="mt-1 inline-block h-5 w-10" />
              </li>
            </ul>
          </div>

          <div className="max-w-lg">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="mt-2 inline-block h-5 w-48" />
          </div>

          <div className="max-w-lg">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="ml-12 mt-4 h-44 w-44 rounded-full" />
          </div>

          <div className="max-w-lg">
            <Skeleton className="h-6 w-20" />
            <div className="mt-1 flex gap-2">
              <Skeleton className="h-44 w-44" />
              <Skeleton className="h-44 w-44" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
