"use client";

import type { Provider } from "@/lib/supabase/providers";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CancellationSteps } from "./provider-details/cancellation-steps";
import { RequiredInformation } from "./provider-details/required-information";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface CompanyDetailsProps {
  company: Provider;
  onNext: () => void;
}

export default function CompanyDetails({ company, onNext }: CompanyDetailsProps) {
  const fullAddress = [
    company.street,
    company.address_line_2,
    company.city,
    company.state,
    company.postal_code,
    company.country
  ].filter(Boolean).join(", ");

  const faqs = company.faqs as Array<{ question: string; answer: string }> || [];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
          <CardDescription>Company Information & Cancellation Rules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Company Address</h3>
              <p className="text-muted-foreground">{fullAddress}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <CancellationSteps steps={company.cancellation_steps || []} />
      
      <RequiredInformation fields={(company.required_information as { fields: Array<{ name: string; description: string; required: boolean }> })?.fields || []} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}