import React from "react";

const AuctionList = () => {
  const auctions = [
    { id: 1, title: "Gaming Laptop", price: "$800", image: "https://via.placeholder.com/150" },
    { id: 2, title: "Smartphone", price: "$500", image: "https://via.placeholder.com/150" },
    { id: 3, title: "Vintage Watch", price: "$300", image: "https://via.placeholder.com/150" }
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center">Auction Listings</h2>
      <div className="row mt-4">
        {auctions.map((auction) => (
          <div className="col-md-4" key={auction.id}>
            <div className="card shadow-sm p-3">
              <img src={auction.image} alt={auction.title} className="card-img-top" />
              <div className="card-body text-center">
                <h5 className="card-title">{auction.title}</h5>
                <p className="card-text">Starting Price: {auction.price}</p>
                <a href={`/bid-auction/${auction.id}`} className="btn btn-primary">Place Bid</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionList;
