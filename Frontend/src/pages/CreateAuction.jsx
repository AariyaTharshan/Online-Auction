import { useState } from 'react'

function CreateAuction() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingBid: '',
    endTime: '',
    image: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4">Create New Auction</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Starting Bid ($)</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.startingBid}
                  onChange={(e) => setFormData({...formData, startingBid: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">End Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={formData.endTime}
                  onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                  accept="image/*"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Create Auction</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAuction 