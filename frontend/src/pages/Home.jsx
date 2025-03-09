import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center" style={{ minHeight: '80vh' }}>
        <div className="col-md-6">
          <h1 className="display-4 mb-4" style={{ fontWeight: 'bold' }}>
            Welcome to <span style={{ color: 'var(--primary-color)' }}>A-Hub</span>
          </h1>
          <p className="lead mb-4">
            Your premier destination for online auctions. Buy and sell items in a secure
            and user-friendly environment.
          </p>
          <div className="d-flex gap-3">
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
            <Link to="/signup" className="btn btn-outline-primary btn-lg">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-4 mt-4">
            <h3>Featured Auctions</h3>
            <div className="list-group">
              <Link to="/auctions" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                View All Auctions
                <span className="badge bg-primary rounded-pill">→</span>
              </Link>
            </div>
          </div>
          
          <div className="card shadow-sm p-4 mt-4">
            <h3>Why Choose A-Hub?</h3>
            <ul className="list-unstyled">
              <li className="mb-2">✓ Secure Transactions</li>
              <li className="mb-2">✓ User-Friendly Interface</li>
              <li className="mb-2">✓ Wide Range of Items</li>
              <li className="mb-2">✓ Real-Time Bidding</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Browse Auctions</h4>
            <p>Explore our wide selection of items up for auction.</p>
            <Link to="/auctions" className="btn btn-outline-primary">
              View Auctions
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Start Selling</h4>
            <p>Create your own auction and start selling today.</p>
            <Link to="/signup" className="btn btn-outline-primary">
              Get Started
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm p-4 text-center">
            <h4>Join Community</h4>
            <p>Be part of our growing auction community.</p>
            <Link to="/signup" className="btn btn-outline-primary">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
