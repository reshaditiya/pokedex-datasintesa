'use client';

import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function BackButton({}) {
  const router = useRouter();

  return (
    <Button variant="secondary" className="mt-6" onClick={() => router.back()}>
      <ChevronLeft className="mr-2 h-4 w-4" />
      Go Back
    </Button>
  );
}
