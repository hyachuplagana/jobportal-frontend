
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

type JobFiltersProps = {
  allJobs: Job[];
};

export default function JobFilters({ allJobs }: JobFiltersProps) {
  const [activeFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedJobs = useMemo(() => {
    let jobs = [...allJobs];

    if (activeFilters.length > 0) {
      jobs = jobs.filter((job) =>
        activeFilters.some(
          (filter) =>
            job.title.toLowerCase().includes(filter.toLowerCase()) ||
            job.description.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

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
  }, [allJobs, activeFilters, sortBy]);

  return (
    <div className="flex-1">
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedJobs.length} of {allJobs.length} jobs
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
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
            <SelectTrigger className="w-[180px]">
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
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'
            : 'space-y-4'
        }
      >
        {filteredAndSortedJobs.map((job) => (
          <JobCard key={job.id} job={job} view={view} />
        ))}
      </div>
    </div>
  );
}
