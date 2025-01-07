"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Provider } from "@/lib/supabase/providers";

interface FormFieldsProps {
  provider: Provider;
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormFields({ provider, formData, onChange }: FormFieldsProps) {
  const requiredFields = provider.required_information?.fields || [];

  return (
    <div className="space-y-4">
      {/* Default fields */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Full Name *</Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName || ''}
          onChange={onChange}
          placeholder="John Doe"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Your Address *</Label>
        <Input
          id="address"
          name="address"
          value={formData.address || ''}
          onChange={onChange}
          placeholder="123 Main St, City, Country"
          required
        />
      </div>

      {/* Dynamic provider-specific fields */}
      {requiredFields.map((field) => (
        <div key={field.name} className="space-y-2">
          <Label htmlFor={field.name}>
            {field.name.split('_').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
            {field.required && " *"}
          </Label>
          <Input
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={onChange}
            placeholder={field.description}
            required={field.required}
          />
          <p className="text-sm text-muted-foreground">{field.description}</p>
        </div>
      ))}
    </div>
  );
}