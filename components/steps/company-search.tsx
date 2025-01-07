"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { CategoryFilter } from "./provider-search/category-filter";
import { ProviderItem } from "./provider-search/provider-item";
import { NotificationDialog } from "./provider-search/notification-dialog";
import { getProviders, getCategories } from "@/lib/supabase/providers";
import type { Provider } from "@/lib/supabase/providers";
import type { Database } from "@/lib/supabase/types";
import { AlertCircle } from "lucide-react";

type Category = Database["public"]["Tables"]["categories"]["Row"];

interface CompanySearchProps {
  onSelectCompany: (provider: Provider) => void;
}

export default function CompanySearch({ onSelectCompany }: CompanySearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const [providersData, categoriesData] = await Promise.all([
          getProviders(),
          getCategories()
        ]);
        setProviders(providersData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load providers and categories");
        console.error("Error loading initial data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const loadProviders = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getProviders(searchQuery);
        setProviders(data);
      } catch (err) {
        setError("Failed to search providers");
        console.error("Error searching providers:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(loadProviders, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const filteredProviders = selectedCategory
    ? providers.filter(provider => 
        provider.categories?.some(category => category.id === selectedCategory)
      )
    : providers;

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
          categories={categories}
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
            <CommandEmpty>
              {isLoading ? (
                "Loading..."
              ) : error ? (
                <span className="text-destructive">{error}</span>
              ) : searchQuery ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">Provider not found</p>
                  <p className="text-sm text-muted-foreground max-w-[15rem] mb-4">
                    We're adding new providers regularly. Thank you for your patience.
                  </p>
                  <NotificationDialog searchQuery={searchQuery} />
                </div>
              ) : (
                "Start typing to search providers..."
              )}
            </CommandEmpty>
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