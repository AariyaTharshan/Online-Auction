import React, { useState, useEffect } from "react";
import api, { API_URL } from "../services/api";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [myAuctions, setMyAuctions] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [soldAuctions, setSoldAuctions] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/auctions");
        
        if (currentUser.role === 'seller') {
          // For sellers: Show their created auctions and sold items
          const userAuctions = response.data.filter(
            auction => auction.seller._id === currentUser.id
          );
          
          // Get any newly created auctions from localStorage
          const newAuctions = JSON.parse(localStorage.getItem('myAuctions') || '[]');
          const allAuctions = [...userAuctions, ...newAuctions];
          
          // Remove duplicates
          const uniqueAuctions = allAuctions.filter((auction, index, self) =>
            index === self.findIndex((a) => a._id === auction._id)
          );
          
          const activeAuctions = uniqueAuctions.filter(auction => auction.status === 'active');
          const soldAuctions = uniqueAuctions.filter(auction => auction.status === 'closed');
          
          setMyAuctions(activeAuctions);
          setSoldAuctions(soldAuctions);
          
          // Clear localStorage after fetching
          localStorage.removeItem('myAuctions');
        } else {
          // For buyers: Show auctions they've won and their active bids
          const wonAuctions = response.data.filter(
            auction => auction.status === 'closed' && 
            auction.winner?._id === currentUser.id
          );
          setMyAuctions(wonAuctions);

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
        {/* Active/Won Auctions Section */}
        <div className="col-md-6 mb-4">
          <div className="card shadow">
            <div className="card-header" style={{ borderBottom: '1px solid #2a2a2a' }}>
              <h5 className="mb-0" style={{ color: 'var(--primary-color)' }}>
                {currentUser.role === 'seller' ? 
                  `Active Auctions (${myAuctions.length})` : 
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
                            {currentUser.role === 'seller' 
                              ? `Starting Price: $${auction.startingPrice}`
                              : `Won for: $${Math.max(...auction.bids.map(bid => bid.amount))}`
                            }
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

        {/* Conditional Rendering based on Role */}
        {currentUser.role === 'seller' ? (
          // Sold Items Section for Sellers
          <div className="col-md-6 mb-4">
            <div className="card shadow">
              <div className="card-header" style={{ borderBottom: '1px solid #2a2a2a' }}>
                <h5 className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  Sold Items ({soldAuctions.length})
                </h5>
              </div>
              <div className="card-body">
                {soldAuctions.length === 0 ? (
                  <p className="text-center py-4">No items sold yet</p>
                ) : (
                  <div className="list-group">
                    {soldAuctions.map(auction => (
                      <div key={auction._id} className="list-group-item">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="mb-1">{auction.title}</h6>
                            <small className="text-muted">
                              Sold for: ${Math.max(...auction.bids.map(bid => bid.amount))}
                            </small>
                            <br />
                            <small className="text-muted">
                              Winner: {auction.winner?.name}
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
        ) : (
          // Active Bids Section for Buyers
          <div className="col-md-6 mb-4">
            <div className="card shadow">
              <div className="card-header" style={{ borderBottom: '1px solid #2a2a2a' }}>
                <h5 className="mb-0" style={{ color: 'var(--primary-color)' }}>
                  My Active Bids ({myBids.length})
                </h5>
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
