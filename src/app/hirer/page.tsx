import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, Zap, Search, ArrowRight, ChevronDown } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function HirerPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-hirer');

  return (
    <div className="flex flex-col items-center bg-secondary/50">
      <section className="w-full pt-20 pb-24 md:pt-32 md:pb-40 bg-background text-foreground">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            Find Your Next Great Hire
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Access a pool of talented professionals actively looking for their next opportunity. Posting a job on WorkWise is simple, fast, and effective.
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
                  Search Candidates
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform transform hover:scale-105">
              <Link href="/dashboard">Post a Job</Link>
            </Button>
             <Button asChild size="lg" variant="outline" className="transition-transform transform hover:scale-105">
              <Link href="/">I'm a Job Seeker</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">The Easiest Way to Hire Top Talent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="flex-row items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-lg p-4 flex-shrink-0">
                    <Target className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="mb-2 text-xl">Reach Qualified Candidates</CardTitle>
                  <CardContent className="p-0 text-muted-foreground">
                    Our platform is built for professionals. Connect with candidates who have the skills and experience you need.
                  </CardContent>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="flex-row items-start gap-4">
                 <div className="bg-primary/10 text-primary rounded-lg p-4 flex-shrink-0">
                    <Zap className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="mb-2 text-xl">Post Jobs in Minutes</CardTitle>
                  <CardContent className="p-0 text-muted-foreground">
                    Our intuitive dashboard makes it simple to create, edit, and manage your job postings.
                  </CardContent>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="flex-row items-start gap-4">
                <div className="bg-primary/10 text-primary rounded-lg p-4 flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="mb-2 text-xl">Manage Applicants Easily</CardTitle>
                  <CardContent className="p-0 text-muted-foreground">
                    Track applicants, review CVs, and manage your hiring pipeline all in one place.
                  </CardContent>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {heroImage && (
        <section className="w-full py-16 lg:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-muted-foreground mb-6 text-lg">
                  Join hundreds of companies finding their best talent on WorkWise. Create your account today and post your first job for free.
                </p>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/dashboard">Go to Hirer Dashboard <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
              <div className="order-1 md:order-2">
                <Image 
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint={heroImage.imageHint}
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
