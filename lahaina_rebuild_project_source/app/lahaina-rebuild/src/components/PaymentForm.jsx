import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createPaymentIntent, formatCurrency, getStripe } from '@/lib/payments/paymentProcessor';

export default function PaymentForm({ amount, description, serviceId, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle payment submission
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!cardDetails.name || !cardDetails.email) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Create payment intent
      const paymentIntent = await createPaymentIntent(
        amount,
        'usd',
        {
          serviceId,
          description
        }
      );
      
      // Initialize Stripe
      const stripe = await getStripe();
      
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        clientSecret: paymentIntent.clientSecret
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // In development, simulate successful payment
      if (process.env.NODE_ENV === 'development') {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        setPaymentSuccess(true);
        
        // Notify parent component
        if (onPaymentSuccess) {
          onPaymentSuccess({
            id: paymentIntent.id,
            amount,
            description,
            date: new Date().toISOString()
          });
        }
      }
    } catch (err) {
      console.error('Error processing payment:', err);
      setError('Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If payment was successful, show success message
  if (paymentSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Successful</CardTitle>
          <CardDescription>
            Your payment has been processed successfully
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">Payment Complete</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Thank you for your payment of {formatCurrency(amount)}.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-medium">{formatCurrency(amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="font-medium">Credit Card</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID:</span>
              <span className="font-medium text-xs">{`txn_${Math.random().toString(36).substring(2, 15)}`}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Make Another Payment
          </Button>
          <Button>
            View Receipt
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Complete your payment for {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmitPayment}>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Amount:</span>
                <span className="text-xl font-bold">{formatCurrency(amount)}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="paymentMethod" className="block text-sm font-medium mb-2">Payment Method</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <input 
                      type="radio" 
                      id="card" 
                      name="paymentMethod" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')} 
                      className="mr-2"
                    />
                    <label htmlFor="card" className="flex items-center cursor-pointer">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                      Credit/Debit Card
                    </label>
                  </div>
                  <div 
                    className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setPaymentMethod('bank')}
                  >
                    <input 
                      type="radio" 
                      id="bank" 
                      name="paymentMethod" 
                      checked={paymentMethod === 'bank'} 
                      onChange={() => setPaymentMethod('bank')} 
                      className="mr-2"
                    />
                    <label htmlFor="bank" className="flex items-center cursor-pointer">
                      <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
                      </svg>
                      Bank Transfer
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={cardDetails.name}
                    onChange={handleInputChange}
                    placeholder="Enter cardholder name" 
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email"
                    value={cardDetails.email}
                    onChange={handleInputChange}
                    placeholder="Enter email for receipt" 
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Billing Address</Label>
                  <Input 
                    id="address" 
                    name="address"
                    value={cardDetails.address}
                    onChange={handleInputChange}
                    placeholder="Enter billing address" 
                  />
                </div>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button 
          onClick={handleSubmitPayment}
          disabled={loading || !cardDetails.name || !cardDetails.email}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : (
            `Pay ${formatCurrency(amount)}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
