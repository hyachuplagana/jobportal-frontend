
'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Briefcase, MailCheck, PartyPopper } from "lucide-react";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleFirstStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form submission and send an email here.
    // For now, we'll just move to the next step.
    const form = e.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    setEmail(emailInput.value);
    setStep(2);
  };
  
  const handleVerificationSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // In a real app, you'd verify the code.
      setStep(3);
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 bg-secondary/50">
      <Card className="mx-auto max-w-md w-full shadow-lg">
        {step === 1 && (
          <>
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
              <CardDescription>
                Enter your information to get started on your career journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFirstStepSubmit} className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" placeholder="John" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" placeholder="Doe" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-3">
                  <Label>I am a...</Label>
                  <RadioGroup
                    defaultValue="seeker"
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="seeker"
                        id="seeker"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="seeker"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Job Seeker
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="hirer"
                        id="hirer"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="hirer"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        Recruiter
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="underline text-primary">
                    Sign in
                    </Link>
                </div>
              </form>
            </CardContent>
          </>
        )}

        {step === 2 && (
             <form onSubmit={handleVerificationSubmit}>
                <CardHeader className="space-y-2 text-center">
                    <div className="flex justify-center mb-4">
                        <MailCheck className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                    <CardDescription>
                        We've sent a 6-digit code to <span className="font-semibold text-foreground">{email}</span>. Please enter it below to verify your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid gap-2">
                        <Label htmlFor="code">Verification Code</Label>
                        <Input id="code" placeholder="123456" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Verify Account
                    </Button>
                     <div className="text-center text-sm">
                        Didn't receive a code?{" "}
                        <Button variant="link" type="button" className="p-0 h-auto text-primary">
                            Resend
                        </Button>
                    </div>
                </CardContent>
            </form>
        )}

        {step === 3 && (
            <CardContent className="flex flex-col items-center justify-center text-center p-8">
                 <div className="flex justify-center mb-4">
                    <PartyPopper className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-2xl font-bold mb-2">Account Created!</CardTitle>
                <CardDescription className="mb-6 max-w-xs">
                    Your account has been successfully created. You can now log in to find your dream job.
                </CardDescription>
                <Button asChild className="w-full">
                    <Link href="/login">Proceed to Login</Link>
                </Button>
            </CardContent>
        )}
      </Card>
    </div>
  );
}
