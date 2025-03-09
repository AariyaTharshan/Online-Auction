import React, { useState } from "react";

const BidAuction = () => {
  const [bidAmount, setBidAmount] = useState("");
  const auction = {
    id: 1,
    title: "Gaming Laptop",
    description: "High-performance gaming laptop with RTX graphics.",
    currentBid: "$850",
    image: "https://via.placeholder.com/150"
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    console.log("Bid Placed:", { auctionId: auction.id, bidAmount });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Place a Bid</h2>
      <div className="card shadow-sm p-4 mt-4">
        <div className="row">
          <div className="col-md-4 text-center">
            <img src={auction.image} alt={auction.title} className="img-fluid" />
          </div>
          <div className="col-md-8">
            <h5>{auction.title}</h5>
            <p>{auction.description}</p>
            <p><strong>Current Highest Bid:</strong> {auction.currentBid}</p>
            <form onSubmit={handleBidSubmit}>
              <div className="mb-3">
                <label className="form-label">Your Bid Amount</label>
                <input
                  type="number"
                  className="form-control"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Place Bid</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidAuction;
