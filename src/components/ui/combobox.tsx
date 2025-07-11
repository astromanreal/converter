
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { Unit } from '@/lib/units';
import { countryCodeToFlag } from '@/lib/units';

interface ComboboxProps {
  units: Unit[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyPlaceholder?: string;
}

export function Combobox({
  units,
  value,
  onChange,
  placeholder = "Select unit...",
  searchPlaceholder = "Search unit...",
  emptyPlaceholder = "No unit found.",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const selectedUnit = units.find((unit) => unit.value.toLowerCase() === value.toLowerCase());

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-10"
        >
          {selectedUnit ? (
            <span className="flex items-center truncate">
              {selectedUnit.countryCode && <span className="mr-2 text-lg">{countryCodeToFlag(selectedUnit.countryCode)}</span>}
              <span className="truncate">{selectedUnit.label}</span>
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {units.map((unit) => (
                <CommandItem
                  key={unit.value}
                  value={unit.label} // Search by label
                  onSelect={(currentValue) => {
                    const selected = units.find(u => u.label.toLowerCase() === currentValue.toLowerCase());
                    if (selected) {
                      onChange(selected.value)
                    }
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === unit.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {unit.countryCode && <span className="mr-2 text-lg">{countryCodeToFlag(unit.countryCode)}</span>}
                  {unit.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
