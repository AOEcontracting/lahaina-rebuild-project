"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { verifyTransaction } from '@/lib/blockchain/ratingSystem';

export default function BlockchainVerification() {
  const [transactionHash, setTransactionHash] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle transaction hash input
  const handleTransactionHashChange = (e) => {
    setTransactionHash(e.target.value);
  };

  // Handle verification
  const handleVerify = async () => {
    if (!transactionHash) {
      setError('Please enter a transaction hash');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Verify transaction on blockchain
      const result = await verifyTransaction(transactionHash);
      setVerificationResult(result);
    } catch (err) {
      console.error('Error verifying transaction:', err);
      setError('Failed to verify transaction. Please check the hash and try again.');
      setVerificationResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Verification</CardTitle>
          <CardDescription>
            Verify the authenticity of ratings and transactions on the blockchain
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label htmlFor="transaction-hash" className="block text-sm font-medium mb-2">
                Transaction Hash
              </label>
              <div className="flex">
                <input
                  id="transaction-hash"
                  type="text"
                  value={transactionHash}
                  onChange={handleTransactionHashChange}
                  placeholder="Enter transaction hash (0x...)"
                  className="flex-1 h-10 rounded-l-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button 
                  onClick={handleVerify} 
                  disabled={loading || !transactionHash}
                  className="rounded-l-none"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </Button>
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
            
            {verificationResult && (
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-4">Verification Result</h3>
                
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Transaction Verified</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>This transaction has been verified on the blockchain and is authentic.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Transaction Hash</h4>
                    <p className="text-sm break-all">{transactionHash}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <p className="text-sm">{verificationResult.status}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Block Number</h4>
                    <p className="text-sm">{verificationResult.blockNumber}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Timestamp</h4>
                    <p className="text-sm">{formatDate(verificationResult.timestamp)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">From</h4>
                    <p className="text-sm break-all">{verificationResult.from}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">To (Contract)</h4>
                    <p className="text-sm break-all">{verificationResult.to}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View on Etherscan
                  </Button>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium mb-4">About Blockchain Verification</h3>
              <p className="text-gray-600 mb-4">
                All contractor ratings and reviews in the Lahaina Rebuild Project are stored on the Ethereum blockchain, making them transparent, immutable, and verifiable by anyone.
              </p>
              <p className="text-gray-600 mb-4">
                When a client submits a rating, a transaction is created on the blockchain that permanently records the rating value, review comment, client address, and contractor address. This transaction cannot be altered or deleted, ensuring the integrity of our rating system.
              </p>
              <p className="text-gray-600">
                You can verify any transaction by entering its hash above. This will check the Ethereum blockchain to confirm the transaction's authenticity, timestamp, and contents.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
