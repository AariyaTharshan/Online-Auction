import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const BidAuction = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [auction, setAuction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const [userLastBid, setUserLastBid] = useState(0);
  const [bidCount, setBidCount] = useState(0);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        
        // Redirect if user is not a buyer
        if (currentUser.role !== 'buyer') {
          navigate('/dashboard');
          return;
        }

        const response = await api.get(`/auction/${id}`);
        const auctionData = response.data;
        
        // Check if the user is the seller
        if (auctionData.seller === currentUser.id) {
          setError("You cannot bid on your own auction");
          return;
        }

        // Check if auction is closed
        if (auctionData.status === 'closed') {
          setError("This auction is closed");
          return;
        }

        // Get user's bid count and last bid
        const userBids = auctionData.bids.filter(bid => bid.buyer === currentUser.id);
        setBidCount(userBids.length);
        if (userBids.length > 0) {
          setUserLastBid(Math.max(...userBids.map(bid => bid.amount)));
        }

        setAuction(auctionData);
      } catch (err) {
        setError("Failed to load auction details");
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id, navigate]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const bidValue = parseFloat(bidAmount);
      if (!bidValue || bidValue <= 0) {
        setError("Please enter a valid bid amount");
        return;
      }

      if (bidValue <= currentHighestBid) {
        setError(`Bid must be higher than current highest bid: $${currentHighestBid}`);
        return;
      }

      // Check if user has already bid 3 times
      if (bidCount >= 3) {
        setError("You have reached the maximum number of bids (3) for this auction");
        return;
      }

      // Check if new bid is higher than user's last bid
      if (userLastBid > 0 && bidValue <= userLastBid) {
        setError("Your new bid must be higher than your previous bid");
        return;
      }

      await api.post("/bid", {
        auctionId: auction._id,
        amount: bidValue
      });
      
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place bid");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!auction) {
    return <div className="text-center mt-5">Auction not found</div>;
  }

  const currentHighestBid = auction.bids.length > 0 
    ? Math.max(...auction.bids.map(bid => bid.amount))
    : auction.startingPrice;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Place a Bid</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card shadow-sm p-4 mt-4">
        <div className="row">
          <div className="col-md-4 text-center">
            <img 
              src={auction.image || "https://via.placeholder.com/150"} 
              alt={auction.title} 
              className="img-fluid" 
            />
          </div>
          <div className="col-md-8">
            <h5>{auction.title}</h5>
            <p>{auction.description}</p>
            <p><strong>Starting Price:</strong> ${auction.startingPrice}</p>
            <p><strong>Current Highest Bid:</strong> ${currentHighestBid}</p>
            <div className="alert alert-info">
              <small>
                You have placed {bidCount}/3 bids on this auction
                {userLastBid > 0 && ` | Your last bid: $${userLastBid}`}
              </small>
            </div>
            <form onSubmit={handleBidSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Bid Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  min={currentHighestBid + 1}
                  step="0.01"
                  required
                />
                <small className="text-muted">
                  Minimum bid: ${currentHighestBid + 1}
                </small>
              </div>
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={parseFloat(bidAmount) <= currentHighestBid}
              >
                Place Bid
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidAuction;
