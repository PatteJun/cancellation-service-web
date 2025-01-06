"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

interface CompanyDetailsProps {
  company: Company;
  onNext: () => void;
}

export default function CompanyDetails({ company, onNext }: CompanyDetailsProps) {
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
              <p className="text-muted-foreground">
                {company.address}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Contact Information</h3>
              <p className="text-muted-foreground">
                {company.email}<br />
                {company.phone}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cancellation Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium">Notice Period</p>
                <p className="text-sm text-muted-foreground">
                  {company.cancellationRules.noticePeriod}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium">Required Information</p>
                <p className="text-sm text-muted-foreground">
                  {company.cancellationRules.requiredInfo}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium">Confirmation Process</p>
                <p className="text-sm text-muted-foreground">
                  {company.cancellationRules.confirmationProcess}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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