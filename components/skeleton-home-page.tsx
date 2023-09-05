import SkeletonPokemonCard from './skeleton-pokemon-card';
import { Skeleton } from './ui/skeleton';

export default function SkeletonHomePage() {
  return (
    <main className="relative">
      <Skeleton className="mt-6 h-10 w-full max-w-[16rem]" />
      <section className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array(12)
          .fill(undefined)
          .map((_, i) => (
            <SkeletonPokemonCard key={i} />
          ))}
      </section>
    </main>
  );
}
