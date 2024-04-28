import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('There was an error sending the reset password link');
      }
      return response.json();
    })
    .then(() => {
      setMessage('Please check your email for the password reset link.');
      navigate('/signin');
    })
    .catch((error) => {
      setMessage(error.message);
    });
  };

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
                width:325px;
                height:325px;
                position:absolute;
                top:65px;
                left:610px;
            }
            form{
                position:relative;
                top:60px;
                left:30px;
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
                width:150px;
                padding:10px;
            }
        </style>

        <div id="content">
            <div id="titles">
                <h1>Account Recovery</h1>
                <h2>To regain access to your account,<br>a link will be sent to your email so<br>you may reset your password</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <label>Please enter email:<br>
                    <input
                      type="email"
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    /><br><br>
                </label>
                <button type="submit">Send Reset Link</button>
            </form>
            <img src="forgot_password_logo.png">
        </div>
    </div>
  );
}