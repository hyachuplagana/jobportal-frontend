
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Edit, Mail, Briefcase, Building, Link as LinkIcon, User as UserIcon, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const userImage = PlaceHolderImages.find((img) => img.id === 'user-avatar');

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
          Please log in to view your profile.
        </p>
        <Button asChild className="mt-6">
          <Link href="#">Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/50 min-h-full py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
         <Card>
            <CardHeader className="flex flex-col md:flex-row items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                    {userImage && <AvatarImage src={userImage.imageUrl} alt={user.name} />}
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                            <CardDescription className="text-lg text-muted-foreground">
                                {user.role === 'seeker' ? 'Senior Frontend Developer at Tech Solutions Inc.' : 'Hiring Manager at My Company'}
                            </CardDescription>
                        </div>
                        <Button asChild variant="outline">
                            <Link href="/profile/edit"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Link>
                        </Button>
                    </div>
                     <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> {user.email}
                        </div>
                        {user.role === 'seeker' && (
                             <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" /> Actively seeking new opportunities
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {user.role === 'seeker' ? (
                   <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold mb-4">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS'].map(skill => (
                                <Badge key={skill} variant="secondary" className="text-base px-4 py-1">{skill}</Badge>
                            ))}
                        </div>
                         <h3 className="text-xl font-semibold mt-8 mb-4">Resume</h3>
                         <div className="flex items-center gap-3 text-primary hover:underline">
                            <FileText className="h-5 w-5" />
                            <Link href="#" target="_blank">View Resume</Link>
                         </div>
                   </div>
                ) : (
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-xl font-semibold mb-4">Company Details</h3>
                        <div className="space-y-4 text-muted-foreground">
                             <div className="flex items-center gap-3">
                                <Building className="h-5 w-5" />
                                <span className="font-semibold text-card-foreground">My Company</span>
                            </div>
                             <div className="flex items-center gap-3">
                                <LinkIcon className="h-5 w-5" />
                                <a href="https://example.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">
                                    https://example.com
                                </a>
                            </div>
                            <p>We are a leading company in our industry, committed to innovation and excellence. Join us to make a difference.</p>
                        </div>
                    </div>
                )}
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
