import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:5000'); // Adjust URL to your WebSocket server

    socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    socket.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };

    return () => socket.close();
  }, []);

  const sendMessage = () => {
    const socket = new WebSocket('ws://localhost:5000'); // Same WebSocket URL
    socket.onopen = () => {
      socket.send(input); // Send the input message
      setInput(''); // Clear input field after sending
    };
  };

  return (
    <div>
      <h2>Chat Support</h2>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
