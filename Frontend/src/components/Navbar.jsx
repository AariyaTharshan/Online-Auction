import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const isLoggedIn = false

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="bi bi-hammer me-2"></i>
          AHub
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/auctions">
                <i className="bi bi-grid me-1"></i>
                Auctions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/how-it-works">
                <i className="bi bi-info-circle me-1"></i>
                How It Works
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <i className="bi bi-headset me-1"></i>
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link 
                  to="/login" 
                  className="nav-link"
                >
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary btn-sm px-3"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/create-auction" 
                  className="btn btn-primary btn-sm px-3"
                >
                  <i className="bi bi-plus-lg me-1"></i>
                  Create Auction
                </Link>
                <div className="dropdown">
                  <button 
                    className="nav-link dropdown-toggle" 
                    type="button" 
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    Account
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        <i className="bi bi-person me-2"></i>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/my-auctions">
                        <i className="bi bi-collection me-2"></i>
                        My Auctions
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/watchlist">
                        <i className="bi bi-heart me-2"></i>
                        Watchlist
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider"/></li>
                    <li>
                      <button 
                        className="dropdown-item text-danger" 
                        onClick={() => {}}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar 