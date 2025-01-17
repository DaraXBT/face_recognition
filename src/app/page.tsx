import Dashboard from '@/components/Dashboard'
import ThemeToggle from '@/components/ThemeToggle'

export default function Home() {
  return (
    <main className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Student Attendance Face Recognition</h1>
        <ThemeToggle />
      </div>
      <Dashboard />
    </main>
  )
}

