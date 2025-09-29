
'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams, useRouter } from 'next/navigation';
import { MOCK_JOBS } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, UserCheck, Check } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Textarea } from '@/components/ui/textarea';

const step1Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
});

const step2Schema = z.object({
  cv: z.any().refine((files) => files?.length === 1, 'CV is required.'),
  coverLetter: z.string().optional(),
});

const formSchema = step1Schema.merge(step2Schema);

const steps = [
  { id: 'Step 1', name: 'Personal Information', fields: ['name', 'email'] },
  { id: 'Step 2', name: 'Resume & Cover Letter', fields: ['cv', 'coverLetter'] },
  { id: 'Step 3', name: 'Review & Submit' }
];

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const job = MOCK_JOBS.find((j) => j.id === params.id);

  const [currentStep, setCurrentStep] = useState(0);

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(currentStep === 0 ? step1Schema : step2Schema),
    defaultValues: {
      name: user?.role === 'seeker' ? user.name : '',
      email: user?.role === 'seeker' ? user.email : '',
      coverLetter: '',
    },
  });

  const { handleSubmit, trigger, register, watch } = methods;
  const cvRef = register("cv");
  const formValues = watch();

  const handleNext = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as any, { shouldFocus: true });
    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast({
      title: 'Application Submitted!',
      description: `Your application for ${job?.title} has been successfully submitted.`,
      variant: 'default',
      className: 'bg-green-500 text-white',
    });
    router.push('/jobs');
  };
  
  const applyWithProfile = () => {
      // In a real app, this would be more complex, fetching full profile data
      if (user && user.role === 'seeker') {
        methods.reset({ name: user.name, email: user.email, coverLetter: '' });
        toast({ title: 'Profile data loaded!' });
        setCurrentStep(1); // Move to next step assuming CV is what's needed
      }
  }

  if (!job) {
    return (
      <div className="container mx-auto max-w-2xl text-center py-20">
        <h1 className="text-2xl font-bold">Job not found</h1>
        <p className="text-muted-foreground mt-2">The job you are looking for does not exist.</p>
        <Button asChild className="mt-6">
          <Link href="/jobs">Back to Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary py-12 md:py-20">
      <div className="container mx-auto max-w-2xl px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/jobs/${job.id}`}><ArrowLeft className="mr-2 h-4 w-4" /> Back to Job Details</Link>
        </Button>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Apply for {job.title}</CardTitle>
            <CardDescription>at {job.company}</CardDescription>
          </CardHeader>
          <CardContent>
            <nav aria-label="Progress">
              <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0 mb-8">
                {steps.map((step, index) => (
                  <li key={step.name} className="md:flex-1">
                    {currentStep > index ? (
                       <div className="group flex w-full flex-col border-l-4 border-primary py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                        <span className="text-sm font-medium text-primary transition-colors">{step.id}</span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    ) : currentStep === index ? (
                      <div className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4" aria-current="step">
                        <span className="text-sm font-medium text-primary">{step.id}</span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    ) : (
                      <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                        <span className="text-sm font-medium text-gray-500 transition-colors">{step.id}</span>
                        <span className="text-sm font-medium">{step.name}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            
            {user && user.role === 'seeker' && currentStep === 0 && (
                <div className="mb-6 text-center border-t pt-6">
                    <p className="text-muted-foreground mb-4">You are logged in. Want to apply with your profile?</p>
                    <Button onClick={applyWithProfile}><UserCheck className="mr-2 h-4 w-4" /> Apply with Profile</Button>
                </div>
            )}

            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <FormField name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl><Input type="email" placeholder="john.doe@example.com" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <FormField name="cv" render={() => (
                      <FormItem>
                        <FormLabel>Upload CV</FormLabel>
                        <FormControl><Input type="file" {...cvRef} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField name="coverLetter" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter (Optional)</FormLabel>
                        <FormControl><Textarea placeholder="Why are you a great fit for this role?" className="min-h-[150px]" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Review your Application</h3>
                        <div className="p-4 border rounded-lg bg-secondary/50 space-y-4">
                           <div>
                                <h4 className="font-semibold">Personal Information</h4>
                                <p><strong>Name:</strong> {formValues.name}</p>
                                <p><strong>Email:</strong> {formValues.email}</p>
                           </div>
                           <div>
                                <h4 className="font-semibold">Resume</h4>
                                <p>{formValues.cv?.[0]?.name || 'Not provided'}</p>
                           </div>
                           {formValues.coverLetter && (
                               <div>
                                    <h4 className="font-semibold">Cover Letter</h4>
                                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">{formValues.coverLetter}</p>
                               </div>
                           )}
                        </div>
                    </div>
                )}

                <div className="mt-8 flex justify-between">
                  <Button type="button" onClick={handlePrev} variant="ghost" disabled={currentStep === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  {currentStep < steps.length - 1 ? (
                    <Button type="button" onClick={handleNext}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" size="lg">
                      Submit Application <Check className="ml-2 h-5 w-5" />
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
