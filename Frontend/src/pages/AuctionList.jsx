import { Link } from 'react-router-dom'

function AuctionList() {
  const auctions = [
    {
      id: 1,
      title: "Vintage Rolex Watch",
      currentBid: 1500,
      endTime: "2024-04-01",
      image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=500&q=80"
    },
    {
      id: 2,
      title: "Antique Persian Rug",
      currentBid: 2300,
      endTime: "2024-04-02",
      image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=500&q=80"
    },
    {
      id: 3,
      title: "Classic Gibson Guitar",
      currentBid: 3500,
      endTime: "2024-04-03",
      image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=500&q=80"
    },
    {
      id: 4,
      title: "Rare Comic Book Collection",
      currentBid: 850,
      endTime: "2024-04-04",
      image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=500&q=80"
    },
    {
      id: 5,
      title: "Vintage Camera Set",
      currentBid: 450,
      endTime: "2024-04-05",
      image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=500&q=80"
    },
    {
      id: 6,
      title: "Art Deco Chandelier",
      currentBid: 1200,
      endTime: "2024-04-06",
      image: "https://images.unsplash.com/photo-1543198126-c51b41d2c808?w=500&q=80"
    }
  ]

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-center display-5 mb-4">Active Auctions</h2>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="input-group mb-4 shadow-sm">
                <input
                  type="search"
                  className="form-control form-control-lg"
                  placeholder="Search auctions..."
                />
                <button className="btn btn-primary">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button className="btn btn-outline-secondary active">All</button>
              <button className="btn btn-outline-secondary">Ending Soon</button>
              <button className="btn btn-outline-secondary">New Arrivals</button>
            </div>
            <select className="form-select w-auto">
              <option>Sort by Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Ending Soon</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row g-4">
        {auctions.map(auction => (
          <div key={auction.id} className="col-12 col-md-6 col-lg-4">
            <div className="card auction-card h-100 shadow-sm">
              <div className="position-relative">
                <img src={auction.image} className="card-img-top" alt={auction.title} />
                <span className="position-absolute top-0 end-0 badge bg-primary m-3">
                  <i className="bi bi-clock me-1"></i>
                  {new Date(auction.endTime).toLocaleDateString()}
                </span>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{auction.title}</h5>
                <p className="card-text text-success fw-bold">
                  Current Bid: ${auction.currentBid.toLocaleString()}
                </p>
                <Link 
                  to={`/auctions/${auction.id}`} 
                  className="btn btn-primary mt-auto"
                >
                  <i className="bi bi-arrow-right me-1"></i>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuctionList 