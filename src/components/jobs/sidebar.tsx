
'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export type Filters = {
  keywords: string;
  location: string;
  salary: number[];
  jobType: string[];
  experience: string;
  company: string[];
  industry: string[];
  category: string[];
};

type SidebarProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onClearFilters: () => void;
};

const companies = [
  'Tech Solutions Inc.',
  'Innovate Now',
  'DataCorp',
  'GreenEnergy Co.',
  'HealthPlus',
  'Finance Gurus',
];
const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Renewable Energy',
  'Marketing',
];
const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

const salaryData = [
    { name: '40k', jobs: 20 },
    { name: '60k', jobs: 55 },
    { name: '80k', jobs: 70 },
    { name: '100k', jobs: 80 },
    { name: '120k', jobs: 60 },
    { name: '140k', jobs: 45 },
    { name: '160k', jobs: 30 },
    { name: '180k+', jobs: 15 },
]

export function Sidebar({ filters, setFilters, onClearFilters }: SidebarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };
  
  const handleCheckboxChange = (group: keyof Filters, value: string, checked: boolean) => {
    setFilters(prev => {
        const list = (prev[group] as string[]).slice();
        if (checked) {
            if (!list.includes(value)) list.push(value);
        } else {
            const index = list.indexOf(value);
            if (index > -1) list.splice(index, 1);
        }
        return { ...prev, [group]: list };
    });
  };

  return (
    <Card className="w-full md:w-80 h-fit self-start sticky top-24">
      <CardContent className="p-4 space-y-6">
        <div>
          <Label htmlFor="keywords" className="font-semibold">
            Keywords
          </Label>
          <Input id="keywords" placeholder="e.g., 'React', 'Node.js'" value={filters.keywords} onChange={handleInputChange} />
        </div>
        <div>
          <Label htmlFor="location" className="font-semibold">
            Location
          </Label>
          <Input id="location" placeholder="e.g., 'San Francisco, CA'" value={filters.location} onChange={handleInputChange} />
        </div>

        <Accordion type="multiple" defaultValue={['salary', 'job-type']}>
          <AccordionItem value="salary">
            <AccordionTrigger className="font-semibold">
              Salary Range
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
               <div className="h-20 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salaryData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis hide={true} />
                            <Bar dataKey="jobs" fill="hsl(var(--primary) / 0.3)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
               </div>
              <Slider
                value={filters.salary}
                onValueChange={(value) => setFilters(prev => ({ ...prev, salary: value }))}
                max={200000}
                step={1000}
              />
              <div className="flex justify-between items-center text-sm">
                <span>${filters.salary[0].toLocaleString()}</span>
                <span>${filters.salary[1].toLocaleString()}{filters.salary[1] === 200000 ? '+' : ''}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="job-type">
            <AccordionTrigger className="font-semibold">
              Job Type
            </AccordionTrigger>
            <AccordionContent className="pt-2 space-y-2">
                {jobTypes.map(type => (
                     <div key={type} className="flex items-center gap-2">
                        <Checkbox id={`jobType-${type}`} checked={filters.jobType.includes(type)} onCheckedChange={(checked) => handleCheckboxChange('jobType', type, !!checked)} />
                        <Label htmlFor={`jobType-${type}`}>{type}</Label>
                    </div>
                ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="experience">
            <AccordionTrigger className="font-semibold">
              Experience Level
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <Select value={filters.experience} onValueChange={(value) => setFilters(prev => ({ ...prev, experience: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry-level</SelectItem>
                  <SelectItem value="mid">Mid-level</SelectItem>
                  <SelectItem value="senior">Senior-level</SelectItem>
                  <SelectItem value="lead">Lead/Manager</SelectItem>
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="company">
            <AccordionTrigger className="font-semibold">
              Company
            </AccordionTrigger>
            <AccordionContent className="pt-2 space-y-2 max-h-48 overflow-y-auto">
              {companies.map((company) => (
                <div key={company} className="flex items-center gap-2">
                  <Checkbox id={`company-${company}`} checked={filters.company.includes(company)} onCheckedChange={(checked) => handleCheckboxChange('company', company, !!checked)} />
                  <Label htmlFor={`company-${company}`}>{company}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="industry">
            <AccordionTrigger className="font-semibold">
              Industry
            </AccordionTrigger>
            <AccordionContent className="pt-2 space-y-2 max-h-48 overflow-y-auto">
              {industries.map((industry) => (
                <div key={industry} className="flex items-center gap-2">
                  <Checkbox id={`industry-${industry}`} checked={filters.industry.includes(industry)} onCheckedChange={(checked) => handleCheckboxChange('industry', industry, !!checked)} />
                  <Label htmlFor={`industry-${industry}`}>{industry}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <Button variant="outline" className="w-full" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
