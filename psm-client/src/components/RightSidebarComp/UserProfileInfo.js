import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfileInfo = ({ userData, userCid }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <h3 className="font-bold text-lg mb-4 text-gray-700">User Info</h3>
      <div className="bg-white p-6 rounded-lg shadow flex items-center gap-6">
        {/* Profile Image with Button to Edit Profile */}
        <button onClick={() => navigate('/editProfile')} className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
          {/* Display profile image from IPFS if CID is available */}
          {userCid ? (
            <img
              src={`https://gateway.pinata.cloud/ipfs/${userCid}`}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-400 flex items-center justify-center text-white">No Image</div>
          )}
        </button>
        
        <div>
          {/* Display profile name and user ID */}
          <p className="font-semibold text-gray-800">Profile Name: {userData.profilename}</p>
          <p className="text-gray-600 text-sm">User ID: {userData.userid}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
