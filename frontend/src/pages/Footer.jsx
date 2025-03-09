import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <div className="container">
        <p className="mb-0">&copy; {new Date().getFullYear()} A-Hub. All Rights Reserved.</p>
        <p>
          <a href="/about" className="text-light me-3">About</a>
          <a href="/contact" className="text-light me-3">Contact</a>
          <a href="/terms" className="text-light">Terms & Conditions</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
