import React, { useState } from "react";
//from the styles folder import the Chatbot.css file
import "../Styles/Chatbot.css";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendClick = async () => {
    // Add user message to chat history
    setMessages([...messages, { text: userInput, sender: "user" }]);

    try {
      // Send user input to Gemini API and get response
      const response = await fetchGeminiResponse(userInput);
      // Add Gemini's response to chat history
      setMessages([...messages, { text: response, sender: "gemini" }]);
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      // Handle errors gracefully (e.g., display an error message)
    }

    setUserInput(""); // Clear input field
  };

  // Function to fetch response from Gemini API
  const fetchGeminiResponse = async (prompt) => {
    const apiKey = "YOUR_API_KEY"; // Replace with your actual Gemini API key

    try {
      const response = await fetch("https://api.gemini.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          // Other parameters as needed (e.g., model, max_tokens)
        }),
      });

      if (!response.ok) {
        throw new Error("Gemini API request failed");
      }

      const data = await response.json();
      return data.choices[0].text.trim();
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
      throw error;
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        <div className="chat-messages">
          {/* Display chat messages */}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask ClamiBot anything about disasters..."
          />
          <button onClick={handleSendClick}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
