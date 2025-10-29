import React from "react";
import "../componentStyles/Footer.css";
import {
  Phone,
  Email,
  LinkedIn,
  YouTube,
  Instagram,
  GitHub,
} from "@mui/icons-material";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1: Contact */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>
            <Phone fontSize="small" /> Phone : 6361461351
          </p>
          <p>
            <Email fontSize="small" /> Email : madhavikulkarni366@example.com
          </p>
        </div>

        {/* Section 2: Social */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <GitHub className="social-icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <LinkedIn className="social-icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <YouTube className="social-icon" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Instagram className="social-icon" />
            </a>
          </div>
        </div>

        {/* Section 3: About */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 DesiCart-Gulbarga. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
