
import { MOCK_JOBS } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Clock, Building, ArrowLeft, ArrowRight, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const job = MOCK_JOBS.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  const logo = PlaceHolderImages.find((img) => img.id === job.logoId);
  const timeAgo = formatDistanceToNow(new Date(job.postedDate), { addSuffix: true });

  // In a real app, you'd fetch the hirer's data
  const hirer = { id: '1', name: 'Recruiter Roxy' };

  return (
    <div className="bg-secondary/50 py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-4">
            <Link href="/jobs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs</Link>
        </Button>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">{job.title}</CardTitle>
                        <CardDescription className="text-lg">
                           at <Link href={`/company/${job.logoId}`} className="text-primary hover:underline">{job.company}</Link>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none text-card-foreground">
                            <p>{job.description}</p>
                            <h3 className="font-semibold text-xl mt-6 mb-2">Responsibilities</h3>
                            <ul>
                                <li>Develop and maintain web applications using React and Next.js.</li>
                                <li>Collaborate with cross-functional teams to define, design, and ship new features.</li>
                                <li>Ensure the technical feasibility of UI/UX designs.</li>
                                <li>Optimize application for maximum speed and scalability.</li>
                            </ul>
                            <h3 className="font-semibold text-xl mt-6 mb-2">Qualifications</h3>
                             <ul>
                                <li>Bachelor's degree in Computer Science or related field.</li>
                                <li>5+ years of experience in frontend development.</li>
                                <li>Proficient in React, Next.js, and TypeScript.</li>
                                <li>Experience with RESTful APIs.</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6">
                <Card>
                     <CardHeader>
                        <CardTitle>Job Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         {logo && (
                            <div className="w-20 h-20 relative">
                                <Image
                                    src={logo.imageUrl}
                                    alt={`${job.company} logo`}
                                    fill
                                    className="rounded-lg object-contain"
                                    data-ai-hint={logo.imageHint}
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="h-5 w-5" />
                            <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-5 w-5" />
                            <span>{job.location}</span>
                        </div>
                         <div className="flex items-center gap-2 text-muted-foreground">
                           <User className="h-5 w-5" />
                           Posted by <Link href={`/profile/${job.hirerId}`} className="text-primary hover:underline">{hirer.name}</Link>
                        </div>
                        <div className="text-lg font-bold text-primary">{job.salary}</div>
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{timeAgo}</span>
                        </div>

                         <Button asChild size="lg" className="w-full mt-4">
                            <Link href={`/jobs/${job.id}/apply`}>Apply Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </div>
  );
}
