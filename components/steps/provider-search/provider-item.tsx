"use client";

import { Search } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import type { Provider } from "@/lib/supabase/providers";

interface ProviderItemProps {
  provider: Provider;
  onSelect: (provider: Provider) => void;
}

export function ProviderItem({ provider, onSelect }: ProviderItemProps) {
  return (
    <CommandItem
      key={provider.id}
      value={provider.name || ''}
      onSelect={() => onSelect(provider)}
      className="cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-muted p-2 rounded-full">
          <Search className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium">{provider.name}</p>
          <p className="text-sm text-muted-foreground">
            {[provider.city, provider.state, provider.country]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>
      </div>
    </CommandItem>
  );
}