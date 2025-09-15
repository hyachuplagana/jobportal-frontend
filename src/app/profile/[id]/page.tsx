
'use client';

import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Edit, Mail, Briefcase, Building, Link as LinkIcon, FileText, Github, Linkedin, Dribbble, Calendar, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';
import { MOCK_USER_PROFILES, UserProfile } from '@/lib/mock-data';

const PortfolioIcon = ({ url }: { url: string }) => {
    if (url.includes('github')) return <Github className="h-5 w-5" />;
    if (url.includes('linkedin')) return <Linkedin className="h-5 w-5" />;
    if (url.includes('dribbble')) return <Dribbble className="h-5 w-5" />;
    return <LinkIcon className="h-5 w-5" />;
}


export default function OthersProfilePage() {
  const { user: loggedInUser, loading } = useAuth();
  const params = useParams();
  const userImage = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  // In a real app, you would fetch this user's data based on params.id
  const viewedUser: UserProfile | undefined = MOCK_USER_PROFILES.find(p => p.id === params.id);

  if (loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 text-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  if (!viewedUser) {
    return (
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 text-center">
            <h1 className="text-3xl font-bold">User not found</h1>
        </div>
    )
  }

  return (
    <div className="bg-secondary/50 min-h-full py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
         <Card>
            <CardHeader className="flex flex-col md:flex-row items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                    {userImage && <AvatarImage src={userImage.imageUrl} alt={viewedUser.name} />}
                    <AvatarFallback>{viewedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-3xl font-bold">{viewedUser.name}</CardTitle>
                            <CardDescription className="text-lg text-muted-foreground mt-1">
                                {viewedUser.headline}
                            </CardDescription>
                        </div>
                         {loggedInUser?.id === viewedUser.id && (
                            <Button asChild variant="outline">
                                <Link href="/profile/edit"><Edit className="mr-2 h-4 w-4" /> Edit Profile</Link>
                            </Button>
                        )}
                    </div>
                     <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> {viewedUser.email}
                        </div>
                        {viewedUser.role === 'seeker' && (
                             <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" /> Actively seeking new opportunities
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {viewedUser.role === 'seeker' && viewedUser.workHistory ? (
                   <div className="grid md:grid-cols-3 gap-8">
                       <div className="md:col-span-2">
                            <div className="mt-6 border-t pt-6">
                                <h3 className="text-xl font-semibold mb-6">Work Experience</h3>
                                <div className="relative">
                                    <div className="absolute left-3.5 top-4 h-full border-l-2 border-border"></div>
                                    {viewedUser.workHistory.map((job, index) => (
                                        <div key={index} className="mb-8 pl-12 relative">
                                            <div className="absolute -left-0.5 top-1.5 flex items-center justify-center bg-primary rounded-full h-8 w-8 text-primary-foreground">
                                                <Briefcase className="h-4 w-4" />
                                            </div>
                                            <p className="font-semibold text-card-foreground">{job.title}</p>
                                            <p className="text-sm text-muted-foreground">{job.company}</p>
                                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                                <Calendar className="h-3 w-3"/>{job.startDate} - {job.endDate}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                             <div className="mt-6 border-t pt-6">
                                <h3 className="text-xl font-semibold mb-6">Education</h3>
                                <div className="relative">
                                     <div className="absolute left-3.5 top-4 h-full border-l-2 border-border"></div>
                                     <div className="mb-8 pl-12 relative">
                                         <div className="absolute -left-0.5 top-1.5 flex items-center justify-center bg-primary rounded-full h-8 w-8 text-primary-foreground">
                                            <GraduationCap className="h-4 w-4" />
                                        </div>
                                        <p className="font-semibold text-card-foreground">B.Sc. in Computer Science</p>
                                        <p className="text-sm text-muted-foreground">University of Technology</p>
                                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                            <Calendar className="h-3 w-3"/> 2016 - 2020
                                        </p>
                                     </div>
                                </div>
                            </div>
                       </div>
                       
                       <div className="md:col-span-1">
                            <div className="mt-6 border-t md:border-t-0 md:pt-0 md:border-l md:pl-6">
                                <h3 className="text-xl font-semibold mb-4">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {viewedUser.skills?.map(skill => (
                                        <Badge key={skill} variant="secondary" className="text-base px-3 py-1">{skill}</Badge>
                                    ))}
                                </div>
                                <h3 className="text-xl font-semibold mt-8 mb-4">Portfolio</h3>
                                <div className="space-y-3">
                                    {viewedUser.portfolio?.map(item => (
                                        <a href={item.url} key={item.name} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-primary hover:underline">
                                            <PortfolioIcon url={item.url} />
                                            <span>{item.name}</span>
                                        </a>
                                    ))}
                                </div>
                                 <h3 className="text-xl font-semibold mt-8 mb-4">Resume</h3>
                                 <div className="flex items-center gap-3 text-primary hover:underline">
                                    <FileText className="h-5 w-5" />
                                    <Link href="#" target="_blank">View Resume</Link>
                                 </div>
                            </div>
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
