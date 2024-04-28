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
        navigate('/drive/recent-files');
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
      <style>
            body{
                background-color:#f0f3f8;
                font-family:"Google Sans","Noto Sans Myanmar UI",arial,sans-serif;
                font-size:medium;
            }
            #content{
                background-color:white;
                height:400px;
                border-radius:0.5cm;
                margin-left:6cm;
                margin-right:6cm;
                margin-top:70px;
                padding-top:10px;
                padding-bottom:10px;
            }
            #titles{
                position:relative;
                top:45px;
                left:30px;
            }
            h2{
                font-size:large;
            }
            img{
                margin-top:50px;
                width:200px;
                height:110px;
            }
            form{
                position:relative;
                left:375px;
                top:-200px;
            }
            input{
                border-radius:0.1cm;
                border-style:solid;
                border-width:1.5px;
                margin-top:0.1cm;
                height:1cm;
                width:300px;
                transition: 0.5s;
                outline: none;
            }
            input:focus{
                border:1.5px solid #0b57cf;
            }
            button[type="submit"]:hover{
                cursor:pointer;
                background-color:#0846a7;
            }
            button[type="submit"]{
                background-color:#0b57cf;
                color:white;
                border-style:none;
                border-radius:30px;
                width:100px;
                margin-left:65px;
                padding:10px;
            }
            input[type="checkbox"]{
                height:0.25cm;
                width:0.25cm;
                border-radius:0.5cm;
            }
            #create_account_link{
                text-decoration:none;
                color:#0b57cf;
                border-style:none;
                border-radius:30px;
                width:100px;
                padding:10px;
            }
            #create_account_link:hover{
                background-color:#f0f3f8;
                cursor:pointer;
            }
            #forgotPassword_sentence{
                position:absolute;
                top:390px;
                left:615px;
            }
        </style>
        <div id="content">
            <div id="titles">
                <h1>Sign in</h1>
                <h2>to continue to Drive</h2>
                <img src="src/google_drive_logo.png" id="google_drive_logo.png">
            </div>
        <form id="signin_form" onSubmit={handleSubmit}>

            <label>Please enter username or email:<br>
                <input 
                  name="username"
                  id="username"
                  type="text" 
                  value={signInInfo.username}
                  onChange={(e) => setSignInInfo({ ...signInInfo, username: e.target.value })}
                  required
                /><br><br>
            </label>

            <label>Please enter password:<br>
                <input
                  name="password"
                  id="password"
                  type="password"
                  value={signInInfo.password}
                  onChange={(e) => setSignInInfo({ ...signInInfo, password: e.target.value })}
                  required
                /><br><br>
            </label>

            <div>
                <label>
                <input 
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  />Remember me
                </label>
            </div><br>

            <div>
                <a href="/signup" id="create_account_link">Create account</a>
                <button type="submit">Sign in</button>
            </div>
        </form>
        <p id="forgotPassword_sentence">Forgot your password? Click <a href="#" id="forgotPassword_link" onClick={handleForgotPassword}>Here</a>!</p>
        </div>
    </div>
  );
}

export default SignIn;