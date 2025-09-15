
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 bg-secondary/50">
      <Card className="mx-auto max-w-md w-full shadow-lg">
        <CardHeader className="space-y-1 text-center">
           <div className="flex justify-center mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>Join WorkWise to find your next opportunity or hire top talent.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
             <div className="space-y-3">
              <Label>I am a...</Label>
              <RadioGroup defaultValue="seeker" className="grid grid-cols-2 gap-4">
                <div>
                  <RadioGroupItem value="seeker" id="seeker" className="peer sr-only" />
                  <Label htmlFor="seeker" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Job Seeker
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="hirer" id="hirer" className="peer sr-only" />
                  <Label htmlFor="hirer" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
