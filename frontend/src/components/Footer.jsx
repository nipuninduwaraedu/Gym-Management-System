import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">💪</span>
              <span className="logo-text">FitLife Gym</span>
            </div>
            <p className="footer-desc">
              Your journey to a healthier, stronger you starts here.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>📍 123 Fitness Street, Gym City</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>✉️ info@fitlifegym.com</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">📘</a>
              <a href="#" className="social-link">📷</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">📺</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 FitLife Gym. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
