import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import EstimationResult from '@/components/EstimationResult';

export default function EstimationForm() {
  const [step, setStep] = useState(1);
  const [blueprintFile, setBlueprintFile] = useState(null);
  const [blueprintPreview, setBlueprintPreview] = useState(null);
  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    propertyType: '',
    squareFootage: '',
    hasWetLocations: true,
    blueprintType: ''
  });
  const [showResults, setShowResults] = useState(false);

  // Handle blueprint file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlueprintFile(file);
      
      // Create a preview URL
      const previewUrl = URL.createObjectURL(file);
      setBlueprintPreview(previewUrl);
    }
  };

  // Handle property details form changes
  const handlePropertyDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPropertyDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  // Go to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go to previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Reset the form
  const resetForm = () => {
    setBlueprintFile(null);
    setBlueprintPreview(null);
    setPropertyDetails({
      address: '',
      propertyType: '',
      squareFootage: '',
      hasWetLocations: true,
      blueprintType: ''
    });
    setStep(1);
    setShowResults(false);
  };

  // If showing results, render the EstimationResult component
  if (showResults) {
    return (
      <EstimationResult 
        blueprintUrl={blueprintPreview} 
        propertyDetails={propertyDetails} 
      />
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Get Your Electrical Service Estimate</CardTitle>
          <CardDescription>
            {step === 1 
              ? "Upload your blueprint to get started" 
              : "Provide details about your property"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="blueprint">Blueprint File</Label>
                  {!blueprintPreview ? (
                    <div 
                      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:bg-gray-50"
                      onClick={() => document.getElementById('blueprint').click()}
                    >
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
                      <Input 
                        id="blueprint" 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                      />
                      <Button type="button" className="mt-4" onClick={() => document.getElementById('blueprint').click()}>
                        Select File
                      </Button>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-center mb-4">
                        <img 
                          src={blueprintPreview} 
                          alt="Blueprint Preview" 
                          className="max-w-full max-h-64 object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm truncate max-w-xs">{blueprintFile?.name}</span>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setBlueprintFile(null);
                            setBlueprintPreview(null);
                          }}
                        >
                          Change File
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="blueprintType">Blueprint Type</Label>
                  <select
                    id="blueprintType"
                    name="blueprintType"
                    value={propertyDetails.blueprintType}
                    onChange={handlePropertyDetailsChange}
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
            ) : (
              <div className="space-y-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Property Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={propertyDetails.address}
                    onChange={handlePropertyDetailsChange}
                    placeholder="Enter the property address in Lahaina" 
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={propertyDetails.propertyType}
                    onChange={handlePropertyDetailsChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="mixed-use">Mixed Use</option>
                  </select>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="squareFootage">Square Footage</Label>
                  <Input 
                    id="squareFootage" 
                    name="squareFootage"
                    value={propertyDetails.squareFootage}
                    onChange={handlePropertyDetailsChange}
                    type="number" 
                    placeholder="Enter square footage" 
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="hasWetLocations" 
                    name="hasWetLocations"
                    checked={propertyDetails.hasWetLocations}
                    onChange={handlePropertyDetailsChange}
                    className="rounded" 
                  />
                  <Label htmlFor="hasWetLocations">
                    Property includes wet locations (bathrooms, kitchen, outdoor areas)
                  </Label>
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="specialRequirements">Special Requirements (Optional)</Label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={propertyDetails.specialRequirements || ''}
                    onChange={handlePropertyDetailsChange}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Any special electrical requirements or notes"
                  ></textarea>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
              <Button 
                onClick={nextStep} 
                disabled={!blueprintFile || !propertyDetails.blueprintType}
              >
                Continue to Details
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={prevStep}>Back</Button>
              <Button 
                onClick={handleSubmit}
                disabled={!propertyDetails.address || !propertyDetails.propertyType || !propertyDetails.squareFootage}
              >
                Generate Estimate
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
      
      <div className="mt-12">
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
    </div>
  );
}
