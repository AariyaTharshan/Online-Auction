import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending signup data:", { name, email, password, role });
      
      const response = await api.post("/signup", {
        name,
        email,
        password,
        role: role
      });

      console.log("Signup response:", response.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center">Sign Up for A-Hub</h2>
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
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">I want to</label>
                <select 
                  className="form-select"
                  value={role}
                  onChange={(e) => {
                    console.log("Selected role:", e.target.value);
                    setRole(e.target.value);
                  }}
                  required
                >
                  <option value="buyer">Buy Items</option>
                  <option value="seller">Sell Items</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Sign Up</button>
            </form>
            <div className="text-center mt-3">
              <p>Already have an account? <a href="/login">Login</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
