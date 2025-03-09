import React from "react";

const Profile = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">My Profile</h2>
      <div className="card shadow-sm p-4 mt-4">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="img-fluid rounded-circle mb-3"
            />
            <h5>Aariya Tharshan V</h5>
            <p>aariyatharshanv@gmail.com</p>
          </div>
          <div className="col-md-8">
            <h5>Account Details</h5>
            <ul className="list-group">
              <li className="list-group-item">Username: Aariya</li>
              <li className="list-group-item">Email: aariyatharshanv@gmail.com</li>
              <li className="list-group-item">Phone: 9578827001</li>
              <li className="list-group-item">Member Since: 2022</li>
            </ul>
            <div className="mt-3 text-end">
              <a href="/edit-profile" className="btn btn-primary">Edit Profile</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
