
'use client';

import { useAuth } from '@/hooks/use-auth';
import HirerDashboard from './hirer-dashboard';
import SeekerDashboard from './seeker-dashboard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 text-center">
            <p>Loading...</p>
        </div>
    );
  }

  if (!user) {
    return (
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 text-center">
            <h1 className="text-3xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground mt-2">
                Please log in to view your dashboard.
            </p>
            <Button asChild className="mt-6">
                <Link href="/login">Login</Link>
            </Button>
        </div>
    )
  }

  const DashboardComponent = user.role === 'hirer' ? HirerDashboard : SeekerDashboard;
  const pageTitle = user.role === 'hirer' ? "Hirer Dashboard" : "Job Seeker Dashboard";
  const pageDescription = user.role === 'hirer' 
    ? "Manage your job postings and applicants all in one place."
    : "Track your job applications and manage your profile.";


  return (
    <div className="bg-background min-h-full">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{pageTitle}</h1>
                <p className="text-muted-foreground mt-2">
                    {pageDescription}
                </p>
            </header>
            <DashboardComponent />
        </div>
    </div>
  );
}
