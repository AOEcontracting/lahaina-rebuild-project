"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Enhanced Hero Section */}
      <section className="hero">
        <div className="hero-pattern"></div>
        <div className="container mx-auto hero-content">
          <div className="max-w-3xl mx-auto text-center slide-in">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Rebuilding Lahaina Together
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
              AI-powered electrical services and blockchain-verified contractors for your rebuilding project
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="btn-primary text-lg py-6 px-8">
                <Link href="/get-estimate">Get Your Estimate</Link>
              </Button>
              <Button asChild variant="outline" className="bg-white text-blue-600 hover:bg-blue-50 border-white text-lg py-6 px-8">
                <Link href="/contractors">Find Contractors</Link>
              </Button>
            </div>
          </div>
        </div>
        <svg className="w-full h-16 text-background fill-current" viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"></path>
        </svg>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              How We're Helping Rebuild Lahaina
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our innovative platform combines AI technology and blockchain verification to streamline your electrical rebuilding projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card fade-in" style={{animationDelay: "0.1s"}}>
              <div className="feature-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Estimates</h3>
              <p className="text-gray-600 mb-4">
                Upload your blueprints and get accurate cost estimates based on local Maui material prices and electrical codes
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/get-estimate">Get Your Estimate</Link>
              </Button>
            </div>
            
            <div className="feature-card fade-in" style={{animationDelay: "0.2s"}}>
              <div className="feature-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Blockchain Verification</h3>
              <p className="text-gray-600 mb-4">
                Find trusted contractors with blockchain-verified ratings and reviews that cannot be tampered with
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contractors">Find Contractors</Link>
              </Button>
            </div>
            
            <div className="feature-card fade-in" style={{animationDelay: "0.3s"}}>
              <div className="feature-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
              <p className="text-gray-600 mb-4">
                Pay for services securely with multiple payment options and automatic payment scheduling
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link href="/payments">Payment Options</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes rebuilding your electrical systems simple and efficient
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center fade-in" style={{animationDelay: "0.1s"}}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-3">Upload Blueprints</h3>
              <p className="text-gray-600">
                Upload your home blueprints or electrical plans to our secure platform
              </p>
            </div>
            
            <div className="text-center fade-in" style={{animationDelay: "0.2s"}}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-3">Get AI Estimate</h3>
              <p className="text-gray-600">
                Our AI analyzes your plans and provides accurate cost estimates based on local prices
              </p>
            </div>
            
            <div className="text-center fade-in" style={{animationDelay: "0.3s"}}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-3">Choose Contractor</h3>
              <p className="text-gray-600">
                Select from blockchain-verified contractors with transparent ratings and reviews
              </p>
            </div>
            
            <div className="text-center fade-in" style={{animationDelay: "0.4s"}}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold mb-3">Secure Payment</h3>
              <p className="text-gray-600">
                Pay securely through our platform with multiple payment options
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild className="btn-primary">
              <Link href="/get-started">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from property owners and contractors who have used our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="testimonial fade-in" style={{animationDelay: "0.1s"}}>
              <CardContent className="pt-6 relative">
                <div className="testimonial-quote">"</div>
                <p className="text-gray-600 mb-4 relative z-10">
                  The AI estimation tool saved me thousands of dollars by providing accurate material costs. The blockchain verification gave me confidence in choosing the right contractor.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    <span className="font-bold">KL</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Keoni Lau</h4>
                    <p className="text-sm text-gray-500">Lahaina Homeowner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="testimonial fade-in" style={{animationDelay: "0.2s"}}>
              <CardContent className="pt-6 relative">
                <div className="testimonial-quote">"</div>
                <p className="text-gray-600 mb-4 relative z-10">
                  As a contractor, the blockchain rating system has helped me build trust with new clients. The transparent review process ensures my quality work speaks for itself.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    <span className="font-bold">MK</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Mike Kapule</h4>
                    <p className="text-sm text-gray-500">Electrical Contractor</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="testimonial fade-in" style={{animationDelay: "0.3s"}}>
              <CardContent className="pt-6 relative">
                <div className="testimonial-quote">"</div>
                <p className="text-gray-600 mb-4 relative z-10">
                  The code compliance feature ensured all electrical work met Maui County regulations. The payment system made it easy to schedule payments as the project progressed.
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                    <span className="font-bold">SN</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Nakamura</h4>
                    <p className="text-sm text-gray-500">Business Owner</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Ready to Rebuild Lahaina?
            </h2>
            <p className="text-xl mb-8">
              Join our community of homeowners and contractors working together to rebuild Lahaina after the 2023 wildfires.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-white text-blue-600 hover:bg-blue-50 text-lg py-6 px-8">
                <Link href="/register">Create Your Account</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-blue-700 text-lg py-6 px-8">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
