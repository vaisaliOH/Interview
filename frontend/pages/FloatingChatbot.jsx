import React, { useState } from 'react';
import './FloatingChatbot.css';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: 'user', text: prompt };
    setMessages(prev => [...prev, userMessage]);

    try {
      const res = await fetch('https://interview-d45g.onrender.com/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      const botMessage = { sender: 'bot', text: data.message || 'No reply' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error talking to bot.' }]);
    }

    setPrompt('');
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>💬</button>

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>AI Assistant</span>
            <button onClick={toggleChat}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask something..."
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbot;
