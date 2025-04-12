import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency } from '@/lib/payments/paymentProcessor';
import PaymentPlans from '@/components/PaymentPlans';
import PaymentForm from '@/components/PaymentForm';

export default function PaymentDashboard({ userId }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Mock data for development
  useEffect(() => {
    // Simulate payment history
    setPaymentHistory([
      {
        id: 'pay_123456',
        date: '2025-03-15T10:30:00Z',
        amount: 15000, // $150.00
        description: 'Electrical Inspection Service',
        status: 'completed'
      },
      {
        id: 'pay_123457',
        date: '2025-02-20T14:45:00Z',
        amount: 35000, // $350.00
        description: 'Outlet Installation (6 units)',
        status: 'completed'
      },
      {
        id: 'pay_123458',
        date: '2025-01-10T09:15:00Z',
        amount: 12500, // $125.00
        description: 'Emergency Service Call',
        status: 'completed'
      }
    ]);

    // Simulate upcoming payments
    setUpcomingPayments([
      {
        id: 'sub_123456',
        date: '2025-05-01T00:00:00Z',
        amount: 9900, // $99.00
        description: 'Monthly Maintenance Plan',
        type: 'subscription'
      }
    ]);
  }, []);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle payment for service
  const handlePayForService = (service) => {
    setSelectedService(service);
    setShowPaymentForm(true);
  };

  // Handle payment success
  const handlePaymentSuccess = (paymentDetails) => {
    // Add to payment history
    setPaymentHistory(prev => [
      {
        id: paymentDetails.id,
        date: paymentDetails.date,
        amount: paymentDetails.amount,
        description: paymentDetails.description,
        status: 'completed'
      },
      ...prev
    ]);

    // Reset selected service and hide payment form
    setSelectedService(null);
    setShowPaymentForm(false);
  };

  // Available services to pay for
  const availableServices = [
    {
      id: 'service_inspection',
      name: 'Electrical Inspection',
      description: 'Comprehensive inspection of your electrical system',
      amount: 15000 // $150.00
    },
    {
      id: 'service_repair',
      name: 'Electrical Repair',
      description: 'General electrical repair service',
      amount: 25000 // $250.00
    },
    {
      id: 'service_installation',
      name: 'New Installation',
      description: 'Installation of new electrical components',
      amount: 35000 // $350.00
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {showPaymentForm ? (
        <div>
          <Button 
            variant="outline" 
            className="mb-4"
            onClick={() => setShowPaymentForm(false)}
          >
            ← Back to Dashboard
          </Button>
          <PaymentForm 
            amount={selectedService.amount}
            description={selectedService.name}
            serviceId={selectedService.id}
            onPaymentSuccess={handlePaymentSuccess}
          />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Payment Dashboard</CardTitle>
            <CardDescription>
              Manage your payments and subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">Payment History</TabsTrigger>
                <TabsTrigger value="services">Pay for Services</TabsTrigger>
                <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="p-4 border rounded-lg mt-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Payment Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total Spent (2025)</span>
                            <span className="font-medium">{formatCurrency(62500)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Last Payment</span>
                            <span className="font-medium">{formatCurrency(15000)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Next Payment Due</span>
                            <span className="font-medium">{formatCurrency(9900)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Active Subscriptions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {upcomingPayments.length > 0 ? (
                          <div className="space-y-4">
                            {upcomingPayments.map(payment => (
                              <div key={payment.id} className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">{payment.description}</p>
                                  <p className="text-sm text-gray-500">Next payment: {formatDate(payment.date)}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{formatCurrency(payment.amount)}</p>
                                  <p className="text-sm text-gray-500">Monthly</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-gray-500">
                            No active subscriptions
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Recent Transactions</h3>
                    {paymentHistory.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {paymentHistory.slice(0, 3).map(payment => (
                              <tr key={payment.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(payment.date)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(payment.amount)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {payment.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No recent transactions
                      </div>
                    )}
                    
                    {paymentHistory.length > 3 && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" size="sm" onClick={() => setActiveTab('history')}>
                          View All Transactions
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="p-4 border rounded-lg mt-4">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Payment History</h3>
                  
                  {paymentHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {paymentHistory.map(payment => (
                            <tr key={payment.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(payment.date)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.id}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{payment.description}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(payment.amount)}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {payment.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No payment history available
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="p-4 border rounded-lg mt-4">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Pay for Services</h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {availableServices.map(service => (
                      <Card key={service.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{service.name}</CardTitle>
                          <CardDescription>{service.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-2xl font-bold">{formatCurrency(service.amount)}</p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className="w-full"
                            onClick={() => handlePayForService(service)}
                          >
                            Pay Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="font-medium mb-2">Custom Service Request</h4>
                    <p className="text-gray-600 mb-4">
                      Need a service not listed here? Submit a custom request and we'll provide a personalized quote.
                    </p>
                    <Button variant="outline">Request Custom Quote</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="plans" className="p-4 border rounded-lg mt-4">
                <PaymentPlans />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
