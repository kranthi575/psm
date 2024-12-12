import React from 'react';

const MessageInput = ({ newMessage, setNewMessage, handleSendMessage }) => {

    
  return (
    <div className="mt-4 flex items-center">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-l-lg"
        placeholder="Type a message..."
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
