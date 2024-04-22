import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onSignIn }) {
  const navigate = useNavigate();
  const [signInInfo, setSignInInfo] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  function handleRememberMeChange(event) {
    setRememberMe(event.target.checked);
  }

  function handleForgotPassword(event) {
    event.preventDefault();
    navigate('/forgot-password');
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage('Signing in...');
    fetch('/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signInInfo)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Signin failed: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.token) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        onSignIn(data.token, rememberMe); 
        navigate('/upload');
      } else {
        setMessage('Signin failed. Please try again.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage(error.toString());
    });
  }

  return (
    <div>
      <h2>Sign In</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          value={signInInfo.username}
          onChange={(e) => setSignInInfo({ ...signInInfo, username: e.target.value })}
          placeholder="Username or Email"
          required
        />
        <input
          name="password"
          type="password"
          value={signInInfo.password}
          onChange={(e) => setSignInInfo({ ...signInInfo, password: e.target.value })}
          placeholder="Password"
          required
        />
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          /> Remember me
        </label>
        <button type="button" onClick={handleForgotPassword}>Forgot Password?</button>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
