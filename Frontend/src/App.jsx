import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuctionList from './pages/AuctionList'
import AuctionDetail from './pages/AuctionDetail'
import CreateAuction from './pages/CreateAuction'
import Profile from './pages/Profile'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<div className="container py-4"><Login /></div>} />
          <Route path="/signup" element={<div className="container py-4"><Signup /></div>} />
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/auctions/:id" element={<div className="container py-4"><AuctionDetail /></div>} />
          <Route path="/create-auction" element={<div className="container py-4"><CreateAuction /></div>} />
          <Route path="/profile" element={<div className="container py-4"><Profile /></div>} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
