import React from 'react';

const FamilyGroup = ({ familyId, familyCid }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4 text-gray-700">Family Group</h3>
      <p className="font-semibold text-gray-800">Family ID: {familyId}</p>
      
      <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden mt-2">
        {/* Display image only if familyCid exists */}
        {familyCid && (
          <img
            src={`https://gateway.pinata.cloud/ipfs/${familyCid}`}
            alt="Family Group"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default FamilyGroup;
