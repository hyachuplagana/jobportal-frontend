
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MOCK_HIRER_JOBS } from '@/lib/mock-data';
import type { HirerJob } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Trash2, Users, Edit, PlusCircle, ExternalLink } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const jobFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  location: z.string().min(2, 'Location is required.'),
  salary: z.string().min(3, 'Salary is required.'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
});

export default function HirerDashboard() {
  const [jobs, setJobs] = useState<HirerJob[]>(MOCK_HIRER_JOBS);
  const [activeTab, setActiveTab] = useState('posted-jobs');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof jobFormSchema>>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      location: '',
      salary: '',
      type: 'Full-time',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof jobFormSchema>) {
    const newJob: HirerJob = {
      id: (jobs.length + 1).toString(),
      company: 'My Company', // This would come from user data
      postedDate: new Date().toISOString(),
      logoId: 'logo-data-corp', // Default logo
      applicants: 0,
      status: 'Open',
      ...values,
    };
    setJobs([newJob, ...jobs]);
    toast({ title: 'Job Posted!', description: `${values.title} is now live.` });
    form.reset();
    setActiveTab('posted-jobs');
  }

  function deleteJob(jobId: string) {
    setJobs(jobs.filter((job) => job.id !== jobId));
    toast({ title: 'Job Deleted', description: 'The job posting has been removed.', variant: 'destructive' });
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
        <TabsTrigger value="posted-jobs">Posted Jobs</TabsTrigger>
        <TabsTrigger value="post-job">Post a New Job</TabsTrigger>
      </TabsList>
      <TabsContent value="posted-jobs">
        <Card>
          <CardHeader>
            <CardTitle>Your Job Postings</CardTitle>
            <CardDescription>View, edit, or delete your active and past job postings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden md:table-cell">Applicants</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>{job.status}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                         <Link href={`/dashboard/jobs/${job.id}`} className="flex items-center gap-2 text-primary hover:underline">
                          <Users className="h-4 w-4" />
                          {job.applicants}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                           <Button variant="ghost" size="icon" asChild>
                             <Link href={`/jobs/${job.id}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">View Job</span>
                              </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                                 <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the job posting for "{job.title}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteJob(job.id)} className="bg-destructive hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="post-job">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Job Posting</CardTitle>
            <CardDescription>Fill out the details below to find your next great hire.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Job Title</FormLabel><FormControl><Input placeholder="e.g., Senior Product Manager" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid md:grid-cols-3 gap-6">
                    <FormField control={form.control} name="location" render={({ field }) => (
                      <FormItem><FormLabel>Location</FormLabel><FormControl><Input placeholder="e.g., San Francisco, CA" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="salary" render={({ field }) => (
                      <FormItem><FormLabel>Salary Range</FormLabel><FormControl><Input placeholder="e.g., $120,000 - $150,000" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="type" render={({ field }) => (
                      <FormItem><FormLabel>Job Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a job type" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Contract">Contract</SelectItem>
                            <SelectItem value="Internship">Internship</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Job Description</FormLabel><FormControl><Textarea placeholder="Describe the role, responsibilities, and requirements..." className="min-h-[200px]" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" size="lg">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Post Job
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
