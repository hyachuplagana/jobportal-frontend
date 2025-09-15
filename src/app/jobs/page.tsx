
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MOCK_JOBS } from '@/lib/mock-data';
import JobFiltersDisplay from './job-filters';
import { Sidebar } from '@/components/jobs/sidebar';
import type { Filters } from '@/components/jobs/sidebar';

export default function JobsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  
  const [filters, setFilters] = useState<Filters>({
    keywords: '',
    location: '',
    salary: [50000, 150000],
    jobType: [],
    experience: '',
    company: [],
    industry: [],
    category: initialCategory ? [initialCategory] : []
  });

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
        setFilters(prev => ({ ...prev, category: [category] }));
    }
  }, [searchParams]);

  const filteredJobs = useMemo(() => {
    let jobs = [...MOCK_JOBS];
    
    // Keywords
    if (filters.keywords) {
      jobs = jobs.filter(job => job.title.toLowerCase().includes(filters.keywords.toLowerCase()) || job.description.toLowerCase().includes(filters.keywords.toLowerCase()));
    }
    // Location
    if (filters.location) {
        jobs = jobs.filter(job => job.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    // Job Type
    if (filters.jobType.length > 0) {
        jobs = jobs.filter(job => filters.jobType.some(type => job.type.toLowerCase() === type.toLowerCase()));
    }
    // Category
    if (filters.category.length > 0) {
       jobs = jobs.filter((job) =>
        filters.category.some(
          (filter) =>
            // A real app would have a dedicated category field. We simulate it.
            job.title.toLowerCase().includes(filter.toLowerCase()) ||
            job.company.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
    // Experience (assuming mock data could be extended with this field)
    // Company
    if (filters.company.length > 0) {
        jobs = jobs.filter(job => filters.company.includes(job.company));
    }
    // Industry (assuming mock data could be extended with this field)
    
    return jobs;
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      keywords: '',
      location: '',
      salary: [50000, 150000],
      jobType: [],
      experience: '',
      company: [],
      industry: [],
      category: [],
    });
  };

  return (
    <div className="bg-secondary min-h-full">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Find Your Next Role</h1>
          <p className="text-muted-foreground mt-2">
            Browse through thousands of open positions or use our filters to find the perfect match.
          </p>
        </header>
        <div className="flex flex-col md:flex-row gap-8">
            <Sidebar 
                filters={filters} 
                setFilters={setFilters} 
                onClearFilters={handleClearFilters}
            />
            <JobFiltersDisplay allJobs={filteredJobs} initialJobs={MOCK_JOBS} />
        </div>
      </div>
    </div>
  );
}
