"use client";

import { Search } from "lucide-react";
import { CommandItem } from "@/components/ui/command";
import type { Provider } from "@/lib/supabase/providers";
import * as Icons from "lucide-react";

interface ProviderItemProps {
  provider: Provider;
  onSelect: (provider: Provider) => void;
}

export function ProviderItem({ provider, onSelect }: ProviderItemProps) {
  // Get the first category's icon_name, fallback to 'search'
  const iconName = provider.categories?.[0]?.icon_name || 'search';
  
  // Get the icon component from lucide-react
  // @ts-ignore - We know these icons exist in the library
  const Icon = Icons[iconName.charAt(0).toUpperCase() + iconName.slice(1)] || Search;

  return (
    <CommandItem
      key={provider.id}
      value={provider.name || ''}
      onSelect={() => onSelect(provider)}
      className="cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="bg-muted p-2 rounded-full">
          <Icon className="h-4 w-4" />
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