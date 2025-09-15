
'use client';

import { MOCK_JOBS } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, CheckCircle } from 'lucide-react';

const appliedJobs = MOCK_JOBS.slice(0, 3).map((job, i) => ({
    ...job,
    applicationDate: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: i === 0 ? 'Under Review' : i === 1 ? 'Interviewing' : 'Rejected'
}));

export default function SeekerDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Applications</CardTitle>
        <CardDescription>Keep track of all the jobs you've applied for.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead className="hidden md:table-cell">Company</TableHead>
                  <TableHead className="hidden md:table-cell">Date Applied</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appliedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{job.company}</TableCell>
                    <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(job.applicationDate).toLocaleDateString()}
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <Badge 
                        variant={job.status === 'Interviewing' ? 'default' : (job.status === 'Rejected' ? 'destructive' : 'secondary')}
                      >
                        {job.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
      </CardContent>
    </Card>
  );
}
