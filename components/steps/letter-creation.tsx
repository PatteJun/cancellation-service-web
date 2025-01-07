"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Provider } from "@/lib/supabase/providers";
import { FormFields } from "./letter-creation/form-fields";

interface LetterCreationProps {
  company: Provider;
}

export default function LetterCreation({ company }: LetterCreationProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    // Check default required fields
    if (!formData.fullName || !formData.address) return false;

    // Check provider-specific required fields
    const requiredFields = company.required_information?.fields || [];
    return requiredFields.every(field => 
      !field.required || (formData[field.name] && formData[field.name].trim() !== '')
    );
  };

  const generatePreview = () => {
    const fullAddress = [
      company.street,
      company.address_line_2,
      company.city,
      company.state,
      company.postal_code,
      company.country
    ].filter(Boolean).join(", ");

    // Generate account details section with all provided fields
    const accountDetails = [
      `- Full Name: ${formData.fullName}`,
      ...Object.entries(formData)
        .filter(([key]) => key !== 'fullName' && key !== 'address')
        .map(([key, value]) => 
          `- ${key.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}: ${value}`
        )
    ].join('\n');

    return `
${formData.fullName}
${formData.address}

${new Date().toLocaleDateString()}

${company.name}
${fullAddress}

Dear Sir/Madam,

Re: Cancellation of Subscription

I am writing to formally request the cancellation of my subscription with ${company.name}. Please process this cancellation according to the terms of our agreement.

Account Details:
${accountDetails}

Please confirm receipt of this cancellation request and provide any necessary instructions for returning equipment or settling final payments.

Thank you for your attention to this matter.

Yours faithfully,
${formData.fullName}
    `.trim();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatePreview()], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${company.name.toLowerCase()}-cancellation-letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Create Your Cancellation Letter</h2>
          <FormFields 
            provider={company}
            formData={formData}
            onChange={handleInputChange}
          />
        </div>
      </Card>

      {(showPreview || isFormValid()) && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Preview</h3>
              <Button onClick={handleDownload} disabled={!isFormValid()}>
                <Download className="mr-2 h-4 w-4" />
                Download Letter
              </Button>
            </div>
            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">
              {generatePreview()}
            </div>
          </div>
        </Card>
      )}

      {!showPreview && (
        <Button
          onClick={() => setShowPreview(true)}
          variant="outline"
          className="w-full"
        >
          Show Preview
        </Button>
      )}
    </div>
  );
}