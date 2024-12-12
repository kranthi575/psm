import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ userData }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home'); // Redirect to the home page
  };

  return (
    <div className="flex items-center mb-6 justify-between">
      {/* Profile Image */}
      <div className="flex items-center space-x-4">
        <img
          src={`https://gateway.pinata.cloud/ipfs/${userData.familyDp}`}  // Assuming 'familyDp' contains the CID of the image
          alt={userData.profilename}
          className="w-16 h-16 rounded-full object-cover transform transition-transform duration-300 hover:scale-110"  // Zoom on hover
        />
        <div>
          <p className="font-semibold text-xl">{userData.profilename}</p>
          <p className="text-sm text-gray-600">Logged In</p>
        </div>
      </div>
      
      {/* Home Button */}
      <button
        onClick={handleHomeClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Home
      </button>
    </div>
  );
};

export default UserInfo;
