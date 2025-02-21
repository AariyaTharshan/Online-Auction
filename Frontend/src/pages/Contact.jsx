function Contact() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-md-8 text-center">
          <h1 className="display-5 fw-bold mb-3">Contact Us</h1>
          <p className="lead text-muted">Have questions? We're here to help and would love to hear from you.</p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="text-primary mb-3">
                <i className="bi bi-telephone-fill fs-2"></i>
              </div>
              <h4>Phone Support</h4>
              <p className="text-muted mb-0">+1 (555) 123-4567</p>
              <p className="text-muted">Mon-Fri, 9AM-6PM EST</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="text-primary mb-3">
                <i className="bi bi-envelope-fill fs-2"></i>
              </div>
              <h4>Email Support</h4>
              <p className="text-muted mb-0">support@bidhub.com</p>
              <p className="text-muted">24/7 Response Time</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="text-primary mb-3">
                <i className="bi bi-chat-fill fs-2"></i>
              </div>
              <h4>Live Chat</h4>
              <p className="text-muted mb-0">Available 24/7</p>
              <p className="text-muted">Instant Response</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-4">Send us a Message</h3>
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="name" placeholder="Your Name" />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input type="email" className="form-control" id="email" placeholder="Email Address" />
                      <label htmlFor="email">Email Address</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input type="text" className="form-control" id="subject" placeholder="Subject" />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea className="form-control" id="message" placeholder="Message" style={{height: '150px'}}></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 