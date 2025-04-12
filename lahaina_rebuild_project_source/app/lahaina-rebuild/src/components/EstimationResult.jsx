import { useState } from 'react';
import { generateEstimate } from '@/lib/ai/estimationModule';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EstimationResult({ blueprintUrl, propertyDetails }) {
  const [estimate, setEstimate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('summary');

  // Function to process the estimate
  const processEstimate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Generate estimate using the AI module
      const result = await generateEstimate(blueprintUrl, propertyDetails);
      setEstimate(result);
    } catch (err) {
      console.error('Error generating estimate:', err);
      setError('Failed to generate estimate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!estimate && !loading && !error && (
        <Card>
          <CardHeader>
            <CardTitle>Generate Estimate</CardTitle>
            <CardDescription>
              Our AI will analyze your blueprint and generate a detailed cost estimate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-6">
              <img 
                src={blueprintUrl} 
                alt="Blueprint Preview" 
                className="max-w-full max-h-64 object-contain border rounded-md"
              />
            </div>
            <div className="mt-4 space-y-2">
              <p><strong>Property Address:</strong> {propertyDetails.address}</p>
              <p><strong>Property Type:</strong> {propertyDetails.propertyType}</p>
              <p><strong>Square Footage:</strong> {propertyDetails.squareFootage} sq ft</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={processEstimate} className="w-full">
              Generate Estimate
            </Button>
          </CardFooter>
        </Card>
      )}

      {loading && (
        <Card>
          <CardHeader>
            <CardTitle>Analyzing Blueprint</CardTitle>
            <CardDescription>
              Our AI is analyzing your blueprint and calculating costs
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500">This may take a few moments...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
            <CardDescription>
              We encountered an issue while generating your estimate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={processEstimate} variant="outline" className="mr-2">
              Try Again
            </Button>
            <Button onClick={() => window.location.reload()}>
              Start Over
            </Button>
          </CardFooter>
        </Card>
      )}

      {estimate && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Electrical Service Estimate</CardTitle>
              <CardDescription>
                Based on your blueprint and property details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center">
                <div>
                  <p className="text-sm text-blue-700">Total Estimated Cost</p>
                  <p className="text-3xl font-bold text-blue-900">{formatCurrency(estimate.totalCost)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-700">Estimate Valid Until</p>
                  <p className="text-lg font-semibold text-blue-900">
                    {new Date(new Date(estimate.estimateDate).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Tabs defaultValue="summary" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="labor">Labor</TabsTrigger>
                  <TabsTrigger value="compliance">Code Compliance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="summary" className="p-4 border rounded-lg mt-4">
                  <h3 className="text-lg font-semibold mb-4">Estimate Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b">
                      <span>Materials</span>
                      <span className="font-medium">{formatCurrency(estimate.materialCosts.total)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Labor</span>
                      <span className="font-medium">{formatCurrency(estimate.laborCosts.total)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span>Permit Fees</span>
                      <span className="font-medium">{formatCurrency(estimate.permitFees)}</span>
                    </div>
                    <div className="flex justify-between py-2 font-bold">
                      <span>Total</span>
                      <span>{formatCurrency(estimate.totalCost)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Detected Components</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {estimate.components.map((component, index) => (
                        <li key={index}>
                          {component.type === 'conduit' 
                            ? `${component.length} feet of conduit` 
                            : `${component.count} ${component.type.replace('_', ' ')}${component.count > 1 ? 's' : ''}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="materials" className="p-4 border rounded-lg mt-4">
                  <h3 className="text-lg font-semibold mb-4">Material Costs</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {estimate.materialCosts.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.unitPrice)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.totalPrice)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50">
                          <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">Subtotal</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(estimate.materialCosts.subtotal)}</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">Regional Cost Adjustment (Lahaina)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(estimate.materialCosts.total - estimate.materialCosts.subtotal)}</td>
                        </tr>
                        <tr className="bg-gray-100">
                          <td colSpan="3" className="px-6 py-4 text-sm font-bold text-gray-900 text-right">Total Materials</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatCurrency(estimate.materialCosts.total)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="labor" className="p-4 border rounded-lg mt-4">
                  <h3 className="text-lg font-semibold mb-4">Labor Costs</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {estimate.laborCosts.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.hours.toFixed(1)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.rate)}/hr</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.totalPrice)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50">
                          <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">Subtotal</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(estimate.laborCosts.subtotal)}</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td colSpan="3" className="px-6 py-4 text-sm font-medium text-gray-900 text-right">Regional Cost Adjustment (Lahaina)</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(estimate.laborCosts.total - estimate.laborCosts.subtotal)}</td>
                        </tr>
                        <tr className="bg-gray-100">
                          <td colSpan="3" className="px-6 py-4 text-sm font-bold text-gray-900 text-right">Total Labor</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">{formatCurrency(estimate.laborCosts.total)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="compliance" className="p-4 border rounded-lg mt-4">
                  <h3 className="text-lg font-semibold mb-4">Code Compliance</h3>
                  
                  {estimate.codeCompliance.compliant ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">Compliant with Maui County Electrical Codes</h3>
                          <div className="mt-2 text-sm text-green-700">
                            <p>Your electrical plan meets all required code specifications.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Code Compliance Issues Detected</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <p>Your electrical plan requires adjustments to meet Maui County codes.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!estimate.codeCompliance.compliant && estimate.codeCompliance.issues.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Issues to Address:</h4>
                      <ul className="space-y-4">
                        {estimate.codeCompliance.issues.map((issue, index) => (
                          <li key={index} className="border-l-4 border-yellow-400 pl-4 py-2">
                            <p className="font-medium">{issue.code}</p>
                            <p className="text-sm text-gray-600 mb-1">{issue.description}</p>
                            <p className="text-sm font-medium text-blue-600">{issue.recommendation}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Maui County Electrical Code References</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                      <li>Based on 2008 National Electrical Code (NEC) with Maui County amendments</li>
                      <li>GFCI protection required in bathrooms, kitchens, and outdoor areas (NEC 210.8)</li>
                      <li>Receptacle spacing requirements (NEC 210.52)</li>
                      <li>Service panel requirements based on home size (NEC 220)</li>
                      <li>Special provisions for rebuilding after 2023 wildfires (Ordinance 5780)</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full sm:w-auto">Save Estimate</Button>
              <Button variant="outline" className="w-full sm:w-auto">Download PDF</Button>
              <Button variant="secondary" className="w-full sm:w-auto">Find Contractors</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Here's how to proceed with your electrical project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">1</div>
                  <h3 className="font-medium mb-2">Review Estimate</h3>
                  <p className="text-sm text-gray-500">Review the detailed breakdown of materials, labor, and code requirements</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">2</div>
                  <h3 className="font-medium mb-2">Select Contractor</h3>
                  <p className="text-sm text-gray-500">Choose from our verified electrical contractors with blockchain-backed ratings</p>
                </div>
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4">3</div>
                  <h3 className="font-medium mb-2">Schedule Work</h3>
                  <p className="text-sm text-gray-500">Coordinate with your selected contractor and track progress through our platform</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
