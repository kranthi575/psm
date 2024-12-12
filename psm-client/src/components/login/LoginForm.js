import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidateToken } from '../utils/ValidateToken';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg,setMsg]=useState(null);
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    // Add login logic here
    const url = `http://localhost:8080/appUserLogin?username=${email}&password=${password}`;

    // Basic auth header
    const authHeader = 'Basic ' + btoa(`${email}:${password}`);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        console.log('Login successful:', data);
        //setting jwt token in local storage
        // Define the object
        const authData = {
          username: email,
          jwttoken: data.jwtToken
        };

        // Store the object in localStorage
        localStorage.setItem("authData", JSON.stringify(authData));

        setMsg("Login successful!!")
        navigate("./home");
        // Handle successful login
      } 
      if(response.status === 401)
      {
        console.log('Login failed:', response.status);
        
        setMsg("Login failed!!invalid uname/pwd")
        // Handle login failure
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        
        Login
      </button>
      {msg!=null?<p className='text-blue-600'>{msg}</p>:null}
    </form>
  );
};

export default LoginForm;
