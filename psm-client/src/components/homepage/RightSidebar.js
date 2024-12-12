import React, { useEffect, useState } from 'react';
import CurrentUserDetails from '../utils/CurrentUserDetails';
import CurrentFamilyDetails from '../utils/CurrentFamilyDetails';
import ActiveFamilyCid from '../utils/ActiveFamilyCid';
import ActiveUserCid from '../utils/ActiveUserCid';

import FamilyGroup from '../RightSidebarComp/FamilyGroup';
import FamilyMembers from '../RightSidebarComp/FamilyMembers';
import Loading from '../RightSidebarComp/Loading';
import UserProfileInfo from '../RightSidebarComp/UserProfileInfo';

const RightSidebar = () => {
  const [userData, setUserData] = useState(null);
  const [familyMembers, setFamilyMembers] = useState(null);
  const [activeFamilyCid, setActiveFamilyCid] = useState(null);
  const [activeUserCid, setActiveUserCid] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await CurrentUserDetails();
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFamilyDetails = async () => {
      if (userData) {
        try {
          const familyMembers = await CurrentFamilyDetails(userData.familyid);
          setFamilyMembers(familyMembers);
          const familyCid = await ActiveFamilyCid(userData.familyid);
          setActiveFamilyCid(familyCid);
          const userCid = await ActiveUserCid(userData.userid);
          setActiveUserCid(userCid);
        } catch (error) {
          console.error("Error fetching family details:", error);
        }
      }
    };
    fetchFamilyDetails();
  }, [userData]);

  if (!userData) return <Loading />;

  return (
    <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg">
      <UserProfileInfo userData={userData} userCid={activeUserCid} />
      <FamilyGroup familyId={userData.familyid} familyCid={activeFamilyCid} />
      <FamilyMembers members={familyMembers} />
    </div>
  );
};

export default RightSidebar;
