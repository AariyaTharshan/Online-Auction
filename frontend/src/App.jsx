import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AuctionList from "./pages/AuctionList";
import CreateAuction from "./pages/CreateAuction";
import BidAuction from "./pages/BidAuction";
import NavbarComponent from "./pages/Navbar";
import Footer from "./pages/Footer";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/create-auction" element={<CreateAuction />} />
          <Route path="/bid-auction/:id" element={<BidAuction />} />
          <Route path="/edit-profile" element={<EditProfile/>}></Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
