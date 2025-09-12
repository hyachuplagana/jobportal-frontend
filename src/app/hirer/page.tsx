import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Target, Zap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HirerPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-hirer');

  return (
    <div className="flex flex-col items-center">
      <section className="w-full py-20 lg:py-32 gradient-hero text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            Find Your Next Great Hire
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-8">
            Access a pool of talented professionals actively looking for their next opportunity. Posting a job on WorkWise is simple, fast, and effective.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 transition-transform transform hover:scale-105">
              <Link href="/dashboard">Post a Job</Link>
            </Button>
             <Button asChild size="lg" variant="outline" className="text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 transition-transform transform hover:scale-105">
              <Link href="/">I'm a Job Seeker</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-headline">The Easiest Way to Hire Top Talent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="flex-row items-start gap-4">
                <div className="bg-accent text-accent-foreground rounded-full p-3 flex-shrink-0">
                    <Target className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="font-headline mb-2">Reach Qualified Candidates</CardTitle>
                  <CardContent className="p-0 text-muted-foreground">
                    Our platform is built for professionals. Connect with candidates who have the skills and experience you need.
                  </CardContent>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="flex-row items-start gap-4">
                <div className="bg-accent text-accent-foreground rounded-full p-3 flex-shrink-0">
                    <Zap className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="font-headline mb-2">Post Jobs in Minutes</CardTitle>
                  <CardContent className="p-0 text-muted-foreground">
                    Our intuitive dashboard makes it simple to create, edit, and manage your job postings.
                  </CardContent>
                </div>
              </CardHeader>
            </Card>
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="flex-row items-start gap-4">
                <div className="bg-accent text-accent-foreground rounded-full p-3 flex-shrink-0">
                    <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="font-headline mb-2">Manage Applicants Easily</CardTitle>
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
        <section className="w-full py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold font-headline mb-4">Ready to get started?</h2>
                <p className="text-muted-foreground mb-6">
                  Join hundreds of companies finding their best talent on WorkWise. Create your account today and post your first job for free.
                </p>
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/dashboard">Go to Hirer Dashboard</Link>
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
