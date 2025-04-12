import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, getPaymentPlans } from '@/lib/payments/paymentProcessor';
import { CheckIcon } from "lucide-react";

export default function PaymentPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    async function fetchPaymentPlans() {
      try {
        setLoading(true);
        
        // Fetch payment plans
        const paymentPlans = await getPaymentPlans();
        setPlans(paymentPlans);
      } catch (err) {
        console.error('Error fetching payment plans:', err);
        setError('Failed to load payment plans');
      } finally {
        setLoading(false);
      }
    }
    
    fetchPaymentPlans();
  }, []);

  // Handle plan selection
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Payment Plans</CardTitle>
          <CardDescription>
            Choose a payment plan that works for your electrical service needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 py-8 text-center">{error}</div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`border-2 ${selectedPlan?.id === plan.id ? 'border-blue-500' : 'border-gray-200'}`}
                >
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {plan.type === 'subscription' && (
                      <div className="mb-4">
                        <p className="text-3xl font-bold">
                          {formatCurrency(plan.amount)}
                          <span className="text-sm font-normal text-gray-500">
                            /{plan.interval}
                          </span>
                        </p>
                      </div>
                    )}
                    
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      variant={selectedPlan?.id === plan.id ? "default" : "outline"}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {selectedPlan && (
            <div className="mt-8 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">
                {selectedPlan.type === 'subscription' 
                  ? 'Set Up Your Subscription' 
                  : 'Proceed with Standard Plan'}
              </h3>
              
              {selectedPlan.type === 'subscription' ? (
                <div>
                  <p className="mb-4">
                    You've selected the <strong>{selectedPlan.name}</strong> at {formatCurrency(selectedPlan.amount)} per {selectedPlan.interval}.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button>Set Up Automatic Payments</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-4">
                    With the <strong>{selectedPlan.name}</strong>, you'll pay only for the services you need, when you need them.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button>Continue to Services</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
        
        <Tabs defaultValue="methods">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="methods" className="p-4 border rounded-lg mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Accepted Payment Methods</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border rounded p-4 flex flex-col items-center">
                  <svg className="h-8 w-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                  <span>Credit Card</span>
                </div>
                <div className="border rounded p-4 flex flex-col items-center">
                  <svg className="h-8 w-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                  <span>Debit Card</span>
                </div>
                <div className="border rounded p-4 flex flex-col items-center">
                  <svg className="h-8 w-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>Bank Transfer</span>
                </div>
                <div className="border rounded p-4 flex flex-col items-center">
                  <svg className="h-8 w-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 17l3-3 3 3" />
                    <path d="M12 14V4" />
                    <path d="M20 21H4" />
                  </svg>
                  <span>Digital Wallet</span>
                </div>
              </div>
              
              <p className="text-gray-600 mt-4">
                All payments are processed securely through Stripe. Your payment information is never stored on our servers.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="security" className="p-4 border rounded-lg mt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Security</h3>
              
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Secure Payment Processing</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>All payments are processed using industry-standard encryption and security protocols.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600">
                We use Stripe, a PCI-DSS Level 1 certified payment processor, to handle all transactions. Your payment information is encrypted using TLS technology and never stored on our servers.
              </p>
              
              <h4 className="font-medium mt-4">Our Security Measures:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>256-bit TLS encryption for all transactions</li>
                <li>PCI-DSS compliance for handling card information</li>
                <li>Fraud detection and prevention systems</li>
                <li>Regular security audits and testing</li>
                <li>No storage of sensitive payment details on our servers</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="faq" className="p-4 border rounded-lg mt-4">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">How do automatic payments work?</h4>
                  <p className="text-gray-600">
                    When you set up automatic payments, we securely store your payment method with our payment processor. On your billing date, we automatically charge your preferred payment method for the subscription amount.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Can I cancel my subscription?</h4>
                  <p className="text-gray-600">
                    Yes, you can cancel your subscription at any time from your account dashboard. If you cancel, you'll continue to have access to your subscription benefits until the end of your current billing period.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">What happens if a payment fails?</h4>
                  <p className="text-gray-600">
                    If a payment fails, we'll automatically retry the charge after 3 days. We'll also notify you by email so you can update your payment information if needed.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Are there any hidden fees?</h4>
                  <p className="text-gray-600">
                    No, the price you see is the price you pay. There are no hidden fees or charges. For subscription plans, you'll be billed the advertised amount on a recurring basis until you cancel.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">How do I get a receipt for my payment?</h4>
                  <p className="text-gray-600">
                    A receipt is automatically emailed to you after each payment. You can also view and download all your payment receipts from your account dashboard.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
