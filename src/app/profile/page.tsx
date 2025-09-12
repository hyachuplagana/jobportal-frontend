
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(`/profile/${user.id}`);
    }
  }, [user, loading, router]);


  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 text-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 text-center">
        <h1 className="text-3xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground mt-2">
          Please log in to view your profile.
        </p>
        <Button asChild className="mt-6">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    );
  }

  return null;
}
