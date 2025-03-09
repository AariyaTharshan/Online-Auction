import React from "react";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Dashboard</h2>
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>My Auctions</h5>
            <p>View and manage your created auctions.</p>
            <a href="/create-auction" className="btn btn-primary">Create Auction</a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>Active Bids</h5>
            <p>Track auctions you've placed bids on.</p>
            <a href="/auctions" className="btn btn-primary">View Auctions</a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h5>Profile</h5>
            <p>Manage your account and settings.</p>
            <a href="/profile" className="btn btn-primary">View Profile</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
