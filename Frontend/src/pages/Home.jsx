import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <div className="home-banner">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-md-8">
              <h1 className="display-4 mb-4">Welcome to BidHub</h1>
              <p className="lead mb-4">Your premier destination for unique and exclusive online auctions. Discover rare items, place bids, and win amazing deals!</p>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <Link to="/auctions" className="btn btn-light btn-lg px-4 gap-3">
                  Browse Auctions
                </Link>
                <Link to="/create-auction" className="btn btn-outline-light btn-lg px-4">
                  Create Auction
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4 py-5">
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div className="card-body">
                <h3>Find Unique Items</h3>
                <p>Discover rare and exclusive items from sellers worldwide</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div className="card-body">
                <h3>Secure Bidding</h3>
                <p>Bid with confidence using our secure bidding system</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 text-center p-4">
              <div className="card-body">
                <h3>Easy Selling</h3>
                <p>Create auctions and reach buyers globally</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home 