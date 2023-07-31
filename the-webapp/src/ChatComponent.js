import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Message } from "@chatscope/chat-ui-kit-react";
import "./ChatComponent.css";

axios.defaults.baseURL = 'http://makingkaiser.pythonanywhere.com';

axios.defaults.headers.post["Content-Type"] = "application/json";

export default function ChatComponent({ namespace }) {
  const [userQuery, setUserQuery] = useState("");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! Built by Kaiser, I am capable of answering any questions you may have about him and his experience. Just try not to spam the bot as the API is paid for by me, but feel free to ask as much as you like!",
      sender: "ChatGPT",
    },
    {
      message:
        "Kaiser is a Year 2 Data Science and Analytics student at NUS. He has a strong interest in generative LLMs and their capabilities. During his Year 1 summer break, he developed a full-stack web application called OrbitAI, which created customized chatbots that could learn new information through user-submitted files and answer questions based on what they had learned. He also has experience in multimedia design, including publicity media, shooting and editing videos. In his free time, he likes to go Rock climbing.",
      sender: "ChatGPT",
    },
  ]);
  
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitHandler = async (event) => {
    event.preventDefault();

    const newMessage = {
      message: userQuery,
      sender: "user",
      direction: "outgoing",
    };
    const accumMessages = [...messages, newMessage];
    setMessages(accumMessages);
    setUserQuery("");

    try {
      const thinkingMessage = {
        message: "Thinking...",
        sender: "ChatGPT",
      };
      setMessages([...accumMessages, thinkingMessage]);

      const response = await axios.post(`/api/execute-gpt-query/${namespace}`, {
        input: userQuery,
      });

      setMessages([
        ...accumMessages,
        {
          message: response.data.output,
          sender: "ChatGPT",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const queryChangeHandler = (event) => {
    setUserQuery(event.target.value);
    setIsSubmitDisabled(event.target.value === "");
  };

  return (
    <div className="submit-user-query">
      <div className="container">

        <div className="header">
          <h1>Kaiser's Resume</h1>

        </div>
        <div className="body">
          {messages.map((message, i) => {
            return (
              <div
                key={i}
                className={`message-container ${
                  message.sender === "ChatGPT" ? "left" : "right"
                } ${i === messages.length - 1 ? "last" : ""}`}
              >
                <Message
                  model={message}
                  className={`message ${
                    i === messages.length - 1 ? "new-message" : ""
                  }`}
                />
              </div>
            );
          })}
          <div ref={messageEndRef} />
        </div>

        <div className="footer">
          <form onSubmit={submitHandler}>
            <label htmlFor="message-input" hidden>
              Type your message
            </label>
            <input
              type="text"
              id="message-input"
              placeholder="Ask me anything"
              value={userQuery}
              onChange={queryChangeHandler}
            />
            <button type="submit" disabled={isSubmitDisabled}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}