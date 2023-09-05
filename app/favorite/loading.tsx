import SkeletonPokemonCard from '@/components/skeleton-pokemon-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function loading() {
  return (
    <main className="relative">
      <Skeleton className="mt-6 h-10 w-40" />
      <Skeleton className="mt-6 h-10 w-32" />
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
