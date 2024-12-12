import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginRegister from "./components/login/LoginRegister";
import HomePage from "./components/homepage/HomePage";
import CreateAcct from "./components/login/CreateAcct";
import CreateFamilyGrp from "./components/login/CreateFamilyGrp";
import EditProfile from "./components/RightSidebarComp/EditProfile";
import Inbox from "./components/LeftSidebarComp/Inbox";
import { StompSessionProvider } from "react-stomp-hooks";
import { ValidateToken } from './components/utils/ValidateToken';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState(null);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const storedAuthData = localStorage.getItem('authData');
      
      // If there's no auth data, set isAuthenticated to false and exit
      if (!storedAuthData) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const parsedAuthData = JSON.parse(storedAuthData);
        if (parsedAuthData && parsedAuthData.username && parsedAuthData.jwttoken) {
          // Validate the token with an API call
          const response = await ValidateToken(parsedAuthData.username, parsedAuthData.jwttoken);
          
          if (response.status !== 200) {
            localStorage.removeItem('authData'); // Remove invalid authData
            setIsAuthenticated(false); // Set authentication to false
          } else {
            console.log("User verified, allowed for ws connection");
            setAuthData(parsedAuthData);
            setIsAuthenticated(true); // Set authentication to true
          }
        } else {
          console.log('Invalid authData');
          localStorage.removeItem('authData');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error parsing authData or validating token:', error);
        localStorage.removeItem('authData');
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []); // The empty dependency array ensures this runs only once when the component mounts.

  // WebSocket URL for the Stomp provider (replace with actual WebSocket server URL)
  const webSocketUrl = "http://localhost:8080/ws";  // Replace with your WebSocket URL

  // Pass JWT token in the headers for authentication in Stomp connection
  const headers = authData ? { Authorization: `Bearer ${authData.jwttoken}` } : {};

  const router = createBrowserRouter([
    {
      path: '/home',
      element: <HomePage />
    },
    {
      path: '/',
      element: <LoginRegister />
    },
    {
      path: '/register',
      element: <CreateAcct />
    },
    {
      path: '/createFmgrp',
      element: <CreateFamilyGrp />
    },
    {
      path: '/editProfile',
      element: <EditProfile />
    },
    {
      path: '/inbox',
      element: <Inbox />
    },
    {
      path:'/createFamilyGroup',
      element:<CreateFamilyGrp/>
    }
  ]);

  return (
    <>
      
        <StompSessionProvider
          url={webSocketUrl}
          connectHeaders={headers}
          onConnect={() => {
            console.log("WebSocket connected successfully");
          }}
          onError={(error) => {
            console.error("WebSocket connection error:", error);
          }}
        >
          <RouterProvider router={router} />
        </StompSessionProvider>
      
    </>
  );
}

export default App;
