
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Edit, Mail, Briefcase, Building, Link as LinkIcon, User as UserIcon, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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


  if (loading || !user) {
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
