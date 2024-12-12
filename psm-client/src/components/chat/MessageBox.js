import React from 'react';

const MessageBox = ({ messages, userData }) => {
  console.log("MessageBox :: messages length: ", messages.length, " userId: ", userData.userid);

  // Sort messages by timestamp (ascending order)
  const sortedMessages = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="space-y-4">
        {sortedMessages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.senderId === userData.userid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${message.senderId === userData.userid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              <p>{message.message}</p>
              <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBox;
