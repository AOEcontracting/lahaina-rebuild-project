"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ContractorSignup() {
  const [formData, setFormData] = useState({
    companyName: '',
    ownerName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    licenseNumber: '',
    serviceType: 'electrical',
    yearsInBusiness: '',
    description: '',
    acceptTerms: false
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.companyName.trim()) errors.companyName = "Company name is required";
    if (!formData.ownerName.trim()) errors.ownerName = "Owner name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.licenseNumber.trim()) errors.licenseNumber = "License number is required";
    if (!formData.serviceType) errors.serviceType = "Service type is required";
    if (!formData.acceptTerms) errors.acceptTerms = "You must accept the terms and conditions";
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // In a real application, this would be an API call to register the contractor
      console.log("Contractor registration data:", formData);
    }, 1500);
  };
  
  if (submitSuccess) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-green-600">Registration Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <p className="text-lg mb-6">
              Thank you for registering as a contractor with the Lahaina Rebuild Project! Your application has been submitted successfully.
            </p>
            <p className="mb-6">
              Our team will review your information and verify your credentials. You will receive an email confirmation once your profile is approved and listed in our contractor directory.
            </p>
            <div className="flex justify-center space-x-4">
              <Button asChild>
                <Link href="/">Return to Homepage</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contractors">View Contractor Directory</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center space-y-6 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contractor Registration</h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl">
          Join our network of verified contractors to help rebuild Lahaina
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contractor Information</CardTitle>
              <CardDescription>
                Please provide your business details to register as a contractor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="companyName">Company Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="companyName" 
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={formErrors.companyName ? "border-red-500" : ""}
                    />
                    {formErrors.companyName && <p className="text-red-500 text-sm">{formErrors.companyName}</p>}
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="ownerName">Owner Name <span className="text-red-500">*</span></Label>
                    <Input 
                      id="ownerName" 
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      className={formErrors.ownerName ? "border-red-500" : ""}
                    />
                    {formErrors.ownerName && <p className="text-red-500 text-sm">{formErrors.ownerName}</p>}
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input 
                      id="website" 
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="address">Business Address</Label>
                    <Input 
                      id="address" 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="licenseNumber">License Number <span className="text-red-500">*</span></Label>
                    <Input 
                      id="licenseNumber" 
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className={formErrors.licenseNumber ? "border-red-500" : ""}
                    />
                    {formErrors.licenseNumber && <p className="text-red-500 text-sm">{formErrors.licenseNumber}</p>}
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="serviceType">Service Type <span className="text-red-500">*</span></Label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${formErrors.serviceType ? "border-red-500" : ""}`}
                    >
                      <option value="electrical">Electrical</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="carpentry">Carpentry</option>
                      <option value="roofing">Roofing</option>
                      <option value="hvac">HVAC</option>
                      <option value="painting">Painting</option>
                      <option value="landscaping">Landscaping</option>
                      <option value="other">Other</option>
                    </select>
                    {formErrors.serviceType && <p className="text-red-500 text-sm">{formErrors.serviceType}</p>}
                  </div>
                  
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="yearsInBusiness">Years in Business</Label>
                    <Input 
                      id="yearsInBusiness" 
                      name="yearsInBusiness"
                      type="number"
                      value={formData.yearsInBusiness}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-1.5 md:col-span-2">
                    <Label htmlFor="description">Business Description</Label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your business, specialties, and experience..."
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id="acceptTerms" 
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className={`rounded ${formErrors.acceptTerms ? "border-red-500" : ""}`} 
                      />
                      <Label htmlFor="acceptTerms" className={formErrors.acceptTerms ? "text-red-500" : ""}>
                        I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                    {formErrors.acceptTerms && <p className="text-red-500 text-sm mt-1">{formErrors.acceptTerms}</p>}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Register as Contractor"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Why Join Our Network?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Blockchain Verification</h3>
                  <p className="text-sm text-gray-500">Build trust with clients through our transparent blockchain rating system</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Secure Payments</h3>
                  <p className="text-sm text-gray-500">Receive payments securely through our integrated payment system</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Job Notifications</h3>
                  <p className="text-sm text-gray-500">Receive alerts for new projects matching your services</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Performance Rewards</h3>
                  <p className="text-sm text-gray-500">Higher ratings lead to more job opportunities and visibility</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Code Compliance</h3>
                  <p className="text-sm text-gray-500">Access to latest Maui County electrical codes and regulations</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="bg-blue-50 p-4 rounded-lg w-full">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> All contractors must be licensed and insured to join our network. Verification process typically takes 1-2 business days.
                </p>
              </div>
            </CardFooter>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Already Registered?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  If you've already registered as a contractor, you can log in to manage your profile and view job opportunities.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Log In</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
