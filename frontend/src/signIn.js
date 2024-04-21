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
    setMessage('Signing in...'); // Give immediate feedback on submission

    fetch('/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signInInfo)
      })
      .then(response => {
        if (!response.ok) {
          // Throw an error for any non-200 response
          return response.text().then(text => { throw new Error(text || 'Signin failed') });
        }
        return response.json();
      })
    .then(data => {
      if (data.token) {
        onSignIn(data.token); // Save the token and update auth state
        navigate('/upload'); // Redirect to upload page
      } else {
        setMessage('Signin failed. Please try again.'); // Set an error message
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setMessage(error.message); // Set an error message
    });
  }

  return (
    <div>
      <h2>Sign In</h2>
      {message && <div className="message">{message}</div>} {/* Show messages here */}
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
