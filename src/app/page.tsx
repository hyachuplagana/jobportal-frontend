import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JobCard from '@/components/job-card';
import { MOCK_JOBS } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Briefcase, Building, Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function Home() {
  const featuredJobs = MOCK_JOBS.slice(0, 3);
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-job-seeker');

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 lg:py-32 gradient-hero text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8">
            WorkWise connects you with top companies and exciting opportunities.
            Your next career move is just a click away.
          </p>
          <div className="mt-8 max-w-3xl mx-auto">
            <Card className="shadow-lg">
              <CardContent className="p-2 flex flex-col md:flex-row gap-0 items-center rounded-lg">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="text" placeholder="Search by skills, company, or job title" className="pl-10 pr-4 py-3 text-base border-0 focus-visible:ring-0" />
                </div>
                 <div className="relative flex-grow w-full md:w-auto">
                  <Input type="text" placeholder="Location" className="pl-4 pr-4 py-3 text-base border-0 md:border-l rounded-none focus-visible:ring-0" />
                </div>
                <Button size="lg" className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90 m-2 md:m-0 rounded-md">
                  Search
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild size="lg" variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground">
              <Link href="/jobs">or Browse All Jobs &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Choose WorkWise?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <div className="mx-auto bg-accent text-accent-foreground rounded-full p-3 w-fit mb-4">
                            <Briefcase className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline">Curated Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Access a wide range of jobs from leading companies, hand-picked for you.</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <div className="mx-auto bg-accent text-accent-foreground rounded-full p-3 w-fit mb-4">
                            <Users className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline">Streamlined Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Apply for jobs quickly and easily with our one-click application process.</p>
                    </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                        <div className="mx-auto bg-accent text-accent-foreground rounded-full p-3 w-fit mb-4">
                            <Building className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline">For Hirers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Looking to hire top talent? Post a job and find the perfect candidate.</p>
                        <Button asChild variant="link" className="mt-4 text-accent-foreground">
                            <Link href="/hirer">Post a Job &rarr;</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>
    </div>
  );
}
