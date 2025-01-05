import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="/">
          <span className="font-bold text-2xl">PesaView</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/mchango/eliakim-nyawinda">
            View Transactions
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to PesaView
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Track your contributions and transactions with ease. Get a clear view of your financial activities.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/transactions">
                  <Button>View Transactions</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Real-time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Monitor your transactions as they happen. Stay up-to-date with your financial activities.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Get comprehensive reports and insights about your transactions and contributions.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Secure & Reliable</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Your data is safe with us. We use industry-standard security measures to protect your information.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">About PesaView</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 text-center">
              PesaView is a powerful transaction tracking tool designed to help you manage your contributions and financial activities. 
              Whether you're tracking personal expenses or managing group contributions, PesaView provides the clarity and insights you need.
            </p>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 PesaView. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

