
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

export function Sidebar() {
  return (
    <Card className="w-full md:w-80 h-fit">
      <CardContent className="p-4 space-y-6">
        <div>
          <Label htmlFor="keywords" className="font-semibold">
            Keywords
          </Label>
          <Input id="keywords" placeholder="e.g., 'React', 'Node.js'" />
        </div>
        <div>
          <Label htmlFor="location" className="font-semibold">
            Location
          </Label>
          <Input id="location" placeholder="e.g., 'San Francisco, CA'" />
        </div>

        <Accordion type="multiple" defaultValue={['salary']}>
          <AccordionItem value="salary">
            <AccordionTrigger className="font-semibold">
              Salary Range
            </AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>$200,000+</span>
              </div>
              <Slider
                defaultValue={[50000, 150000]}
                max={200000}
                step={1000}
              />
              <div className="flex justify-between items-center">
                <Input
                  className="w-1/2"
                  placeholder="Min"
                  defaultValue="$50,000"
                />
                <span className="mx-2">-</span>
                <Input
                  className="w-1/2"
                  placeholder="Max"
                  defaultValue="$150,000"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="job-type">
            <AccordionTrigger className="font-semibold">
              Job Type
            </AccordionTrigger>
            <AccordionContent className="pt-2 space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="full-time" />
                <Label htmlFor="full-time">Full-time</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="part-time" />
                <Label htmlFor="part-time">Part-time</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="contract" />
                <Label htmlFor="contract">Contract</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="internship" />
                <Label htmlFor="internship">Internship</Label>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="experience">
            <AccordionTrigger className="font-semibold">
              Experience Level
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <Select>
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
                  <Checkbox id={company} />
                  <Label htmlFor={company}>{company}</Label>
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
                  <Checkbox id={industry} />
                  <Label htmlFor={industry}>{industry}</Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Button className="w-full">Apply Filters</Button>
        <Button variant="outline" className="w-full">
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  );
}
