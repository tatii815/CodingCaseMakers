import React, { useState } from "react";

function ChatBot({ onSend }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Ask me anything about our products or inventory.",
    },
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const botResponse = await onSend(input);
      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error getting response." },
      ]);
    }

    setInput("");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Makers Tech ChatBot</h2>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
        }}
      >
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{ textAlign: msg.sender === "user" ? "right" : "left" }}
          >
            <p>
              <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong>{" "}
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask about our inventory..."
        style={{ width: "80%", padding: 8 }}
      />
      <button onClick={handleSend} style={{ padding: 8 }}>
        Send
      </button>
    </div>
  );
}

export default ChatBot;
