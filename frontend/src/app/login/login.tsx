"use client";

// login/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../css/fonts.css'        // Import External Fonts

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(0);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    // Create a Basic Auth header by encoding the email and password
    const basicAuth = btoa(`${email}:${password}`); // Base64 encode email:password

    // Make a POST request to your authentication endpoint with Basic Auth header
    try {
      const response = await fetch('https://cs-3300-397421.ue.r.appspot.com/auth/login', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${basicAuth}`
        }
      });

      if (response.ok) {
        // Successful login, redirect to the dashboard
        const body = await response.json();
        const token = body.jwt;
        localStorage.setItem('jwtToken', token);
        setLoginSuccess(1);
        router.push('/search/?token=' + token);

      } else {
        setLoginSuccess(2);
      }
    } catch (error) {
      // Handle network or other errors
      setLoginSuccess(2);
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4 border rounded-lg bg-black bg-opacity-30">
      <div className="mb-4">
        <label htmlFor="email" className="block font-semibold">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-semibold">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded text-black"
          required
        />
      </div>
      {loginSuccess === 2 ? (
        <p className="text-red-500 text-sm mb-2 p-2 rounded bg-black bg-opacity-50 shadow-md">Invalid email or password.</p>
      ) : null}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Login
      </button>
    </form>
  );
};

export default Login;
