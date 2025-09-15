
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Briefcase, Building, Search, User, FileText } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
           <div className="grid gap-2 text-center">
             <div className="flex justify-center mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
              </div>
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-balance text-muted-foreground">
              Enter your information to get started
            </p>
          </div>
           <div className="grid gap-4">
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
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
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
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20"></div>
        <div className="relative h-full w-full">
            <div className="absolute top-[10%] left-[15%] w-32 h-32 bg-primary/20 dark:bg-primary/30 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[15%] right-[10%] w-40 h-40 bg-accent/20 dark:bg-accent/30 rounded-xl animate-[float-reverse_10s_ease-in-out_infinite]"></div>
             <Card className="absolute top-[20%] right-[25%] p-3 shadow-xl animate-[float_12s_ease-in-out_infinite_2s]">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-md"><Building className="w-5 h-5 text-primary"/></div>
                    <p className="text-sm font-semibold">Post a Job</p>
                </div>
            </Card>
             <Card className="absolute bottom-[30%] left-[20%] p-3 shadow-xl animate-[float_10s_ease-in-out_infinite_1s]">
                <div className="flex items-center gap-2">
                     <div className="p-2 bg-accent/10 rounded-md"><Search className="w-5 h-5 text-accent"/></div>
                    <p className="text-sm font-semibold">Find Talent</p>
                </div>
            </Card>
             <Card className="absolute top-[50%] left-[5%] p-3 shadow-xl animate-[float_9s_ease-in-out_infinite]">
                <div className="flex items-center gap-2">
                     <div className="p-2 bg-green-500/10 rounded-md"><User className="w-5 h-5 text-green-600"/></div>
                    <p className="text-sm font-semibold">Create Profile</p>
                </div>
            </Card>
             <Card className="absolute bottom-[10%] left-[45%] p-3 shadow-xl animate-[float-reverse_11s_ease-in-out_infinite]">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-500/10 rounded-md"><FileText className="w-5 h-5 text-orange-600"/></div>
                    <p className="text-sm font-semibold">Upload CV</p>
                </div>
            </Card>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <Briefcase className="w-24 h-24 text-primary/50 dark:text-primary/70 mx-auto" />
                <h2 className="text-2xl font-bold mt-4 text-foreground/80">WorkWise</h2>
                <p className="text-muted-foreground mt-2">Your career journey starts here.</p>
            </div>
        </div>
      </div>
    </div>
  );
}
