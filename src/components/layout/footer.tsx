import Link from "next/link";
import { Briefcase, Twitter, Linkedin, Github, Facebook, Instagram } from "lucide-react";
import { Button } from "../ui/button";

const footerLinks = {
    "About us": "/about",
    "Contact us": "/contact",
    "Careers": "/careers",
    "Press": "/press",
}

const helpLinks = {
    "Help center": "/help",
    "Report issue": "/report",
    "Terms & conditions": "/terms",
    "Privacy policy": "/privacy",
}

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto max-w-7xl py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col gap-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <span className="font-bold text-2xl tracking-tighter">WorkWise</span>
                </Link>
                <p className="text-sm text-muted-foreground">Connect with us</p>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></Link>
                    </Button>
                </div>
            </div>
             <div>
                <h4 className="font-semibold mb-4">About</h4>
                <ul className="space-y-2">
                    {Object.entries(footerLinks).map(([label, href]) => (
                        <li key={label}>
                            <Link href={href} className="text-muted-foreground hover:text-primary text-sm">{label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4">Help</h4>
                 <ul className="space-y-2">
                    {Object.entries(helpLinks).map(([label, href]) => (
                        <li key={label}>
                            <Link href={href} className="text-muted-foreground hover:text-primary text-sm">{label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
             <div>
                <h4 className="font-semibold mb-4">For Employers</h4>
                <ul className="space-y-2">
                    <li><Link href="/hirer" className="text-muted-foreground hover:text-primary text-sm">Post a job</Link></li>
                    <li><Link href="#" className="text-muted-foreground hover:text-primary text-sm">Search candidates</Link></li>
                </ul>
            </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} WorkWise. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
