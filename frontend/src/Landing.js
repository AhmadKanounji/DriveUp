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
    </div>
  );
}

export default Landing;
