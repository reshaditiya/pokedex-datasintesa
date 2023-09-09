'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { CheckSquare, ChevronsUpDown, RotateCcw, Square } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { pokemonTypes } from '@/data/pokemon-types';

const pokemonTypesCombo = pokemonTypes.sort().map((type) => ({
  value: type,
  label: type,
}));

export function ComboboxType({
  className,
  value,
  handleChange,
}: {
  className?: string;
  value: string[];
  handleChange: Dispatch<SetStateAction<string[]>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('flex items-center', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full max-w-[16rem] justify-between"
          >
            <span className="truncate capitalize">
              {value.length
                ? value.map(
                    (val, i) => val + (i < value.length - 1 ? ', ' : ''),
                  )
                : 'Select Type...'}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-[16rem] p-0">
          <Command>
            <CommandInput placeholder="Search type..." />
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup className="max-h-56 overflow-auto">
              {pokemonTypesCombo.map((pokemonType) => (
                <CommandItem
                  key={pokemonType.value}
                  className="py-3 capitalize"
                  onSelect={(currentValue) => {
                    handleChange((prev) =>
                      prev.includes(currentValue)
                        ? prev.filter((val) => val !== currentValue)
                        : [...prev, currentValue],
                    );
                  }}
                >
                  {value.includes(pokemonType.value) ? (
                    <CheckSquare className="mr-2 h-4 w-4" />
                  ) : (
                    <Square className="mr-2 h-4 w-4" />
                  )}
                  {pokemonType.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <Button
          size="icon"
          variant="secondary"
          className="ml-2"
          onClick={() => handleChange([])}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
