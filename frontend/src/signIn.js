import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn({ onSignIn }) { 
const navigate = useNavigate();
  const [signInInfo, setSignInInfo] = useState({
    username: '',
    password: ''
  });
  
  const [message, setMessage] = useState(''); 

  function handleChange(event) {
    const { name, value } = event.target;
    setSignInInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
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
          return response.text().then(text => { throw new Error(text || 'Signin failed') });
        }
        return response.json();
      })
    .then(data => {
      if (data.token) {
        onSignIn(data.token); 
        navigate('/upload'); 
      } else {
        setMessage('Signin failed. Please try again.'); 
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage(error.message); 
    });
  }

  return (
    <div>
      <h2>Sign In</h2>
      {message && <div className="message">{message}</div>} {}
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          type="text"
          value={signInInfo.username}
          onChange={handleChange}
          placeholder="Username or Email"
          required
        />
        <input
          name="password"
          type="password"
          value={signInInfo.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
