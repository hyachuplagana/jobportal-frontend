import { MOCK_JOBS } from '@/lib/mock-data';
import JobFilters from './job-filters';
import { Sidebar } from '@/components/jobs/sidebar';

export default function JobsPage({ searchParams }: { searchParams: { category?: string } }) {
  return (
    <div className="bg-secondary min-h-full">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Find Your Next Role</h1>
          <p className="text-muted-foreground mt-2">
            Browse through thousands of open positions or use our AI-powered tool to find the perfect match.
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-8">
            <Sidebar />
            <JobFilters allJobs={MOCK_JOBS} initialCategory={searchParams.category} />
        </div>
      </div>
    </div>
  );
}
