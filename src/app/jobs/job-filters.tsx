
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { List, LayoutGrid } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import JobCard from '@/components/job-card';
import type { Job } from '@/lib/mock-data';

type JobFiltersDisplayProps = {
  allJobs: Job[];
  initialJobs: Job[];
};


export default function JobFiltersDisplay({ allJobs, initialJobs }: JobFiltersDisplayProps) {
  const [sortBy, setSortBy] = useState('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const sortedJobs = useMemo(() => {
    let jobs = [...allJobs];

    jobs.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (
            new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
          );
        case 'oldest':
          return (
            new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
          );
        default:
          return 0;
      }
    });

    return jobs;
  }, [allJobs, sortBy]);

  return (
    <div className="flex-1">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-sm text-muted-foreground w-full md:w-auto">
          Showing {sortedJobs.length} of {initialJobs.length} jobs
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={view === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setView('grid')}
            >
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setView('list')}
            >
              <List className="h-5 w-5" />
            </Button>
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
            : 'space-y-4'
        }
      >
        {sortedJobs.map((job) => (
          <JobCard key={job.id} job={job} view={view} />
        ))}
         {sortedJobs.length === 0 && (
            <div className="text-center py-10 text-muted-foreground col-span-full">
                No jobs found matching your criteria.
            </div>
        )}
      </div>
    </div>
  );
}
