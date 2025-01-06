"use client";

import { Provider } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CancellationSteps } from "./provider-details/cancellation-steps";
import { RequiredInformation } from "./provider-details/required-information";

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

      <CancellationSteps steps={company.cancellation_steps} />
      
      <RequiredInformation fields={company.required_information.fields} />

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {company.faqs.map((faq, index) => (
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