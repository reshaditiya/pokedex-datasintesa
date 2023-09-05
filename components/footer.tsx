import { Separator } from '@/components/ui/separator';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Footer({}) {
  return (
    <footer className="mt-auto">
      <Separator className="mt-6" />
      <div className="my-6 flex items-center justify-between text-gray-600">
        © 2023 Resha Aditiya{' '}
        <div>
          <Button size="icon" variant="ghost" className="rounded-full" asChild>
            <Link href="https://reshaditiya.com" target="_blank">
              <Globe className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
