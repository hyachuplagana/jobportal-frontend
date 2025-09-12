
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import JobCard from '@/components/job-card';
import { MOCK_JOBS } from '@/lib/mock-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Briefcase, Building, Users, Search, ArrowRight, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Home() {
  const recentJobs = [...MOCK_JOBS].sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
  const popularJobs = [...MOCK_JOBS].sort(() => Math.random() - 0.5); // Random sort for "popular" demo
  const companyLogos = PlaceHolderImages.filter(p => p.id.startsWith('logo-'));

  return (
    <div className="flex flex-col items-center bg-secondary/50">
      <section className="w-full py-12 md:py-20 bg-background text-foreground animate-fade-in-up">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Find your dream job now
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            5 lakh+ jobs for you to explore
          </p>
          <div className="mt-8 max-w-3xl mx-auto">
            <Card className="shadow-lg rounded-full border-2 border-border focus-within:border-primary transition-all">
              <CardContent className="p-1.5 flex flex-col md:flex-row gap-0 items-center rounded-full bg-card">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input type="text" placeholder="Skills, designations, companies" className="pl-11 pr-4 py-3 h-14 text-base border-0 focus-visible:ring-0 rounded-l-full bg-transparent" />
                </div>
                <div className="relative flex-grow w-full md:w-auto md:border-l">
                   <Select>
                    <SelectTrigger className="w-full md:w-[200px] h-14 text-base border-0 focus:ring-0 rounded-none bg-transparent">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Fresher</SelectItem>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                       <SelectItem value="4">4+ Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative flex-grow w-full md:w-auto md:border-l">
                  <Input type="text" placeholder="Location" className="pl-4 pr-4 py-3 h-14 text-base border-0 focus-visible:ring-0 rounded-none bg-transparent md:w-[200px]" />
                </div>
                <Button size="lg" className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90 m-1 rounded-full text-base h-12 px-10">
                  Search
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-background animate-fade-in-up animation-delay-200">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h3 className="text-muted-foreground font-semibold mb-6 text-center">TOP COMPANIES HIRING ON WORKWISE</h3>
          <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-4">
            {companyLogos.map(logo => (
              <Image 
                key={logo.id} 
                src={logo.imageUrl} 
                alt={logo.description} 
                width={100} 
                height={40}
                className="object-contain grayscale hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 lg:py-24 animate-fade-in-up animation-delay-400">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Most Recent Jobs</h2>
            <Button variant="link" asChild className="text-primary">
              <Link href="/jobs">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
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

      <section className="w-full py-16 lg:py-24 bg-background animate-fade-in-up animation-delay-600">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
           <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Popular Job Categories</h2>
             <Button variant="link" asChild className="text-primary">
              <Link href="/jobs">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {['Tech & IT', 'Sales & Marketing', 'Finance', 'Healthcare', 'Engineering', 'Human Resources', 'Design', 'Customer Service'].map(category => (
               <Link href="#" key={category} className="bg-card p-4 rounded-lg flex items-center justify-between hover:bg-card/80 hover:shadow-md transition-all">
                  <span className="font-semibold">{category}</span>
                  <ChevronDown className="h-5 w-5 -rotate-90 text-muted-foreground" />
               </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-16 lg:py-24 animate-fade-in-up animation-delay-800">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-2xl font-bold text-center mb-12">For Hirers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                            <Users className="h-8 w-8" />
                        </div>
                        <CardTitle>Streamlined Applications</CardTitle>
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
                        <CardTitle>Post a Job</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Looking to hire top talent? Post a job and find the perfect candidate.</p>
                        <Button asChild variant="link" className="mt-4 text-primary">
                            <Link href="/hirer">Go to Hirer Page <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card className="bg-transparent border-0 shadow-none">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                            <Briefcase className="h-8 w-8" />
                        </div>
                        <CardTitle>Curated Opportunities</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Access a wide range of jobs from leading companies, hand-picked for you.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>
    </div>
  );
}
