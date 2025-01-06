"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Provider, FormData } from "@/lib/mock-data";

interface FormFieldsProps {
  provider: Provider;
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormFields({ provider, formData, onChange }: FormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          placeholder="John Doe"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Your Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={onChange}
          placeholder="123 Main St, City, Country"
        />
      </div>
      {provider.required_information.fields.map((field) => (
        field.name === "subscription_id" && (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.name.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
              {field.required && " *"}
            </Label>
            <Input
              id={field.name}
              name="subscriptionId"
              value={formData.subscriptionId}
              onChange={onChange}
              placeholder={field.description}
            />
          </div>
        )
      ))}
    </div>
  );
}