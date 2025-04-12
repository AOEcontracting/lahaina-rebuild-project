"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function GetEstimate() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get Your Electrical Service Estimate</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl">
          Upload your blueprints and get an AI-powered estimate for electrical services based on local Maui material costs
        </p>
      </div>

      <Tabs defaultValue="upload" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Blueprint</TabsTrigger>
          <TabsTrigger value="details">Project Details</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="p-4 border rounded-lg mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Blueprint</CardTitle>
              <CardDescription>
                Upload your home blueprint or electrical plan to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="blueprint">Blueprint File</Label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:bg-gray-50">
                    <svg
                      className="w-8 h-8 text-gray-400 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="text-sm text-gray-500 mb-1">Drag and drop your blueprint file here</p>
                    <p className="text-xs text-gray-400">Supports PDF, JPG, PNG (max 20MB)</p>
                    <Input id="blueprint" type="file" className="hidden" />
                    <Button className="mt-4">Select File</Button>
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="blueprint-type">Blueprint Type</Label>
                  <select
                    id="blueprint-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select blueprint type</option>
                    <option value="new-construction">New Construction</option>
                    <option value="renovation">Renovation</option>
                    <option value="addition">Addition</option>
                    <option value="rebuild">Rebuild After Disaster</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Continue to Details</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="details" className="p-4 border rounded-lg mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Provide additional details about your electrical service needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="property-address">Property Address</Label>
                  <Input id="property-address" placeholder="Enter the property address in Lahaina" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="property-type">Property Type</Label>
                  <select
                    id="property-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="mixed-use">Mixed Use</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="square-footage">Square Footage</Label>
                  <Input id="square-footage" type="number" placeholder="Enter square footage" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="special-requirements">Special Requirements</Label>
                  <textarea
                    id="special-requirements"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Any special electrical requirements or notes"
                  ></textarea>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Back</Button>
              <Button>Generate Estimate</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">How Our AI Estimation Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">1</div>
            <h3 className="font-bold mb-2">Blueprint Analysis</h3>
            <p className="text-gray-500">Our AI analyzes your blueprint to identify electrical components and requirements</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">2</div>
            <h3 className="font-bold mb-2">Code Compliance</h3>
            <p className="text-gray-500">We ensure all estimates comply with Maui County electrical codes and regulations</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">3</div>
            <h3 className="font-bold mb-2">Local Pricing</h3>
            <p className="text-gray-500">Material costs are calculated based on current Lahaina market prices</p>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto bg-blue-50 p-8 rounded-lg">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-4">Need Help With Your Blueprint?</h2>
            <p className="text-gray-600 mb-4">
              Don't have a blueprint? Our team can help you create one or work with your existing plans.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Our Team</Link>
            </Button>
          </div>
          <div className="md:w-1/3">
            <svg
              className="w-full h-auto text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
