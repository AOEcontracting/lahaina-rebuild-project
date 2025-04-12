"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
              <span className="font-bold text-xl">Lahaina Rebuild</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
            <Link href="/get-estimate" className="transition-colors hover:text-foreground/80">
              Get Estimate
            </Link>
            <Link href="/contractors" className="transition-colors hover:text-foreground/80">
              Find Contractors
            </Link>
            <Link href="/payments" className="transition-colors hover:text-foreground/80">
              Payments
            </Link>
            <Link href="/codes" className="transition-colors hover:text-foreground/80">
              Electrical Codes
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground/80">
              About
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
          </div>
          <div className="md:hidden ml-auto">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Wrap children with AuthProvider */}
        {children}
      </main>
      <footer className="w-full py-6 bg-gray-800 text-gray-300">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link href="/get-estimate" className="hover:text-white">Get Estimate</Link></li>
                <li><Link href="/contractors" className="hover:text-white">Find Contractors</Link></li>
                <li><Link href="/codes" className="hover:text-white">Electrical Codes</Link></li>
                <li><Link href="/payments" className="hover:text-white">Payment Options</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                <li><Link href="/mission" className="hover:text-white">Our Mission</Link></li>
                <li><Link href="/team" className="hover:text-white">Team</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><Link href="https://twitter.com" className="hover:text-white">Twitter</Link></li>
                <li><Link href="https://facebook.com" className="hover:text-white">Facebook</Link></li>
                <li><Link href="https://instagram.com" className="hover:text-white">Instagram</Link></li>
                <li><Link href="https://linkedin.com" className="hover:text-white">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>© 2025 Lahaina Rebuild Project. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
