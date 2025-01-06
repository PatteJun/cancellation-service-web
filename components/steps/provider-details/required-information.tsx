"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

interface RequiredInformationProps {
  fields: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
}

export function RequiredInformation({ fields }: RequiredInformationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Required Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">
                  {field.name.split('_').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')}
                  {field.required && " *"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {field.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}