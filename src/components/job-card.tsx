import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, Building } from 'lucide-react';
import type { Job } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatDistanceToNow } from 'date-fns';

type JobCardProps = {
  job: Job;
  view?: 'grid' | 'list';
};

export default function JobCard({ job, view = 'grid' }: JobCardProps) {
  const logo = PlaceHolderImages.find((img) => img.id === job.logoId);
  const timeAgo = formatDistanceToNow(new Date(job.postedDate), { addSuffix: true });

  if (view === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300 w-full flex flex-col sm:flex-row group">
        <div className="p-6 flex items-center justify-center sm:border-r">
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
        </div>
        <div className="flex-grow">
          <CardHeader>
            <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">{job.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="h-4 w-4" />
              <span>{job.company}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>{job.salary}</span>
            </div>
          </CardContent>
        </div>
        <div className="p-6 flex flex-col justify-between items-start sm:items-end">
          <div className="flex flex-col sm:items-end space-y-2">
            <Badge variant="secondary">{job.type}</Badge>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Clock className="h-3 w-3" />
              <span>{timeAgo}</span>
            </div>
          </div>
          <Button asChild className="mt-4 w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={`/jobs/${job.id}/apply`}>Apply</Link>
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 group">
      <CardHeader className="flex-row gap-4 items-start">
        {logo && (
          <div className="w-16 h-16 relative flex-shrink-0">
             <Image
              src={logo.imageUrl}
              alt={`${job.company} logo`}
              fill
              className="rounded-lg object-contain"
              data-ai-hint={logo.imageHint}
            />
          </div>
        )}
        <div className="flex-grow">
          <CardTitle className="font-headline text-xl mb-1 group-hover:text-primary transition-colors">{job.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span>{job.company}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm flex-grow">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign className="h-4 w-4" />
          <span>{job.salary}</span>
        </div>
         <div className="flex items-center gap-2 text-muted-foreground pt-2">
          <Clock className="h-4 w-4" />
          <span>{timeAgo}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-end pt-4">
        <Badge variant="secondary">{job.type}</Badge>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
