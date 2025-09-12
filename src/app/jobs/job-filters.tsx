'use client';

import { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  jobCategorySuggestions,
  JobCategorySuggestionsOutput,
} from '@/ai/flows/job-category-suggestions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, List, LayoutGrid } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobCard from '@/components/job-card';
import type { Job } from '@/lib/mock-data';

const formSchema = z.object({
  userDescription: z.string().min(10, 'Please describe your desired job in at least 10 characters.'),
});

type JobFiltersProps = {
  allJobs: Job[];
};

export default function JobFilters({ allJobs }: JobFiltersProps) {
  const [suggestions, setSuggestions] = useState<JobCategorySuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestions(null);
    try {
      const result = await jobCategorySuggestions(values);
      setSuggestions(result);
    } catch (error) {
      console.error('AI suggestion failed:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const allSuggestions = useMemo(() => {
    if (!suggestions) return [];
    return [...suggestions.categories, ...suggestions.specializations, ...suggestions.qualities];
  }, [suggestions]);

  const filteredAndSortedJobs = useMemo(() => {
    let jobs = [...allJobs];
    
    if (activeFilters.length > 0) {
      jobs = jobs.filter(job => 
        activeFilters.some(filter => 
          job.title.toLowerCase().includes(filter.toLowerCase()) || 
          job.description.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }

    jobs.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        case 'oldest':
          return new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime();
        default:
          return 0;
      }
    });

    return jobs;
  }, [allJobs, activeFilters, sortBy]);

  return (
    <div>
      <Card className="mb-8">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-lg font-semibold">
                      <Sparkles className="h-5 w-5 text-accent" />
                      AI-Powered Job Filter
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., 'I am a backend developer with 5 years of experience in Python and cloud services. I want to work on a product with a social impact.'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate Smart Filters
              </Button>
            </form>
          </Form>
          {suggestions && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Suggested Filters:</h3>
              <div className="flex flex-wrap gap-2">
                {allSuggestions.map((suggestion) => (
                  <Badge
                    key={suggestion}
                    variant={activeFilters.includes(suggestion) ? 'default' : 'secondary'}
                    onClick={() => toggleFilter(suggestion)}
                    className="cursor-pointer transition-all hover:scale-105"
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-muted-foreground">
          Showing {filteredAndSortedJobs.length} of {allJobs.length} jobs
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant={view === 'grid' ? 'default' : 'ghost'} size="icon" onClick={() => setView('grid')}>
              <LayoutGrid className="h-5 w-5" />
            </Button>
            <Button variant={view === 'list' ? 'default' : 'ghost'} size="icon" onClick={() => setView('list')}>
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

      <div className={view === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : "space-y-4"
      }>
        {filteredAndSortedJobs.map(job => (
          <JobCard key={job.id} job={job} view={view}/>
        ))}
      </div>
    </div>
  );
}
