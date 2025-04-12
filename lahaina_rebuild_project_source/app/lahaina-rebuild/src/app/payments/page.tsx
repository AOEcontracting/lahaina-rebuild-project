"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function Payments() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Secure Payment Options</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl">
          Flexible and secure payment options for your Lahaina rebuilding project
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="payment" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payment">Make a Payment</TabsTrigger>
            <TabsTrigger value="setup">Setup Auto Payments</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="payment" className="p-4 border rounded-lg mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Make a Payment</CardTitle>
                <CardDescription>
                  Pay for your electrical services securely
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="project">Select Project</Label>
                    <select
                      id="project"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select your project</option>
                      <option value="project1">123 Aloha Street Rebuild</option>
                      <option value="project2">456 Lahaina Avenue Renovation</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="payment-amount">Payment Amount ($)</Label>
                    <Input id="payment-amount" type="number" placeholder="Enter amount" />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 flex flex-col items-center">
                        <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <span className="text-sm">Credit Card</span>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 flex flex-col items-center">
                        <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                        </svg>
                        <span className="text-sm">Bank Transfer</span>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 flex flex-col items-center">
                        <svg className="w-8 h-8 text-blue-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                        <span className="text-sm">Crypto</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5 mt-4">
                    <Label htmlFor="payment-notes">Notes (Optional)</Label>
                    <textarea
                      id="payment-notes"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Add any notes about this payment"
                    ></textarea>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Proceed to Payment</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="setup" className="p-4 border rounded-lg mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Setup Automatic Payments</CardTitle>
                <CardDescription>
                  Configure recurring payments for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="auto-project">Select Project</Label>
                    <select
                      id="auto-project"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select your project</option>
                      <option value="project1">123 Aloha Street Rebuild</option>
                      <option value="project2">456 Lahaina Avenue Renovation</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="payment-schedule">Payment Schedule</Label>
                    <select
                      id="payment-schedule"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select payment frequency</option>
                      <option value="weekly">Weekly</option>
                      <option value="biweekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="milestone">Project Milestones</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="auto-amount">Payment Amount ($)</Label>
                    <Input id="auto-amount" type="number" placeholder="Enter amount" />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 flex items-center">
                        <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <span>Credit Card</span>
                      </div>
                      <div className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 flex items-center">
                        <svg className="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                        </svg>
                        <span>Bank Account</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Setup Auto Payments</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="p-4 border rounded-lg mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  View your payment history and transaction records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-5 bg-gray-100 p-3 text-sm font-medium">
                    <div>Date</div>
                    <div>Project</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Transaction ID</div>
                  </div>
                  <div className="grid grid-cols-5 p-3 text-sm border-t">
                    <div>04/10/2025</div>
                    <div>123 Aloha Street</div>
                    <div>$2,500.00</div>
                    <div><span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Completed</span></div>
                    <div className="text-xs text-gray-500">0x8f7d...3e9b</div>
                  </div>
                  <div className="grid grid-cols-5 p-3 text-sm border-t bg-gray-50">
                    <div>03/25/2025</div>
                    <div>123 Aloha Street</div>
                    <div>$1,750.00</div>
                    <div><span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Completed</span></div>
                    <div className="text-xs text-gray-500">0x3a2c...7f1d</div>
                  </div>
                  <div className="grid grid-cols-5 p-3 text-sm border-t">
                    <div>03/01/2025</div>
                    <div>123 Aloha Street</div>
                    <div>$3,200.00</div>
                    <div><span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Completed</span></div>
                    <div className="text-xs text-gray-500">0x6e9b...2c4a</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>All transactions are recorded on the blockchain for transparency and security.</p>
                  <p className="mt-2">
                    <Link href="/blockchain-verification" className="text-blue-600 hover:underline">
                      Verify transactions on blockchain explorer
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Secure Payment Processing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <svg className="w-10 h-10 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <h3 className="font-bold mb-2">Secure Transactions</h3>
            <p className="text-gray-500">All payment information is encrypted and processed securely through our payment partners</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <svg className="w-10 h-10 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <h3 className="font-bold mb-2">Transparent Records</h3>
            <p className="text-gray-500">All transactions are recorded on the blockchain for complete transparency and verification</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <svg className="w-10 h-10 text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <h3 className="font-bold mb-2">Multiple Payment Options</h3>
            <p className="text-gray-500">Choose from credit card, bank transfer, or cryptocurrency payment methods</p>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto bg-blue-50 p-8 rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-4">Need Help With Payments?</h2>
            <p className="text-gray-600 mb-4">
              Our team is available to assist you with payment options, financing, and insurance claims for your rebuilding project.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Our Financial Team</Link>
            </Button>
          </div>
          <div className="md:w-1/3">
            <svg className="w-full h-auto text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
