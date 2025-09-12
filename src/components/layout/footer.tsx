import Link from "next/link";
import { Briefcase, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto max-w-7xl py-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold font-headline text-lg">
                <Briefcase className="h-6 w-6 text-primary" />
                <span>WorkWise</span>
            </Link>
            <p className="text-sm text-muted-foreground">Your partner in career growth.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
            </div>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} WorkWise. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
