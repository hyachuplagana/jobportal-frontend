
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-2xl text-center py-20">
      <h1 className="text-4xl font-bold">Job Not Found</h1>
      <p className="text-muted-foreground mt-4">We couldn't find the job posting you were looking for.</p>
      <Button asChild className="mt-8">
        <Link href="/jobs">Back to All Jobs</Link>
      </Button>
    </div>
  )
}
