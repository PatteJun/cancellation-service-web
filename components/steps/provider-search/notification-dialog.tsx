"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase/client";

interface NotificationDialogProps {
  searchQuery: string;
}

export function NotificationDialog({ searchQuery }: NotificationDialogProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const { data } = await supabase
        .from("missing_providers")
        .select("id, notify_emails")
        .eq("search_query", searchQuery)
        .single();

      if (data) {
        const emails = data.notify_emails || [];
        if (!emails.includes(email)) {
          await supabase
            .from("missing_providers")
            .update({ notify_emails: [...emails, email] })
            .eq("id", data.id);
        }
      }

      setIsSuccess(true);
    } catch (err) {
      setError("Failed to submit request. Please try again.");
      console.error("Error submitting notification request:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          Request to Add Provider
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get notified when available</DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <div className="text-center py-4">
            <p className="text-green-600 dark:text-green-400 mb-2">
              Thank you for your interest!
            </p>
            <p className="text-sm text-muted-foreground">
              We'll notify you when this provider becomes available.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}