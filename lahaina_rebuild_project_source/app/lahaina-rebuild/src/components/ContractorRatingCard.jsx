import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { getContractorRating, getContractorReviews } from '@/lib/blockchain/ratingSystem';

export default function ContractorRatingCard({ contractorId, contractorName, company }) {
  const [rating, setRating] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    async function fetchRatingData() {
      try {
        setLoading(true);
        
        // Fetch contractor rating from blockchain
        const ratingData = await getContractorRating(contractorId);
        setRating(ratingData);
        
        // Fetch contractor reviews from blockchain
        const reviewsData = await getContractorReviews(contractorId);
        setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching contractor rating data:', err);
        setError('Failed to load rating data from blockchain');
      } finally {
        setLoading(false);
      }
    }
    
    fetchRatingData();
  }, [contractorId]);

  // Format date
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
            fill={i < Math.floor(rating) ? "currentColor" : "none"}
          />
        ))}
      </div>
    );
  };

  // Display limited reviews or all reviews based on state
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`/avatars/${contractorName.split(' ')[0].toLowerCase()}.jpg`} alt={contractorName} />
              <AvatarFallback>{contractorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{contractorName}</CardTitle>
              <CardDescription>{company}</CardDescription>
            </div>
          </div>
          {rating?.verified && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Blockchain Verified
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 py-4 text-center">{error}</div>
        ) : (
          <div>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {renderStars(rating?.averageRating || 0)}
              </div>
              <span className="ml-2 text-lg font-medium">{rating?.averageRating?.toFixed(1) || '0.0'}</span>
              <span className="ml-1 text-sm text-gray-500">({rating?.totalReviews || 0} reviews)</span>
            </div>
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                <h3 className="font-medium">Recent Reviews</h3>
                <div className="space-y-3">
                  {displayedReviews.map((review, index) => (
                    <div key={review.reviewId} className="border-b pb-3 last:border-b-0">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center">
                          {renderStars(review.rating)}
                          <span className="ml-2 text-sm text-gray-500">{formatDate(review.timestamp)}</span>
                        </div>
                        <div className="text-xs text-gray-400 truncate max-w-[120px]" title={review.transactionHash}>
                          TX: {review.transactionHash.substring(0, 10)}...
                        </div>
                      </div>
                      <p className="mt-1 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                {reviews.length > 3 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-blue-600"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? 'Show Less' : `Show All ${reviews.length} Reviews`}
                  </Button>
                )}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                No reviews yet
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t bg-gray-50">
        <div className="w-full">
          <div className="text-xs text-gray-500 mb-2">
            All ratings are verified on the blockchain and cannot be altered
          </div>
          <Button variant="outline" size="sm" className="w-full">
            View on Blockchain Explorer
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
