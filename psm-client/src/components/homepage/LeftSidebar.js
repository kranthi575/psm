import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StompSessionProvider } from 'react-stomp-hooks';
const LeftSidebar = ({setCreatePostPopUp}) => {

const navigate=useNavigate();

  function handleCreatePost(){
    setCreatePostPopUp(true);
    console.log("create post actived");
  }
  function handleCreateAcct(){
    navigate('/register')
  }

  function handleLogout(){
     // Remove the JWT token from localStorage or sessionStorage
     localStorage.removeItem('authData'); // if stored in localStorage
     // or sessionStorage.removeItem('authData'); // if stored in sessionStorage
 
     // Optionally redirect to the login page or home page after logout
     navigate("/") // or window.location.replace('/login');
  }

  const storedAuthData = localStorage.getItem('authData');
  const authData=JSON.parse(storedAuthData)
   // WebSocket URL for the Stomp provider (replace with actual WebSocket server URL)
   const webSocketUrl = "http://localhost:8080/ws";  // Replace with your WebSocket URL

   // Pass JWT token in the headers for authentication in Stomp connection
   const headers = authData ? { Authorization: `Bearer ${authData.jwttoken}` } : {};
 
  
  return (
    
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
    <div className="w-1/4 bg-gray-100 p-4">
      <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600">Home</button>
      <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600">Explore</button>
      
      <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>handleCreatePost()}>Create Post</button>
      <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600">Notifications</button>
      <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>{navigate("/inbox")}}>Messages</button>

      <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>handleCreateAcct()}>Create Account</button>
      
      <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>{navigate('/createFmgrp')}}>Create Family Group</button>
      <button className="w-full py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>{handleLogout()}}>Logout</button>
    
    
    </div>
    </StompSessionProvider>
  );
};

export default LeftSidebar;
