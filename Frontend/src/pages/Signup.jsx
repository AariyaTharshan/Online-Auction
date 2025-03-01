import { useState } from 'react'
import { Link } from 'react-router-dom'


function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold mb-2">Create Account</h2>
                <p className="text-muted">Join our auction community today</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-person text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-envelope text-muted"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-lock text-muted"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className="bi bi-lock-fill text-muted"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="form-label">I am a:</label>
                  <div className="d-flex justify-content-between">
                    <button
                      type="button"
                      className={`btn ${formData.userType === 'buyer' ? 'btn-danger' : 'btn-outline-danger'} btn-lg flex-fill me-2`}
                      onClick={() => setFormData({ ...formData, userType: 'buyer' })}
                    >
                      Buyer
                    </button>
                    <button
                      type="button"
                      className={`btn ${formData.userType === 'seller' ? 'btn-danger' : 'btn-outline-danger'} btn-lg flex-fill ms-2`}
                      onClick={() => setFormData({ ...formData, userType: 'seller' })}
                    >
                      Seller
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="terms" required />
                    <label className="form-check-label text-muted" htmlFor="terms">
                      I agree to the <Link to="/terms" className="text-primary">Terms of Service</Link> and <Link to="/privacy" className="text-primary">Privacy Policy</Link>
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-danger w-100 mb-3">
                  <i className="bi bi-person-plus me-2"></i>
                  Create Account
                </button>
              </form>
              <div className="text-center">
                <p className="text-muted">
                  Already have an account? <Link to="/login" className="text-primary text-decoration-none">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup 