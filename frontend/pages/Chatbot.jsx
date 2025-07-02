// import React, { useState } from "react";
// import "./Chatbot.css"; 

// const Chatbot = ({ onClose }) => {
//   const [messages, setMessages] = useState([
//     { text: "Hi! I'm your Interview Bot 🤖. Ask me anything!", type: "bot" },
//   ]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { text: input, type: "user" }];
//     let botReply = "";

//     if (input.toLowerCase().includes("tip")) {
//       botReply = "Tip: Always ask clarifying questions in interviews!";
//     } else if (input.toLowerCase().includes("suggest")) {
//       botReply = "Try solving: ‘Find the longest palindromic substring.’";
//     } else {
//       botReply = "I'm not sure I understand. Try asking for a tip or suggestion!";
//     }

//     setMessages([...newMessages, { text: botReply, type: "bot" }]);
//     setInput("");
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot-header">
//         <span>Interview Bot 🤖</span>
//         <button onClick={onClose}>✖</button>
//       </div>
//       <div className="chatbot-messages">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`chatbot-message ${msg.type === "bot" ? "bot" : "user"}`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="chatbot-input">
//         <input
//           type="text"
//           placeholder="Type your message..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chatbot;
