import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; // Import global styles
import './landing.css'; // Import landing page specific styles

function Landing() {
  return (
    <div>
      <header className="header">
        <Link to="/" className="logo">
          <img src="/DriveUp-logo.jpeg" alt="DriveUp Logo" />
        </Link>
        <Link to="/signIn" className="signInButton">Sign In</Link>
      </header>
      <div className="background-image-container">
    <div className="landing-container"> 
      <h1>Welcome to DriveUp!</h1>
      <h2>Where you can store and access all your files securely and easily.</h2>
      <p className='p1'>DriveUp is one of the best rated online drive and storage software with up to 25Gbs of free storage!</p>
      <div className="button-container">
      <h4>Already a user?</h4>
      <Link to="/signIn" className="signInButton2">Sign In</Link>
      <h4>Don't have an account?</h4>
      <Link to="/signUp" className='signUpButton2'>Sign Up For Free</Link>
      <p>Join us today for the ultimate online storage experience.</p>
</div>
</div>

<div className="table-wrapper">
<div className="pricing-table">
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>For Personal (no cost)</th>
              <th>Business Standard</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Drive Secure cloud storage</td>
              <td>25 GB per user</td>
              <td>2 TB per user</td>
            </tr>
            <tr>
              <td>Target audience sharing</td>
              <td>—</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Shared drives for your team</td>
              <td>—</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>Docs, Sheets, Slides, Forms content creation</td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            <tr>
              <td>UpMmail Secure email</td>
              <td>✔</td>
              <td>✔</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      </div>
      {/* End of the new pricing table section */}
<footer className="footer">
        <div className="footer-content">
          <p>DriveUp</p>
          <div className="social-media-icons">
            <a href="https://instagram.com"><img src="/instagram.png" alt="Instagram"/></a>
            <a href="https://twitter.com"><img src="/twitter.png" alt="Twitter"/></a>
            <a href="https://youtube.com"><img src="/youtube.png" alt="YouTube"/></a>
            <a href="https://linkedin.com"><img src="/linkedin.png" alt="LinkedIn"/></a>
          </div>
        </div>
      </footer>


    </div>
    </div>
  );

  
}

export default Landing;
