import React from 'react';
import './FooterCss.css'; // Link to your CSS file

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">About Us</a></li>
            <li><a href="/">Services</a></li>
            <li><a href="/">Contact</a></li>
            <li><a href="/">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="/" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="/" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="/" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="/" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: <a href="mailto:info@example.com">vaghelakishan857@gmail.com</a></p>
          <p>Phone: <a href="tel:+972305985">+91 972305985</a></p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Dev Images. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
