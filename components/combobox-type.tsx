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
import { capitalizeFirstChar } from '@/lib/utils';
import { pokemonTypes } from '@/data/pokemon-types';

const pokemonTypesCombo = pokemonTypes.sort().map((type) => ({
  value: type,
  label: capitalizeFirstChar(type),
}));

export function ComboboxType({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? pokemonTypesCombo.find(
                (pokemonType) => pokemonType.value === value,
              )?.label
            : 'Select Type...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type..." />
          <CommandEmpty>No type found.</CommandEmpty>
          <CommandGroup className="max-h-48 overflow-auto">
            {pokemonTypesCombo.map((pokemonType) => (
              <CommandItem
                key={pokemonType.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === pokemonType.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {pokemonType.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
