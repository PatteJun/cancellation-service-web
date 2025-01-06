"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface LetterCreationProps {
  company: Company;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export default function LetterCreation({
  company,
  formData,
  setFormData,
}: LetterCreationProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generatePreview = () => {
    return `
${formData.fullName}
${formData.address}

${new Date().toLocaleDateString()}

${company.name}
${company.address}

Dear Sir/Madam,

Re: Cancellation of Subscription (ID: ${formData.subscriptionId})

I am writing to formally request the cancellation of my subscription with ${
      company.name
    }. Please process this cancellation according to the terms of our agreement.

Account Details:
- Full Name: ${formData.fullName}
- Subscription ID: ${formData.subscriptionId}

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
    element.download = "cancellation-letter.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Create Your Cancellation Letter</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Your Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main St, City, Country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subscriptionId">Subscription ID</Label>
              <Input
                id="subscriptionId"
                name="subscriptionId"
                value={formData.subscriptionId}
                onChange={handleInputChange}
                placeholder="e.g., ACC123456"
              />
            </div>
          </div>
        </div>
      </Card>

      {(showPreview || Object.values(formData).every(Boolean)) && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Preview</h3>
              <Button onClick={handleDownload}>
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