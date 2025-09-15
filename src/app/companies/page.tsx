
import { MOCK_COMPANIES, MOCK_JOBS } from '@/lib/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, ArrowRight } from 'lucide-react';

export default function CompaniesPage() {
  return (
    <div className="bg-secondary/50 min-h-full py-12 md:py-20">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold font-headline">Explore Companies</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover the innovative companies that are hiring on WorkWise. Learn more about their culture and find your next opportunity.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_COMPANIES.map(company => {
            const logo = PlaceHolderImages.find(img => img.id === company.logoId);
            const openJobsCount = MOCK_JOBS.filter(job => job.logoId === company.id).length;

            return (
              <Card key={company.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex-row items-start gap-4">
                  {logo && (
                    <Link href={`/company/${company.id}`} className="flex-shrink-0">
                      <div className="w-16 h-16 relative border rounded-lg">
                        <Image
                          src={logo.imageUrl}
                          alt={`${company.name} logo`}
                          fill
                          className="rounded-md object-contain p-1"
                          data-ai-hint={logo.imageHint}
                        />
                      </div>
                    </Link>
                  )}
                  <div className="flex-1">
                    <CardTitle className="text-xl">
                      <Link href={`/company/${company.id}`} className="hover:text-primary transition-colors">
                        {company.name}
                      </Link>
                    </CardTitle>
                     <CardDescription className="text-sm mt-1 line-clamp-2">{company.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    
                </CardContent>
                <CardFooter className="flex justify-between items-center bg-secondary/50 p-4 rounded-b-xl">
                  <div className="text-sm font-semibold text-primary">
                    {openJobsCount} Open Position{openJobsCount !== 1 ? 's' : ''}
                  </div>
                  <Button asChild variant="link" size="sm" className="text-primary">
                    <Link href={`/company/${company.id}`}>
                      View Jobs <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
