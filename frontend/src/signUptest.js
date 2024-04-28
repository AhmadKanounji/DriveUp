import React, { useState } from 'react';

function SignUp() {
  const [signUpInfo, setSignUpInfo] = useState({
    username: '',
    email: '',
    password: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setSignUpInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch('/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signUpInfo)
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
      } else {
       
      }
    })
    .catch(error => {
      console.error('Error:', error);
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
                width:100px;
                border-radius:30px;
                position:relative;
                left:200px;
                padding:10px;
            }
            h2{
                font-size:large;
            }
            img{
                margin-top:50px;
                width:200px;
                height:110px;
            }
        </style>

        <div id="content">
            <div id="titles">
                <h1>Sign up</h1>
                <h2>to continue to Drive</h2>
                <img src="google_drive_logo.png">
            </div>
            <form onSubmit={handleSubmit}>

                <label>Please enter username:<br>
                    <input
                      name="username"
                      type="text"
                      value={signUpInfo.username}
                      onChange={handleChange}
                      required
                    /><br><br>
                </label>

                <label>Please enter email:<br>
                    <input
                      name="email"
                      type="email"
                      value={signUpInfo.email}
                      onChange={handleChange}
                      required
                    /><br><br>
                </label>

                <label>Please enter password:<br>
                    <input
                      name="password"
                      type="password"
                      value={signUpInfo.password}
                      onChange={handleChange}
                      required
                    /><br><br>
                </label>

                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div>
  );
}

export default SignUp;
