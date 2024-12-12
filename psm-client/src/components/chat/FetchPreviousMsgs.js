const FetchPreviousMsgs = async (senderId, receiverId, authInfo) => {
    if (!senderId || !receiverId) {
      console.error("Sender ID or Receiver ID is missing");
      return [];
    }
  
    try {
      const response = await fetch(`http://localhost:8080/messages/${senderId}/${receiverId}`, {
        method: 'GET', // Assuming it's a GET API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authInfo?.jwttoken}`, // Include the JWT token if needed
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching messages: ${response.statusText}`);
      }
  
      const data = await response.json(); // Assuming the API returns JSON data
      return data; // Return the list of messages
    } catch (error) {
      console.error("Error fetching previous messages:", error);
      return [];
    }
  };
  
  export default FetchPreviousMsgs;