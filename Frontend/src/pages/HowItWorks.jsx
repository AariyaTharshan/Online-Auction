function HowItWorks() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold mb-3">How BidHub Works</h1>
        <p className="lead text-muted">Learn how to buy and sell items on our auction platform</p>
      </div>

      <div className="row g-4 py-5">
        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-primary bg-gradient text-white mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{width: '64px', height: '64px'}}>
                <i className="bi bi-person-plus fs-4"></i>
              </div>
              <h4 className="mb-3">1. Create Account</h4>
              <p className="text-muted">Sign up for free and complete your profile to start bidding or selling.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-primary bg-gradient text-white mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{width: '64px', height: '64px'}}>
                <i className="bi bi-search fs-4"></i>
              </div>
              <h4 className="mb-3">2. Find Items</h4>
              <p className="text-muted">Browse through our wide selection of items or list your own for sale.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-primary bg-gradient text-white mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{width: '64px', height: '64px'}}>
                <i className="bi bi-cash-stack fs-4"></i>
              </div>
              <h4 className="mb-3">3. Place Bids</h4>
              <p className="text-muted">Bid on items you're interested in and track your active bids.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="feature-icon bg-primary bg-gradient text-white mb-4 mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{width: '64px', height: '64px'}}>
                <i className="bi bi-trophy fs-4"></i>
              </div>
              <h4 className="mb-3">4. Win & Pay</h4>
              <p className="text-muted">Win auctions and complete secure payments to receive your items.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 py-5">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-4">For Buyers</h3>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Register and verify your account</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Browse available auctions and add items to watchlist</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Place bids and monitor your bidding status</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Complete payment when you win an auction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-4">For Sellers</h3>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Create a seller account and verify your identity</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>List your items with detailed descriptions and photos</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Set starting prices and auction duration</span>
                </li>
                <li className="mb-3 d-flex">
                  <i className="bi bi-check-circle-fill text-primary me-2"></i>
                  <span>Ship items to winning bidders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks 