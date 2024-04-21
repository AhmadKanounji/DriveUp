import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Link to="/signIn">Sign In</Link>
      <span> or </span>
      <Link to="/signUp">Sign Up</Link>
    </div>
  );
}

export default Landing;
