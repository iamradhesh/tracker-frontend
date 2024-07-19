import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import './Register.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Footer from "../Footer/Footer";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [isChecked, setIsChecked] = useState(false); // State for checkbox
  const history = useHistory(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = () => {
    window.location.href = '/login';
  }

  const onButtonClick = async () => {
    // Set initial error values to empty
    setEmailError('');
    setPasswordError('');
    setUserNameError('');

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Enter a valid email');
      return;
    }

    if ('' === userName) {
      setUserNameError('Enter a valid username');
      return;
    }

    if ('' === password) {
      setPasswordError('Enter a password');
      return;
    }

    if (password.length < 8) {
      setPasswordError('The password must be 8 characters or longer');
      return;
    }

    if (!isChecked) {
      // Handle case where terms are not accepted
      alert("Please agree to the terms and conditions!");
      return;
    }

    // Make the API call to register the user
    try {
      const response = await fetch('http://localhost:3080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userName,
          password,
        }),
      });

      const data = await response.json();

      if (data.message === 'success') {
        window.location.href = '/success';
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Error registering user. Please try again later.');
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  return (
    <div className="signup-container h-full w-full relative overflow-hidden">
      <Navbar color={"black"} />
      {/* Heading-container */}
      <div className="heading-container-register flex flex-col">
        <div className="heading font-semibold">
          <h1>Create your new account</h1>
        </div>
        <div className="sub-heading font-medium">
          <h2>Create an account to start looking for the food you like</h2>
        </div>
      </div>

      {/* Input-container */}
      <div className="main-box-input-container">
        <div className="inputContainer flex-col">
          <label htmlFor="inputBox">Email Address <span className="text-red-700">*</span></label>
          <input
            value={email}
            placeholder="Enter your email here"
            onChange={(ev) => setEmail(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{emailError}</label>
        </div>

        {/* UserName */}
        <div className="inputContainer-2 flex-col">
          <label htmlFor="inputBox">User Name <span className="text-red-700">*</span></label>
          <input
            value={userName}
            placeholder="Enter your username here"
            onChange={(ev) => setUserName(ev.target.value)}
            className="inputBox"
          />
          <label className="errorLabel">{userNameError}</label>
        </div>

        {/* Password-container */}
        <div className="inputContainer-3 relative">
          <label htmlFor="inputBox">Password <span className="text-red-700">*</span></label>
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            placeholder="Enter your password here"
            onChange={(ev) => setPassword(ev.target.value)}
            className="inputBox"
          />
          <div className="password-icon" onClick={togglePasswordVisibility}>
            {passwordVisible ? <FaRegEye /> : <FaRegEyeSlash />}
          </div>
          <label className="errorLabel">{passwordError}</label>
        </div>
      </div>

      <div className="forgot-pass flex">
        <p className="text-orange-400 font-semibold">Forgot Password</p>
      </div>

      {/* Checkbox */}
      <div className="checkbox-container flex items-center">
        <input
          type="checkbox"
          id="checkbox"
          className="checkbox-input cursor-pointer"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="checkbox" className="checkbox-label">
          I agree with <span className="span-1 text-orange-400">Terms of Service</span> and <span className="span-2 text-orange-400">Privacy Policy</span>
        </label>
      </div>

      {/* Button */}
      <div className="button-container">
        <input
          className="inputButton text-white"
          type="button"
          onClick={onButtonClick}
          value="Register"
        />
      </div>

      {/* Option-div */}
      <div className="option-div">
        <div className="line-div"></div>
        <span>Or sign up with</span>
        <div className="line-div"></div>
      </div>

      {/* Google-icon */}
      <div className="google-icon">
        <FcGoogle className="h-9" />
      </div>

      <div className="register-div">
        <p className="font-medium font-serif">
          Have an account? <span className="text-orange-500" onClick={handleRegister}>Sign In</span>
        </p>
      </div>

      <Footer color="gray-500" />
    </div>
  );
};

export default Register;
