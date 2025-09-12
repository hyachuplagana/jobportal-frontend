import HirerDashboard from "./hirer-dashboard";

export default function DashboardPage() {
  return (
    <div className="bg-background min-h-full">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">Hirer Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your job postings and applicants all in one place.
                </p>
            </header>
            <HirerDashboard />
        </div>
    </div>
  );
}
