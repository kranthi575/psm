import React from 'react';

const FamilyMembers = ({ members }) => {
  if (!members) return <p className="text-gray-600">No family members available.</p>;

  return (
    <div>
      <h3 className="font-bold text-lg mt-8 text-gray-700">Family Members</h3>
      <div className="space-y-4">
        {members.map((member, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
            <div>
              <p className="font-semibold text-gray-800">{member.profilename}</p>
              <button className="mt-1 text-blue-500 text-sm hover:underline">Follow</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyMembers;
