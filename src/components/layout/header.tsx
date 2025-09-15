
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Briefcase, ChevronDown, ArrowRight, User as UserIcon } from 'lucide-react';
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
import { ThemeToggle } from '@/components/theme-toggle';

const navLinks = [
  { href: '/jobs', label: 'Jobs' },
  { href: '/companies', label: 'Companies' },
  { href: '/services', label: 'Services' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const userImage = PlaceHolderImages.find((img) => img.id === 'user-avatar');

  return (
    <header className="bg-background/80 backdrop-blur-lg sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="font-bold text-2xl tracking-tighter">WorkWise</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'transition-colors hover:text-primary flex items-center gap-1',
                  pathname === href ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
              >
                {label}
                 {label !== 'Jobs' && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
            {!loading && !user && (
              <>
                <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Register</Link>
                </Button>
                 <div className="h-8 w-px bg-border mx-2"></div>
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
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                     <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href="/login">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
             <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 hidden md:inline-flex">
                <Link href="/hirer">For Employers <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <ThemeToggle />
        </div>
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-10">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <Briefcase className="h-6 w-6 text-primary" />
                   <span className="font-bold text-2xl tracking-tighter">WorkWise</span>
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
                          <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild>
                          <Link href="/signup">Register</Link>
                      </Button>
                    </>
                  )}
                   {user && (
                      <Button variant="outline" asChild>
                        <Link href="/login">Log Out</Link>
                    </Button>
                   )}
                   <Button variant="outline" className="border-primary text-primary hover:bg-primary/5" asChild>
                      <Link href="/hirer">For Employers <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
