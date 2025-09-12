import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JobCard from '@/components/job-card';
import { MOCK_JOBS } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Briefcase, Building, Users, Search, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


export default function Home() {
  const recentJobs = [...MOCK_JOBS].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  const popularJobs = [...MOCK_JOBS].sort(() => Math.random() - 0.5); // Random sort for "popular" demo
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-job-seeker');

  return (
    <div className="flex flex-col items-center">
      <section className="w-full pt-20 pb-24 md:pt-32 md:pb-40 gradient-hero text-foreground">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Find Your Dream Job Today
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            WorkWise connects you with top companies and exciting opportunities.
            Your next career move is just a click away.
          </p>
          <div className="mt-8 max-w-3xl mx-auto">
            <Card className="shadow-lg rounded-full border-2 border-transparent focus-within:border-primary transition-all">
              <CardContent className="p-2 flex flex-col md:flex-row gap-0 items-center rounded-full bg-card">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="text" placeholder="Job title, skill, or company" className="pl-11 pr-4 py-3 h-12 text-base border-0 focus-visible:ring-0 rounded-full bg-transparent" />
                </div>
                <div className="relative flex-grow w-full md:w-auto md:border-l">
                  <Input type="text" placeholder="Location" className="pl-4 pr-4 py-3 h-12 text-base border-0 focus-visible:ring-0 rounded-full bg-transparent" />
                </div>
                <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 m-1.5 rounded-full text-base h-auto">
                  Search
                </Button>
              </CardContent>
            </Card>
          </div>
           <div className="flex justify-center mt-8">
            <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-primary">
              <Link href="/jobs">Browse All Jobs <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Most Recent Jobs</h2>
            <Button variant="ghost" asChild>
              <Link href="/jobs">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {recentJobs.map((job) => (
                <CarouselItem key={`recent-${job.id}`} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <JobCard job={job} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
           <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold font-headline">Popular Jobs</h2>
            <Button variant="ghost" asChild>
              <Link href="/jobs">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {popularJobs.map((job) => (
                <CarouselItem key={`popular-${job.id}`} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <JobCard job={job} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden lg:flex" />
            <CarouselNext className="hidden lg:flex" />
          </Carousel>
        </div>
      </section>

      <section className="w-full py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12 font-headline">Why Choose WorkWise?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                            <Briefcase className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline">Curated Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Access a wide range of jobs from leading companies, hand-picked for you.</p>
                    </CardContent>
                </Card>
                <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                            <Users className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline">Streamlined Applications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Apply for jobs quickly and easily with our one-click application process.</p>
                    </CardContent>
                </Card>
                <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                            <Building className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline">For Hirers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Looking to hire top talent? Post a job and find the perfect candidate.</p>
                        <Button asChild variant="link" className="mt-4 text-primary">
                            <Link href="/hirer">Post a Job <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>
    </div>
  );
}
