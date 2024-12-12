import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidateToken } from '../utils/ValidateToken';
import MessageInput from '../chat/MessageInput';
import UserInfo from '../chat/UserInfo';
import FamilyMembersList from '../chat/FamilyMembersList';
import MessageBox from '../chat/MessageBox';
import CurrentUserDetails from '../utils/CurrentUserDetails';
import CurrentFamilyDetails from '../utils/CurrentFamilyDetails';
import { useStompClient } from 'react-stomp-hooks';
import FetchPreviousMsgs from '../chat/FetchPreviousMsgs';

const Inbox = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [familyGrpsMembers, setFamilyGrpsMem] = useState([]);
  const [userData, setUserData] = useState(null);
  const [authInfo, setAuthInfo] = useState(null);
  const navigate = useNavigate();
  const stompClient = useStompClient();
  const subscriptionRef = useRef(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Ensure that userData and selectedMember are not null
        if (userData && selectedMember) {
          const previousMessages = await FetchPreviousMsgs(userData.userid, selectedMember.userid, authInfo);
          previousMessages.map((msg) => {
           // console.log("msg...", msg);
          });
          setMessages((prevMessages) => ({
            ...prevMessages,
            [selectedMember.userid]: previousMessages,
          }));
        }
      } catch (error) {
        console.error("Error fetching previous messages:", error);
      }
    };
  
    loadMessages();
  }, [selectedMember, userData, authInfo]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const currentUserData = async () => {
    try {
      const response = await CurrentUserDetails();
      setUserData(response);
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };

  const currentFamilyidDetails = async () => {
    if (userData?.familyid) {
      try {
        const respo = await CurrentFamilyDetails(userData.familyid);
        setFamilyGrpsMem(respo);
      } catch (error) {
        console.error('Error fetching family details:', error);
      }
    }
  };

  const tokenValidation = async () => {
    const storedAuthData = localStorage.getItem('authData');
    if (!storedAuthData) {
      navigate('/');
      return;
    }

    const authData = JSON.parse(storedAuthData);
    setAuthInfo(authData);

    const response = await ValidateToken(authData.username, authData.jwttoken);
    if (response.status !== 200) {
      navigate('/');
    } else {
      console.log('User verified, allowed for home page');
    }
  };

  const selectMember = (member) => {

    //load previous message
    //senderId_ReceivedId
    ///messages/{senderId}/{receiverId}

    console.log("selected memeber :: "+member.userid)

    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }
    // /queue/user/{senderid}/{receiverid}

    console.log("queue/user/"+member.userid+"/"+authInfo.username)
    if (stompClient) {
      subscriptionRef.current = stompClient.subscribe(
        `/queue/user/${member.userid}`,
        (message) => {
          try {
            console.log(" /queue/user/"+member.userid+"/"+authInfo.username);
            const newMessage = JSON.parse(message.body);
              console.log("newmsg :: "+newMessage)
            setMessages((prevMessages) => ({
              ...prevMessages,
              [member.userid]: [...(prevMessages[member.userid] || []), newMessage],
            }));
          } catch (error) {
            console.error('Error processing WebSocket message:', error);
          }
        }
      );      
    }
    setSelectedMember(member);

    // Fetch previous messages
 
  
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedMember) {
      const messageData = {
        senderId: userData?.userid,
        receiverId: selectedMember?.userid,
        message: newMessage,
        timestamp: new Date().toISOString(),
      };

      if (stompClient) {
        stompClient.publish({
          destination: '/app/chat',
          body: JSON.stringify(messageData),
        });

        setMessages((prevMessages) => ({
          ...prevMessages,
          [selectedMember.userid]: [...(prevMessages[selectedMember.userid] || []), messageData],
        }));
        setNewMessage('');
      } else {
        console.error('Stomp client is not connected');
      }
    }
  };

  useEffect(() => {
    tokenValidation();
    currentUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      currentFamilyidDetails();
    }
  }, [userData]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-100 p-4">
        <UserInfo userData={userData} />
        <FamilyMembersList
          familyGrpsMembers={familyGrpsMembers}
          setSelectedMember={selectMember}
          selectedMember={selectedMember}
        />
      </div>

      <div className="w-3/4 bg-white p-4 flex flex-col">
        {selectedMember ? (
          <>
            <MessageBox messages={messages[selectedMember.userid] || []} userData={userData} />
            <MessageInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Select a family member to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
