import React, { useState, useEffect } from "react";
import api, { API_URL } from "../services/api";
import { Link } from "react-router-dom";

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await api.get("/auctions");
        setAuctions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load auctions");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const handleCloseAuction = async (auctionId) => {
    try {
      await api.post(`/auction/${auctionId}/close`);
      // Refresh auctions list
      const response = await api.get("/auctions");
      setAuctions(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to close auction");
    }
  };

  // Add this CSS to your styles
  const cardStatusBadgeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    color: 'white',
    borderRadius: '4px',
    fontSize: '0.8rem',
    zIndex: 1
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Auction Listings</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row mt-4">
        {auctions.map((auction) => (
          <div className="col-md-4 mb-4" key={auction._id}>
            <div className="card shadow-sm">
              <div className={`card-status-badge ${auction.status === 'closed' ? 'bg-danger' : 'bg-success'}`} style={cardStatusBadgeStyle}>
                {auction.status === 'closed' ? 'Closed' : 'Active'}
              </div>
              <img 
                src={auction.image ? `${API_URL}${auction.image}` : "https://via.placeholder.com/150"}
                alt={auction.title} 
                className="card-img-top"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{auction.title}</h5>
                <p className="card-text">{auction.description}</p>
                <p className="card-text">
                  <small className="text-muted">Seller: {auction.seller.name}</small>
                </p>
                <p className="card-text">Starting Price: ${auction.startingPrice}</p>
                <p className="card-text">
                  Current Highest Bid: $
                  {auction.bids.length > 0 
                    ? Math.max(...auction.bids.map(bid => bid.amount))
                    : auction.startingPrice}
                </p>
                <div className="d-flex gap-2">
                  <Link 
                    to={`/auction/${auction._id}`} 
                    className="btn btn-outline-primary"
                  >
                    View Details
                  </Link>
                  {auction.status === 'active' && currentUser && (
                    <>
                      {currentUser.role === 'seller' && currentUser.id === auction.seller._id ? (
                        <button 
                          onClick={() => handleCloseAuction(auction._id)}
                          className="btn btn-danger"
                        >
                          Close Auction
                        </button>
                      ) : currentUser.role === 'buyer' ? (
                        <Link 
                          to={`/bid-auction/${auction._id}`} 
                          className="btn btn-primary"
                        >
                          Place Bid
                        </Link>
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
