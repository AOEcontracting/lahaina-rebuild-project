import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { submitContractorRating, hasClientReviewedContractor } from '@/lib/blockchain/ratingSystem';

export default function SubmitRatingForm({ contractorId, contractorName, projectId, clientId, onRatingSubmitted }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  // Check if client has already reviewed this contractor
  useState(() => {
    async function checkReviewStatus() {
      try {
        const hasReviewed = await hasClientReviewedContractor(contractorId, clientId);
        setAlreadyReviewed(hasReviewed);
      } catch (err) {
        console.error('Error checking review status:', err);
      }
    }
    
    if (contractorId && clientId) {
      checkReviewStatus();
    }
  }, [contractorId, clientId]);

  // Handle rating selection
  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  // Handle comment change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (comment.trim() === '') {
      setError('Please provide a review comment');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Submit rating to blockchain
      const result = await submitContractorRating(
        contractorId,
        clientId,
        rating,
        comment,
        projectId
      );
      
      console.log('Rating submitted successfully:', result);
      
      // Show success message
      setSuccess(true);
      
      // Reset form
      setRating(0);
      setComment('');
      
      // Notify parent component
      if (onRatingSubmitted) {
        onRatingSubmitted(result);
      }
    } catch (err) {
      console.error('Error submitting rating:', err);
      setError('Failed to submit rating. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If already reviewed, show message
  if (alreadyReviewed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rating Submitted</CardTitle>
          <CardDescription>
            You have already reviewed this contractor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">
            Thank you for your feedback! Your review helps other homeowners in Lahaina make informed decisions.
          </p>
        </CardContent>
      </Card>
    );
  }

  // If submission was successful, show success message
  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rating Submitted</CardTitle>
          <CardDescription>
            Your rating has been recorded on the blockchain
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
                <h3 className="text-sm font-medium text-green-800">Rating submitted successfully</h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>Your rating and review for {contractorName} have been permanently recorded on the blockchain.</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setSuccess(false)} variant="outline" className="w-full">
            Submit Another Rating
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate {contractorName}</CardTitle>
        <CardDescription>
          Your rating will be permanently recorded on the blockchain
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Your Rating</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`h-8 w-8 cursor-pointer ${
                      star <= (hoveredRating || rating) ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={star <= (hoveredRating || rating) ? "currentColor" : "none"}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea
                id="comment"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Share your experience working with this contractor..."
                rows={4}
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button type="button" variant="outline" onClick={() => {
          setRating(0);
          setComment('');
          setError(null);
        }}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={loading || rating === 0 || comment.trim() === ''}
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            'Submit Rating'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
