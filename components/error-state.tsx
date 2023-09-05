import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function ErrorState() {
  const router = useRouter();

  return (
    <div className="my-auto flex w-full flex-1 flex-col items-center justify-center">
      <AlertTriangle className="h-12 w-12 text-red-800" />
      <h1 className="mt-6 max-w-lg scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        Something wrong happened!
      </h1>
      <p className="mt-1 max-w-lg text-center">
        Some unexpected thing just happend, try to refresh the page or go back
        to home page.
      </p>
      <div className="mt-6">
        <Button variant="secondary">Back Home</Button>
        <Button onClick={() => router.refresh()} className="ml-4">
          <RefreshCcw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
    </div>
  );
}
