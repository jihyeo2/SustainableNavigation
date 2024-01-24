"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../css/fonts.css'        // Import External Fonts

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // State to track email validity
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [errorEmailMessage, setErrorEmailMessage] = useState('');
  const [errorPwdMessage, setErrorPwdMessage] = useState('');
  const router = useRouter();

  // Password validation function
  const validatePassword = (password: string) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return password.match(passwordPattern);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isEmailValid = email.match(emailPattern);
    console.log(email)

    if (!isEmailValid) {
      setIsValidEmail(false);
      setErrorEmailMessage('Invalid email format. Please enter a valid email address.');
      return;
    } else {
      setIsValidEmail(true);
      setErrorEmailMessage('');
    }

    // Validate the password
    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid) {
      setIsValidPassword(false);
      setErrorPwdMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.');
      return;
    } else {
      setIsValidPassword(true);
      setErrorPwdMessage('');
    }

    let firstname = firstName;
    let lastname = lastName;

    // Prepare the data to send in the POST request
    const userData = {
      password,
      email,
      firstname,
      lastname
    };

    try {
      const response = await fetch('https://cs-3300-397421.ue.r.appspot.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.status === 201) {
        // Redirect to the dashboard after successful sign-up
        router.push('/login');
      } else {
        // Handle any error conditions if necessary
        const data = await response.json();
        console.error('Signup failed:', data.error);
      }
    } catch (error) {
      console.error('Error while signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSignUp} className="max-w-md mx-auto p-4 border rounded-lg bg-black bg-opacity-30">
      <div className="mb-4">
        <label htmlFor="first name" className="block font-semibold">First Name:</label>
        <input
        type="text"
        id="name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full border p-2 rounded text-black"
        required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="last name" className="block font-semibold">Last Name:</label>
        <input
        type="text"
        id="name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full border p-2 rounded text-black"
        required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full border p-2 rounded ${
            isValidEmail ? 'text-black' : 'text-red-500'
          }`}
          required
        />
      </div>
      {isValidEmail ? null : (
        <p className="text-red-500 text-sm mb-2 p-2 rounded bg-black bg-opacity-50 shadow-md">{errorEmailMessage}</p>
      )}
      <div className="mb-4">
        <label htmlFor="password" className="block font-semibold">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full border p-2 rounded ${
            isValidPassword ? 'text-black' : 'text-red-500'
          }`}
          required
        />
      </div>
      {isValidPassword ? null : (
        <p className="text-red-500 text-sm mb-2 p-2 rounded bg-black bg-opacity-50 shadow-md">{errorPwdMessage}</p>
      )}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Sign Up
      </button>
    </form>
  );
};

export default SignUp;
