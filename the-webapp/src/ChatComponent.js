import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Message } from '@chatscope/chat-ui-kit-react';
import './ChatComponent.css';
import FileAdd from './FileAdd';


//axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'https://convoagent.onrender.com'


axios.defaults.headers.post['Content-Type'] = 'application/json';


export default function ChatComponent({ namespace }) {
  const [userQuery, setUserQuery] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [messages, setMessages] = useState([
    {
      message: 'Hello, My name is OrbitAI! I am a chatbot that can answer questions about your document. Reading your document...',
      sender: 'ChatGPT',
    },
  ]);
  const prevNamespaceRef = useRef();

  useEffect(() => {
    if (namespace && prevNamespaceRef.current !== namespace) {
      axios.post(`/api/execute-gpt-query/${namespace}`, {
        input: `using the Document search, describe the content as best you can in the following format:
      Hello, My name is OrbitAI! your document is about <insert the overview here>
      
      `
      })
        .then(response => {
          const message1 = {
            message: response.data.output,
            sender: 'ChatGPT',
          };
          setMessages([...messages, message1]);

          axios.post(`/api/execute-gpt-query/${namespace}`, {
            input: `based on the document search, generate a list of 3-4 questions that encapsulate the main points of the document that you definitely know the answer to, in the format:
          Here are some questions I can answer:
          <insert questions here>
          `
          })
            .then(response => {
              const message2 = {
                message: response.data.output,
                sender: 'ChatGPT',
              };
              setMessages([...messages, message1, message2]);
            })
            .catch(error => {
              console.error(error);
            });
        })
        .catch(error => {
          console.error(error);
        });
    }

    prevNamespaceRef.current = namespace;
  }, [namespace]);
  const submitHandler = async (event) => {
    event.preventDefault();

    const newMessage = {
      message: userQuery,
      sender: 'user',
      direction: 'outgoing',
    };
    const accumMessages = [...messages, newMessage];
    setMessages(accumMessages);
    setUserQuery('');

    try {
      const thinkingMessage = {
        message: 'Thinking...',
        sender: 'ChatGPT',
      };
      setMessages([...accumMessages, thinkingMessage]);

      const response = await axios.post(`/api/execute-gpt-query/${namespace}`, {
        input: userQuery,
      });

      setMessages([
        ...accumMessages,
        {
          message: response.data.output,
          sender: 'ChatGPT',
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const queryChangeHandler = (event) => {
    setUserQuery(event.target.value);
    setIsSubmitDisabled(event.target.value === '');
  };

  return (
    <div className="submit-user-query">

      <div className="container">
        <div className="header">
          <h1>OrbitAI Chat</h1>
        </div>
        <div className="namespace">
          Current namespace: {namespace}
        </div>
        <div className="body">
          {messages.map((message, i) => {
            return <Message key={i} model={message} />;
          })}
        </div>

        <div className="footer">
          <form onSubmit={submitHandler}>
          <label htmlFor="message-input" hidden>Type your message</label>
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
          <FileAdd namespace={namespace} />
        </div>
      </div>
    </div>
  );
}