import React, { useState, useEffect } from "react";
import api, { API_URL } from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userStats, setUserStats] = useState({ auctions: 0, bids: 0 });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (!userData || !userData.id) {
          setError("User data not found");
          return;
        }
        const [userResponse, auctionsResponse] = await Promise.all([
          api.get(`/user/${userData.id}`),
          api.get("/auctions")
        ]);

        setUser({
          ...userResponse.data,
          role: userData.role
        });
        
        // Calculate user statistics
        const userAuctions = auctionsResponse.data.filter(
          auction => auction.seller._id === userData.id
        );
        const userBids = auctionsResponse.data.filter(
          auction => auction.bids.some(bid => bid.buyer === userData.id)
        );

        setUserStats({
          auctions: userAuctions.length,
          bids: userBids.length
        });
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getImageUrl = (profileImage) => {
    if (!profileImage) return "https://via.placeholder.com/150";
    return profileImage.startsWith('http') 
      ? profileImage 
      : `${API_URL}${profileImage}`;
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!user) return <div className="text-center mt-5">User not found</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center">My Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card shadow">
        <div className="row">
          <div className="col-md-4 text-center p-4" style={{ borderRight: '1px solid #2a2a2a' }}>
            <img
              src={getImageUrl(user.profileImage)}
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
              style={{ 
                width: '150px', 
                height: '150px', 
                objectFit: 'cover',
                border: '3px solid var(--primary-color)'
              }}
            />
            <h5>{user.name}</h5>
            <p>{user.email}</p>
            <div className="badge bg-primary mb-2">
              {user.role === 'seller' ? 'Seller' : 'Buyer'}
            </div>
          </div>
          <div className="col-md-8">
            <h5>Account Details</h5>
            <ul className="list-group mb-4">
              <li className="list-group-item">Username: {user.name}</li>
              <li className="list-group-item">Email: {user.email}</li>
              <li className="list-group-item">
                Active Auctions Created: {userStats.auctions}
              </li>
              <li className="list-group-item">
                Active Bids Placed: {userStats.bids}
              </li>
            </ul>
            <div className="d-flex justify-content-end gap-2">
              <a href="/dashboard" className="btn btn-outline-primary">View Dashboard</a>
              <a href="/edit-profile" className="btn btn-primary">Edit Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
