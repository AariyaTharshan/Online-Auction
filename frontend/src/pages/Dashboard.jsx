import React, { useState, useEffect } from "react";
import api, { API_URL } from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [myAuctions, setMyAuctions] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/auctions");
        
        if (currentUser.role === 'seller') {
          // For sellers: Show their created auctions
          const userAuctions = response.data.filter(
            auction => auction.seller._id === currentUser.id
          );
          setMyAuctions(userAuctions);
        } else {
          // For buyers: Show auctions they've won
          const wonAuctions = response.data.filter(
            auction => auction.status === 'closed' && 
            auction.winner?._id === currentUser.id
          );
          setMyAuctions(wonAuctions);
        }
        
        // Show active bids for buyers only
        if (currentUser.role === 'buyer') {
          const activeBids = response.data.filter(auction => 
            auction.status === 'active' && 
            auction.bids.some(bid => bid.buyer === currentUser.id)
          );
          setMyBids(activeBids);
        }
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser.id, currentUser.role]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                {currentUser.role === 'seller' ? 
                  `My Auctions (${myAuctions.length})` : 
                  `Won Auctions (${myAuctions.length})`
                }
              </h5>
            </div>
            <div className="card-body">
              {myAuctions.length === 0 ? (
                <div className="text-center py-4">
                  {currentUser.role === 'seller' ? (
                    <>
                      <p>You haven't created any auctions yet.</p>
                      <Link to="/create-auction" className="btn btn-primary">
                        Create Your First Auction
                      </Link>
                    </>
                  ) : (
                    <p>You haven't won any auctions yet.</p>
                  )}
                </div>
              ) : (
                <div className="list-group">
                  {myAuctions.map(auction => (
                    <div key={auction._id} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{auction.title}</h6>
                          <small className="text-muted">
                            Starting Price: ${auction.startingPrice}
                          </small>
                          <br />
                          <small className={`badge ${auction.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                            {auction.status}
                          </small>
                        </div>
                        <Link to={`/auction/${auction._id}`} className="btn btn-sm btn-outline-primary">
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">My Bids ({myBids.length})</h5>
            </div>
            <div className="card-body">
              {myBids.length === 0 ? (
                <div className="text-center py-4">
                  <p>You haven't placed any bids yet.</p>
                  <Link to="/auctions" className="btn btn-primary">
                    Browse Auctions
                  </Link>
                </div>
              ) : (
                <div className="list-group">
                  {myBids.map(auction => {
                    const myHighestBid = Math.max(
                      ...auction.bids
                        .filter(bid => bid.buyer === currentUser.id)
                        .map(bid => bid.amount)
                    );
                    return (
                      <div key={auction._id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{auction.title}</h6>
                            <small className="text-muted">
                              Your Highest Bid: ${myHighestBid}
                            </small>
                            <br />
                            <small className={`badge ${auction.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                              {auction.status}
                            </small>
                          </div>
                          <Link to={`/auction/${auction._id}`} className="btn btn-sm btn-outline-primary">
                            View Details
                          </Link>
          </div>
        </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
