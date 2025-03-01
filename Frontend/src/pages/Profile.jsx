import React from 'react';

function Profile() {
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-01",
    activeAuctions: [
      { id: 1, title: "Vintage Watch", currentBid: 150 },
      { id: 2, title: "Antique Vase", currentBid: 300 },
    ],
    biddingHistory: [
      { auctionId: 3, title: "Classic Car", bidAmount: 5000, status: "Outbid" },
      { auctionId: 4, title: "Art Piece", bidAmount: 1200, status: "Won" },
    ]
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Profile Information</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member Since:</strong> {user.joinDate}</p>
            <button className="btn btn-primary">Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <div className="card mb-4">
          <div className="card-body">
            <h3 className="card-title">My Active Auctions</h3>
            <div className="list-group">
              {user.activeAuctions.map(auction => (
                <div key={auction.id} className="list-group-item">
                  <h5>{auction.title}</h5>
                  <p>Current Bid: ${auction.currentBid}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Bidding History</h3>
            <div className="list-group">
              {user.biddingHistory.map((bid, index) => (
                <div key={index} className="list-group-item">
                  <h5>{bid.title}</h5>
                  <p>Bid Amount: ${bid.bidAmount}</p>
                  <span className={`badge ${bid.status === 'Won' ? 'bg-success' : 'bg-secondary'}`}>
                    {bid.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile;