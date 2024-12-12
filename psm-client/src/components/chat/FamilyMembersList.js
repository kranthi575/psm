import React from 'react';

const FamilyMembersList = ({ familyGrpsMembers, setSelectedMember, selectedMember }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Family Group</h2>
      <div className="space-y-4">
        {familyGrpsMembers.length > 0 ? (
          familyGrpsMembers.map((member, index) => (
            <div
              key={index}
              className={`p-2 cursor-pointer hover:bg-gray-200 rounded ${
                selectedMember?.userid === member.userid ? 'bg-gray-300' : ''
              }`}
              onClick={() => {
                console.log('Selected member:', member); // Debugging log
                setSelectedMember(member); // This now correctly calls selectMember from Inbox
              }}
            >
              <p className="font-semibold">{member.profilename}</p>
              <p className="text-sm text-gray-600">Family Member</p>
            </div>
          ))
        ) : (
          <p>No family members available</p>
        )}
      </div>
    </div>
  );
};

export default FamilyMembersList;
