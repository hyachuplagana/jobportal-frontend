'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useParams } from 'next/navigation';
import { MOCK_JOBS } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  cv: z.instanceof(FileList).refine((files) => files?.length === 1, 'CV is required.'),
});

export default function ApplyPage() {
  const params = useParams();
  const { toast } = useToast();
  const job = MOCK_JOBS.find((j) => j.id === params.id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  });
  
  const cvRef = form.register("cv");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Application Submitted!',
      description: `Your application for ${job?.title} has been successfully submitted.`,
      variant: 'default',
      className: 'bg-green-500 text-white',
    });
    form.reset();
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
          <Link href="/jobs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs</Link>
        </Button>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">Apply for {job.title}</CardTitle>
            <CardDescription>at {job.company}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload CV</FormLabel>
                      <FormControl>
                         <Input type="file" {...cvRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" size="lg">
                  Submit Application
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
