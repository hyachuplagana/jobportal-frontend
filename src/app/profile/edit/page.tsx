
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HirerProfileForm from './hirer-profile-form';
import SeekerProfileForm from './seeker-profile-form';
import { ArrowLeft } from 'lucide-react';

export default function EditProfilePage() {
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
          Please log in to edit your profile.
        </p>
        <Button asChild className="mt-6">
          <Link href="#">Login</Link>
        </Button>
      </div>
    );
  }

  const ProfileFormComponent =
    user.role === 'hirer' ? HirerProfileForm : SeekerProfileForm;

  return (
    <div className="bg-background min-h-full py-12 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 md:px-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/profile"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile</Link>
        </Button>
        <header className="mb-8">
          <h1 className="text-4xl font-bold font-headline">Edit Profile</h1>
          <p className="text-muted-foreground mt-2">
            Update your personal and professional information.
          </p>
        </header>
        <ProfileFormComponent user={user} />
      </div>
    </div>
  );
}
