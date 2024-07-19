// Login.js

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import './Login.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Footer from "../Footer/Footer";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const history = useHistory();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = () => {
    history.push('/register');
  };

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');

    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    try {
      const response = await fetch('http://localhost:3080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('jwt-token', data.token);
        window.location.href='/tracking-page';//add the path
      } else {
        setPasswordError(data.message);
      }
    } catch (error) {
      setPasswordError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container h-full w-full relative overflow-hidden">
      <Navbar color={"black"} />
      <div className="heading-container-login flex flex-col">
        <div className="heading font-semibold">
          <h1>Login to your account.</h1>
        </div>
        <div className="sub-heading font-medium">
          <h2>Please sign in to your account</h2>
        </div>
      </div>

      <div className={'inputContainer flex-col'}>
        <label htmlFor="inputBox">Email Address<span className="text-red-700">*</span></label>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <br />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer-2 relative'}>
        <label htmlFor="inputBox">Password<span className="text-red-700">*</span></label>
        <input
          type={passwordVisible ? "text" : "password"}
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <div className="password-icon" onClick={togglePasswordVisibility}>
          {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
        </div>
        <br />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={"forgot-pass flex"}>
        <p className="text-orange-400 font-semibold">Forgot Password</p>
      </div>
      <br />
      <div className={'button-container'}>
        <input className={'inputButton text-white'} type="button" onClick={onButtonClick} value={'Sign In'} />
      </div>
      <div className={"option-div"}>
        <div className="line-div"></div>
        <span>Or sign in with</span>
        <div className="line-div"></div>
      </div>
      <div className="google-icon">
        <FcGoogle className="h-9"/>
      </div>

      <div className="register-div">
        <p className="font-medium font-serif w-[500px] size-[14px]">Don't have an account? <span className="text-orange-500" onClick={handleRegister}>Register</span></p>
      </div>

      <Footer color={"gray-500"}/>
    </div>
  );
};

export default Login;
