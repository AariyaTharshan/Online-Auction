import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AuctionList from "./pages/AuctionList";
import CreateAuction from "./pages/CreateAuction";
import BidAuction from "./pages/BidAuction";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import EditProfile from "./pages/EditProfile";
import PrivateRoute from "./components/PrivateRoute";
import AuctionDetails from "./pages/AuctionDetails";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auctions" element={<AuctionList />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-auction"
              element={
                <PrivateRoute>
                  <CreateAuction />
                </PrivateRoute>
              }
            />
            <Route
              path="/bid-auction/:id"
              element={
                <PrivateRoute>
                  <BidAuction />
                </PrivateRoute>
              }
            />
            <Route
              path="/auction/:id"
              element={
                <PrivateRoute>
                  <AuctionDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
