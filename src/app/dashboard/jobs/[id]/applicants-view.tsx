
'use client';

import { useState, useMemo } from 'react';
import type { Job, Applicant } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { FileText, Search, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

type ApplicantsViewProps = {
    job: Job;
    applicants: Applicant[];
}

export default function ApplicantsView({ job, applicants }: ApplicantsViewProps) {
  const [search, setSearch] = useState('');

  const filteredApplicants = useMemo(() => {
    if (!search) return applicants;
    return applicants.filter(applicant =>
      applicant.name.toLowerCase().includes(search.toLowerCase()) ||
      applicant.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, applicants]);

  return (
    <div className="bg-secondary/50 min-h-full py-12 md:py-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard</Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Applicants for {job.title}</CardTitle>
            <CardDescription>{applicants.length} candidates have applied for this role.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-6">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Filter by name or skill..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead className="hidden md:table-cell">Applied</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant) => {
                      const avatar = PlaceHolderImages.find(p => p.id === applicant.avatarId);
                      const timeAgo = formatDistanceToNow(new Date(applicant.applicationDate), { addSuffix: true });
                      return (
                        <TableRow key={applicant.id}>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Avatar>
                                {avatar && <AvatarImage src={avatar.imageUrl} alt={applicant.name} />}
                                <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{applicant.name}</p>
                                <p className="text-sm text-muted-foreground">{applicant.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{timeAgo}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {applicant.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={applicant.resumeUrl} target="_blank">
                                <FileText className="mr-2 h-4 w-4" />
                                View CV
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                     <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center">
                            No applicants found matching your criteria.
                        </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
