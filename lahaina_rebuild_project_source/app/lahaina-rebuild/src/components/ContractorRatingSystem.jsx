import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { getTopContractors } from '@/lib/blockchain/ratingSystem';
import ContractorRatingCard from '@/components/ContractorRatingCard';
import SubmitRatingForm from '@/components/SubmitRatingForm';
import Link from 'next/link';

export default function ContractorRatingSystem({ clientId }) {
  const [topContractors, setTopContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [activeTab, setActiveTab] = useState('top-rated');

  useEffect(() => {
    async function fetchTopContractors() {
      try {
        setLoading(true);
        
        // Fetch top contractors from blockchain
        const contractors = await getTopContractors(5);
        setTopContractors(contractors);
      } catch (err) {
        console.error('Error fetching top contractors:', err);
        setError('Failed to load contractor data from blockchain');
      } finally {
        setLoading(false);
      }
    }
    
    fetchTopContractors();
  }, []);

  // Handle contractor selection for rating
  const handleSelectContractor = (contractor) => {
    setSelectedContractor(contractor);
    setActiveTab('submit-rating');
  };

  // Handle rating submission completion
  const handleRatingSubmitted = () => {
    // Refresh top contractors list
    getTopContractors(5).then(contractors => {
      setTopContractors(contractors);
    }).catch(err => {
      console.error('Error refreshing top contractors:', err);
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Blockchain-Verified Contractor Ratings</CardTitle>
          <CardDescription>
            All ratings are permanently recorded on the blockchain for transparency and trust
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="top-rated" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="top-rated">Top Rated Contractors</TabsTrigger>
              <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
              <TabsTrigger value="submit-rating">Submit a Rating</TabsTrigger>
            </TabsList>
            
            <TabsContent value="top-rated" className="p-4 border rounded-lg mt-4">
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 py-8 text-center">{error}</div>
              ) : (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Top Rated Electrical Contractors in Lahaina</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {topContractors.map((contractor) => (
                      <div key={contractor.contractorId} className="flex flex-col">
                        <ContractorRatingCard 
                          contractorId={contractor.contractorId}
                          contractorName={contractor.name}
                          company={contractor.company}
                        />
                        <Button 
                          className="mt-2" 
                          variant="outline"
                          onClick={() => handleSelectContractor(contractor)}
                        >
                          Rate This Contractor
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button asChild>
                      <Link href="/contractors">View All Contractors</Link>
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="how-it-works" className="p-4 border rounded-lg mt-4">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">How Our Blockchain Rating System Works</h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">1</div>
                    <h4 className="font-bold mb-2">Immutable Ratings</h4>
                    <p className="text-gray-500">All contractor ratings are permanently recorded on the Ethereum blockchain, making them tamper-proof and transparent</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">2</div>
                    <h4 className="font-bold mb-2">Verified Reviews</h4>
                    <p className="text-gray-500">Only clients who have completed projects with a contractor can submit ratings, ensuring all reviews are legitimate</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">3</div>
                    <h4 className="font-bold mb-2">Reward System</h4>
                    <p className="text-gray-500">Higher-rated contractors receive more work opportunities through our smart contract allocation system</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg mt-8">
                  <h4 className="font-bold mb-2">Technical Implementation</h4>
                  <p className="text-gray-600 mb-4">
                    Our rating system uses Ethereum smart contracts to store and retrieve contractor ratings. Each rating submission creates a blockchain transaction that includes the client's address, contractor's address, rating value, and review comment. This creates a permanent, public record that cannot be altered or deleted.
                  </p>
                  <p className="text-gray-600">
                    Smart contracts also handle the calculation of average ratings and the allocation of work opportunities based on contractor performance. All transactions can be verified on the Ethereum blockchain explorer.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="submit-rating" className="p-4 border rounded-lg mt-4">
              {selectedContractor ? (
                <SubmitRatingForm 
                  contractorId={selectedContractor.contractorId}
                  contractorName={selectedContractor.name}
                  projectId="project_123" // This would be dynamic in production
                  clientId={clientId || "client_123"} // This would be the actual client ID in production
                  onRatingSubmitted={handleRatingSubmitted}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Please select a contractor to rate from the Top Rated Contractors tab</p>
                  <Button onClick={() => setActiveTab('top-rated')}>
                    View Contractors
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t">
          <div className="w-full text-center text-sm text-gray-500">
            <p>
              All ratings and reviews are stored on the Ethereum blockchain and cannot be altered or removed.
              <br />
              <Link href="/blockchain-verification" className="text-blue-600 hover:underline">
                Learn more about our blockchain verification process
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
