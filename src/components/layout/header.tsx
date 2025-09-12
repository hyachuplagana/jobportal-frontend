'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const navLinks = [
  { href: '/jobs', label: 'Find Jobs' },
  { href: '/hirer', label: 'For Hirers' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const userImage = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <header className="bg-background/80 backdrop-blur-lg sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
          <Briefcase className="h-6 w-6 text-primary" />
          <span>WorkWise</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'transition-colors hover:text-primary',
                pathname === href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
           {user && (
             <Link
              href="/dashboard"
              className={cn(
                'transition-colors hover:text-primary',
                pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              Dashboard
            </Link>
           )}
        </nav>
        <div className="hidden md:flex items-center gap-2">
            {!loading && !user && (
              <>
                <Button variant="ghost" asChild>
                    <Link href="#">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="#">Register</Link>
                </Button>
              </>
            )}
            {!loading && user && userImage && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Image
                      src={userImage.imageUrl}
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                      data-ai-hint={userImage.imageHint}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="#" className="w-full">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link href="/dashboard" className="w-full">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                     <Link href="#" className="w-full">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <span>WorkWise</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === href ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                  {user && (
                     <Link
                      href="/dashboard"
                      className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </nav>
                <div className="flex flex-col gap-4 mt-4">
                  {!user && (
                    <>
                      <Button variant="outline" asChild>
                          <Link href="#">Login</Link>
                      </Button>
                      <Button asChild>
                          <Link href="#">Register</Link>
                      </Button>
                    </>
                  )}
                   {user && (
                      <Button variant="outline" asChild>
                        <Link href="#">Log Out</Link>
                    </Button>
                   )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
