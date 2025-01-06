"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { mockProviders, mockCategories, Provider } from "@/lib/mock-data";
import { CategoryFilter } from "./provider-search/category-filter";
import { ProviderItem } from "./provider-search/provider-item";

interface CompanySearchProps {
  onSelectCompany: (provider: Provider) => void;
}

export default function CompanySearch({ onSelectCompany }: CompanySearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProviders = mockProviders.filter((provider) => {
    const matchesSearch = provider.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    if (!selectedCategory) return matchesSearch;
    
    // In the mock data we don't have the provider-category relationships yet
    // This will be replaced with proper filtering when we implement Supabase
    return matchesSearch;
  });

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Search for a Provider</h2>
          <p className="text-muted-foreground">
            Enter the provider name you want to cancel your subscription with
          </p>
        </div>

        <CategoryFilter
          categories={mockCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search providers..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No providers found.</CommandEmpty>
            <CommandGroup heading="Providers">
              {filteredProviders.map((provider) => (
                <ProviderItem
                  key={provider.id}
                  provider={provider}
                  onSelect={onSelectCompany}
                />
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </Card>
  );
}