// ClamiBot.js
import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const systemMessage = {
  role: "system",
  content:
    "My name is KalamBot, I am designed to help with disaster management, preparedness, and response. Ask me anything related to these topics. I can give steps to take during a disaster, provide emergency contact information, and more.",
};

function ClamiBot() {
  const [messages, setMessages] = useState([
    {
      message: "Hey, this is KalamBot! How can I help you today?",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === "ChatGPT" ? "assistant" : "user",
      content: messageObject.message,
    }));

    const apiRequestBody = {
      model: "gpt-3.5-turbo-0125",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <MainContainer>
      <ChatContainer className="chat-container">
        <MessageList
          scrollBehavior="smooth"
          typingIndicator={
            isTyping ? (
              <TypingIndicator content="ClamiBot is typing..." />
            ) : null
          }
        >
          {messages.map((message, i) => (
            <Message
              key={i}
              model={{
                message: message.message,
                direction: message.direction,
                position:
                  message.direction === "incoming" ? "single" : "normal",
              }}
            >
              {message.message}
            </Message>
          ))}
        </MessageList>
        <MessageInput
          placeholder="Type your question here"
          onSend={handleSend}
        />
      </ChatContainer>
    </MainContainer>
  );
}

export default ClamiBot;
