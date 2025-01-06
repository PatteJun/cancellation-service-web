"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { mockCompanies } from "@/lib/mock-data";

interface CompanySearchProps {
  onSelectCompany: (company: Company) => void;
}

export default function CompanySearch({ onSelectCompany }: CompanySearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = mockCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Search for a Company</h2>
          <p className="text-muted-foreground">
            Enter the company name you want to cancel your subscription with
          </p>
        </div>

        <Command className="rounded-lg border shadow-md">
          <CommandInput
            placeholder="Search companies..."
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup heading="Companies">
              {filteredCompanies.map((company) => (
                <CommandItem
                  key={company.id}
                  value={company.name}
                  onSelect={() => onSelectCompany(company)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-muted p-2 rounded-full">
                      <Search className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{company.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {company.industry}
                      </p>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </Card>
  );
}