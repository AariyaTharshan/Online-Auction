import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api, { API_URL } from "../services/api";

const AuctionDetails = () => {
  const [auction, setAuction] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const response = await api.get(`/auction/${id}`);
        setAuction(response.data);
      } catch (err) {
        setError("Failed to load auction details");
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!auction) return <div className="text-center mt-5">Auction not found</div>;

  const currentHighestBid = auction.bids.length > 0
    ? Math.max(...auction.bids.map(bid => bid.amount))
    : auction.startingPrice;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={auction.image ? `${API_URL}${auction.image}` : "https://via.placeholder.com/300"}
              alt={auction.title}
              className="img-fluid rounded-start"
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className={`badge ${auction.status === 'active' ? 'bg-success' : 'bg-danger'} mb-2`}>
                {auction.status === 'active' ? 'Active' : 'Closed'}
              </div>
              <h3 className="card-title">{auction.title}</h3>
              <p className="card-text">{auction.description}</p>
              <div className="row mt-4">
                <div className="col-md-6">
                  <h5>Auction Details</h5>
                  <ul className="list-unstyled">
                    <li><strong>Starting Price:</strong> ${auction.startingPrice}</li>
                    <li><strong>Current Highest Bid:</strong> ${currentHighestBid}</li>
                    <li><strong>Total Bids:</strong> {auction.bids.length}</li>
                    <li><strong>Seller:</strong> {auction.seller.name}</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5>Bid History</h5>
                  {auction.bids.length > 0 ? (
                    <div className="list-group">
                      {auction.bids
                        .sort((a, b) => b.amount - a.amount)
                        .map((bid, index) => (
                          <div key={index} className="list-group-item">
                            <small>Bid Amount: ${bid.amount}</small>
                            <br />
                            <small className="text-muted">
                              {new Date(bid.timestamp).toLocaleString()}
                            </small>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p>No bids yet</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                {auction.status === 'active' && currentUser && (
                  <>
                    {currentUser.role === 'seller' && currentUser.id === auction.seller._id ? (
                      <button className="btn btn-danger">Close Auction</button>
                    ) : currentUser.role === 'buyer' ? (
                      <Link to={`/bid-auction/${auction._id}`} className="btn btn-primary">
                        Place Bid
                      </Link>
                    ) : null}
                  </>
                )}
                {auction.status === 'closed' && auction.winner && (
                  <div className="alert alert-success">
                    Winner: {auction.winner.name} with bid of ${currentHighestBid}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails; 