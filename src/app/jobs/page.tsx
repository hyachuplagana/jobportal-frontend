
import { Suspense } from 'react';
import JobsPageContent from './jobs-page-content';
import { Skeleton } from '@/components/ui/skeleton';

function JobsPageSkeleton() {
    return (
        <div className="bg-secondary min-h-full">
            <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
                <header className="mb-8">
                    <Skeleton className="h-10 w-1/2 mb-4" />
                    <Skeleton className="h-6 w-3/4" />
                </header>
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="hidden md:block w-full md:w-80 lg:w-96">
                        <Skeleton className="h-[500px] w-full" />
                    </aside>
                    <main className="flex-1">
                        <div className="md:hidden mb-4">
                           <Skeleton className="h-10 w-full" />
                        </div>
                        <Skeleton className="h-[600px] w-full" />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default function JobsPage() {
  return (
    <Suspense fallback={<JobsPageSkeleton />}>
      <JobsPageContent />
    </Suspense>
  );
}
