"use client";
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/lib/auth/authProvider';
import Link from 'next/link';

export default function UserDashboard() {
  const { user, logout } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user && typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user.name}</CardTitle>
          <CardDescription>
            Your Lahaina Rebuild Project Dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Account Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p>{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Type</p>
                  <p className="capitalize">{user.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Electrical Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Get Electrical Estimate</h4>
                      <p className="text-sm text-gray-500">Upload blueprints and get AI-powered cost estimates</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Find Contractors</h4>
                      <p className="text-sm text-gray-500">Browse blockchain-verified electrical contractors</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Schedule Service</h4>
                      <p className="text-sm text-gray-500">Book electrical services for your property</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">My Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {user.role === 'client' ? (
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4 py-1">
                        <p className="font-medium">Estimate Requested</p>
                        <p className="text-sm text-gray-500">Apr 10, 2025</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4 py-1">
                        <p className="font-medium">Payment Completed</p>
                        <p className="text-sm text-gray-500">Apr 8, 2025</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4 py-1">
                        <p className="font-medium">Contractor Rated</p>
                        <p className="text-sm text-gray-500">Apr 5, 2025</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4 py-1">
                        <p className="font-medium">New Job Assigned</p>
                        <p className="text-sm text-gray-500">Apr 11, 2025</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4 py-1">
                        <p className="font-medium">Payment Received</p>
                        <p className="text-sm text-gray-500">Apr 9, 2025</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4 py-1">
                        <p className="font-medium">New Review</p>
                        <p className="text-sm text-gray-500">Apr 7, 2025</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Estimates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-3xl font-bold text-blue-600">2</p>
                    <p className="text-sm text-gray-500">Active Estimates</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Estimates</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-3xl font-bold text-green-600">$625</p>
                    <p className="text-sm text-gray-500">Total Spent</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Payments</Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <p className="text-3xl font-bold text-purple-600">3</p>
                    <p className="text-sm text-gray-500">Submitted Reviews</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Reviews</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={logout}>Log Out</Button>
          <Button asChild>
            <Link href="/profile">Edit Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
