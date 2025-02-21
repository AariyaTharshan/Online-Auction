import { useState } from 'react'
import { useParams } from 'react-router-dom'

function AuctionDetail() {
  const { id } = useParams()
  const [bidAmount, setBidAmount] = useState('')

  // Mock data - replace with actual API call
  const auction = {
    id,
    title: "Vintage Watch",
    description: "A beautiful vintage watch in excellent condition",
    currentBid: 150,
    endTime: "2024-04-01",
    image: "https://placeholder.com/300",
    seller: "John Doe",
    bidHistory: [
      { amount: 150, bidder: "Alice", time: "2024-03-20 15:30" },
      { amount: 145, bidder: "Bob", time: "2024-03-20 15:25" },
    ]
  }

  const handleBid = (e) => {
    e.preventDefault()
    // Handle bid submission
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <img src={auction.image} className="img-fluid rounded" alt={auction.title} />
        <h2 className="mt-4">{auction.title}</h2>
        <p className="lead">{auction.description}</p>
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Auction Details</h5>
            <p>Current Bid: ${auction.currentBid}</p>
            <p>End Time: {auction.endTime}</p>
            <p>Seller: {auction.seller}</p>
            <form onSubmit={handleBid} className="mt-3">
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter bid amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  min={auction.currentBid + 1}
                />
                <button type="submit" className="btn btn-primary bid-button">
                  Place Bid
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Bid History</h5>
            <ul className="list-group list-group-flush">
              {auction.bidHistory.map((bid, index) => (
                <li key={index} className="list-group-item">
                  <div>${bid.amount} by {bid.bidder}</div>
                  <small className="text-muted">{bid.time}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuctionDetail 