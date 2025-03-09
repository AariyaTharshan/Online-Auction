import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
          setName(userData.name || "");
          setEmail(userData.email || "");
        }
      } catch (err) {
        setError("Failed to load user data");
      }
    };
    loadUserData();
  }, []);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      if (password) {
        formData.append("password", password);
      }
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await api.put(`/user/${userData.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Edit Profile</h2>
      <div className="card shadow-sm p-4 mt-4">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password (optional)</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
