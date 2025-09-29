import { MOCK_JOBS, MOCK_APPLICANTS } from '@/lib/mock-data';
import type { Job, Applicant } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import ApplicantsView from './applicants-view';

export default function ApplicantsPage({ params }: { params: { id: string } }) {
  const job = MOCK_JOBS.find((j) => j.id === params.id);

  if (!job) {
    notFound();
  }

  const applicants = MOCK_APPLICANTS.filter(a => a.jobId === job.id);

  return <ApplicantsView job={job} applicants={applicants} />;
}
 