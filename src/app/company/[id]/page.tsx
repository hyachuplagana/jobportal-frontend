
import { MOCK_COMPANIES, MOCK_JOBS } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Link as LinkIcon, Briefcase } from 'lucide-react';
import JobCard from '@/components/job-card';

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const company = MOCK_COMPANIES.find((c) => c.id === params.id);

  if (!company) {
    notFound();
  }

  const companyJobs = MOCK_JOBS.filter(job => job.logoId === company.id);
  const logo = PlaceHolderImages.find((img) => img.id === company.logoId);

  return (
    <div className="bg-secondary/50 min-h-full py-12 md:py-20">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
         <Button variant="ghost" asChild className="mb-6">
          <Link href="/jobs"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs</Link>
        </Button>
         <Card>
            <CardHeader className="flex flex-col md:flex-row items-start gap-6">
                {logo && (
                    <div className="w-24 h-24 relative border-4 border-background shadow-lg rounded-lg flex-shrink-0">
                        <Image src={logo.imageUrl} alt={company.name} layout="fill" className="rounded-md object-contain" />
                    </div>
                )}
                <div className="flex-1">
                    <CardTitle className="text-3xl font-bold">{company.name}</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground mt-2">
                        {company.description}
                    </CardDescription>
                     <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <LinkIcon className="h-4 w-4" /> 
                             <a href={company.website} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                                {company.website}
                            </a>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mt-8 border-t pt-8">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Briefcase className="h-6 w-6 text-primary" />
                        Open Positions ({companyJobs.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {companyJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
