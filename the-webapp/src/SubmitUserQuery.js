import React, { useState } from "react";
import axios from "axios";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import "./SubmitUserQueryButton.css";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function SubmitUserQuery() {
  const [userQuery, setUserQuery] = useState("");
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am OrbitAI",
      sender: "ChatGPT"
    }
  ])

  const submitHandler = async (event) => {
    event.preventDefault();
    
    const newMessage = {
      message: userQuery,
      sender: "user",
      direction: "outgoing"
    }
    const accumMessages = [...messages, newMessage];
    setMessages(accumMessages);

    try {
      const response = await axios.post("/api/execute-gpt-query", {
        input: userQuery,
      });

      setReply([...accumMessages, {
        message: response.data.output,
        sender: "ChatGPT"
      }]);

    } catch (error) {
      console.error(error);
    }
  };

  const queryChangeHandler = (event) => {
    setUserQuery(event.target.value);
    
  };

  return (
    <div>
      <div> messages </div>
      <div className="chat">
        <MainContainer>
          <ChatContainer>
            <MessageList>
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}
            </MessageList>
          </ChatContainer>
          </MainContainer>

          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Ask me anything"
              value={userQuery}
              onChange={queryChangeHandler}
            />
            <div>
              <button className="pill" type="submit">
                Submit
              </button>
            </div>
          </form>
      </div>

      {reply && <div>{reply}</div>}
    </div>
  );
}
