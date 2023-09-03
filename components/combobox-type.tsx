'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useQuery } from '@tanstack/react-query';
import { capitalizeFirstChar } from '@/lib/utils';

type PokemonTypesDb = {
  count: number;
  next: null;
  previous: null;
  results: { name: string; url: string }[];
};

export function ComboboxType() {
  let pokemonTypes = [
    {
      value: 'allTypes',
      label: 'All types',
    },
  ];

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(pokemonTypes[0].value);
  const data = useQuery<PokemonTypesDb>({
    queryKey: ['PokemonTypes'],
    queryFn: () =>
      fetch('https://pokeapi.co/api/v2/type').then((res) => res.json()),
  });

  if (data.data) {
    pokemonTypes = [
      ...pokemonTypes,
      ...data.data.results.map((type) => ({
        value: type.name,
        label: capitalizeFirstChar(type.name),
      })),
    ];
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? pokemonTypes.find((pokemonTypes) => pokemonTypes.value === value)
                ?.label
            : 'Select Type...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup className="max-h-48 overflow-auto">
            {pokemonTypes.map((pokemonTypes) => (
              <CommandItem
                key={pokemonTypes.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === pokemonTypes.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {pokemonTypes.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
