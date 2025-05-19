import React, { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import { getCurrentUser } from '../../lib/supabase';

type Review = {
  username: string;
  review: string;
  rating: number;
  date: string;
};

type TrackOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  songData: {
    title: string;
    artist: string;
    image: string;
  } | null;
};

const TrackOverlay: React.FC<TrackOverlayProps> = ({ isOpen, onClose, songData }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    if (songData?.title) {
      const savedReviews = JSON.parse(localStorage.getItem(`reviews-${songData.title}`) || '[]');
      setReviews(savedReviews);
    }

    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user?.email || null);
    };

    fetchUser();
  }, [songData]);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const submitReview = async () => {
    if (!songData) return;
    if (!rating) {
      alert('Please select a star rating');
      return;
    }
    
    if (!reviewText.trim()) {
      alert('Please write a review');
      return;
    }

    const user = await getCurrentUser();
    if (!user) return;

    const newReview: Review = {
      username: user.email || 'Anonymous',
      review: reviewText,
      rating,
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [...reviews, newReview];
    localStorage.setItem(`reviews-${songData.title}`, JSON.stringify(updatedReviews));
    setReviews(updatedReviews);
    setReviewText('');
    setRating(0);
  };

  const removeReview = (index: number) => {
    if (!songData) return;
    
    const review = reviews[index];
    if (!currentUser || review.username !== currentUser) {
      alert("You can only delete your own reviews!");
      return;
    }
    
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    
    if (updatedReviews.length === 0) {
      localStorage.removeItem(`reviews-${songData.title}`);
    } else {
      localStorage.setItem(`reviews-${songData.title}`, JSON.stringify(updatedReviews));
    }
    
    setReviews(updatedReviews);
  };

  if (!isOpen || !songData) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{songData.title}</h2>
          <button onClick={onClose} className="text-muted hover:text-primary">
            <X size={20} />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={songData.image} 
            alt="Album cover" 
            className="w-full md:w-1/3 rounded-lg"
          />
          
          <div className="flex-1">
            <p className="text-muted mb-4">{songData.artist}</p>
            
            <div 
              className="rating mb-6"
              onMouseLeave={handleRatingLeave}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  onClick={() => handleRatingClick(value)}
                  onMouseEnter={() => handleRatingHover(value)}
                  size={24}
                  fill={(hoveredRating || rating) >= value ? '#dabd18b2' : 'none'}
                  color="#dabd18b2"
                  className="cursor-pointer mx-1"
                />
              ))}
            </div>
            
            <textarea 
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="review-textarea w-full h-32 resize-none mb-4"
            ></textarea>
            
            <button onClick={submitReview} className="spotify-button">
              Submit Review
            </button>
            
            <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{review.username}</span>
                      <div className="flex items-center">
                        <span className="text-muted text-xs mr-2">{review.date}</span>
                        {review.username === currentUser && (
                          <button 
                            onClick={() => removeReview(index)} 
                            className="text-red-500 hover:text-red-400"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="star-rating-display mb-1">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Star
                          key={value}
                          size={14}
                          fill={review.rating >= value ? '#dabd18b2' : 'none'}
                          color="#dabd18b2"
                        />
                      ))}
                    </div>
                    
                    <p>{review.review}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOverlay;