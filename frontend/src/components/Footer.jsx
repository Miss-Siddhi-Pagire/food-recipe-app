import React from 'react'
//import { Link } from 'react-router-dom'
import './Footer.css'
import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
              <h2>DishDelight</h2>
          </div>
          <div className="footer-links">
            <ul>
              
              <li><a href="https://recipes.timesofindia.com/terms-and-conditions/articleshow/54046592.cms" className="footer-link">Privacy Policy</a></li>
              <li><a href="https://recipes.timesofindia.com/terms-and-conditions/articleshow/54046592.cms" className="footer-link">Terms & Conditions</a></li>
              
            </ul>
          </div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/in/siddhi-pagire-108a792b3?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="footer-social-icon" target="_blank">
              <img src="src\assets\linkdin.png" alt="Facebook"/>
            </a>
            <a href="https://instagram.com" className="footer-social-icon" target="_blank">
              <img src="src\assets\instagram.png" alt="Instagram"/>
            </a>
            <a href="https://twitter.com" className="footer-social-icon" target="_blank">
              <img src="src\assets\Twitter.png" alt="Twitter"/>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 DishDelight. All Rights Reserved.</p>
        </div>
      </footer>

    </>
  )
}
