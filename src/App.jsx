import React from "react";
import ChatBot from "./ChatBot";
import { getChatbotResponse } from "./openai";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <ChatBot onSend={getChatbotResponse} />
    </div>
  );
}

export default App;
