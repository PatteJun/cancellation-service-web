"use client";

import { useState } from "react";
import CompanySearch from "@/components/steps/company-search";
import CompanyDetails from "@/components/steps/company-details";
import LetterCreation from "@/components/steps/letter-creation";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const steps = ["Search Company", "Review Details", "Create Letter"];

export default function CancellationFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm">
          {steps.map((step, index) => (
            <button
              key={step}
              onClick={() => handleStepClick(index)}
              disabled={index > currentStep}
              className={cn(
                "transition-colors",
                index <= currentStep ? "text-primary" : "text-muted-foreground",
                index < currentStep && "hover:text-primary/80 cursor-pointer",
                index > currentStep && "cursor-not-allowed"
              )}
            >
              {step}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[400px]">
        {currentStep === 0 && (
          <CompanySearch
            onSelectCompany={(company) => {
              setSelectedCompany(company);
              handleNext();
            }}
          />
        )}
        {currentStep === 1 && selectedCompany && (
          <CompanyDetails company={selectedCompany} onNext={handleNext} />
        )}
        {currentStep === 2 && selectedCompany && (
          <LetterCreation company={selectedCompany} />
        )}
      </div>

      <div className="flex justify-between pt-4 border-t">
        {currentStep > 0 && (
          <button
            onClick={() => handleStepClick(currentStep - 1)}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Back
          </button>
        )}
        {currentStep < steps.length - 1 && (
          <button
            onClick={handleNext}
            className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}