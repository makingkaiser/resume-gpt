import React, { useState } from "react";
import axios from "axios";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {Message} from '@chatscope/chat-ui-kit-react';
import "./SubmitUserQueryButton.css";
axios.defaults.baseURL = "https://convoagent.onrender.com";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default function SubmitUserQuery() {
  const [userQuery, setUserQuery] = useState("");
  // const [reply, setReply] = useState("");
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am OrbitAI. Ask me anything!",
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
    setUserQuery('');

    try {
      const response = await axios.post("/api/execute-gpt-query", {
        input: userQuery,
      });

      setMessages([...accumMessages, {
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
      <div className="container">
        <div className="header">
          <h1> OrbitAI Chat</h1>
        </div>
        <div className="body">
          {messages.map((message, i) => {
            return <Message key={i} model={message} />
          })}
        </div>
        <div className="footer">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Ask me anything"
              value={userQuery}
              onChange={queryChangeHandler}
            />
            <button className="button" type="submit"> Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
