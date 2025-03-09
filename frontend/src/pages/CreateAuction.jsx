import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const CreateAuction = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [image, setImage] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Redirect if user is not a seller
    if (!user || user.role !== 'seller') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Calculate minimum date-time (current time + 1 hour)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!title.trim() || !description.trim() || !startingPrice || !endDate) {
        setError("Please fill in all required fields");
        return;
      }

      if (parseFloat(startingPrice) <= 0) {
        setError("Starting price must be greater than 0");
        return;
      }

      const endDateTime = new Date(endDate);
      if (endDateTime <= new Date()) {
        setError("End time must be in the future");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("startingPrice", startingPrice);
      formData.append("endDate", endDateTime.toISOString());
      if (image) {
        formData.append("image", image);
      }

      const response = await api.post("/create-auction", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Store the new auction in localStorage to show immediately in dashboard
      const currentAuctions = JSON.parse(localStorage.getItem('myAuctions') || '[]');
      currentAuctions.push(response.data.auction);
      localStorage.setItem('myAuctions', JSON.stringify(currentAuctions));

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create auction");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-white">Create Auction</h2>
      <div className="card shadow p-4 mt-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Starting Price</label>
            <input
              type="number"
              className="form-control"
              value={startingPrice}
              onChange={(e) => setStartingPrice(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">End Date and Time</label>
            <input
              type="datetime-local"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={getMinDateTime()}
              required
            />
            <small className="text-muted">
              Auction must end at least 1 hour from now
            </small>
          </div>
          <div className="mb-3">
            <label className="form-label">Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Create Auction
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAuction;
