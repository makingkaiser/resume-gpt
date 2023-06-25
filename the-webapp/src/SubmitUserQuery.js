import React, { useState } from 'react';
import axios from 'axios';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Message } from '@chatscope/chat-ui-kit-react';
import './SubmitUserQuery.css';

axios.defaults.baseURL = 'https://convoagent.onrender.com';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default function SubmitUserQuery({ namespace, onNamespaceUpdate }) {
  const [userQuery, setUserQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      message: 'Hello, I am OrbitAI. Ask me anything!',
      sender: 'ChatGPT',
    },
  ]);

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
};

return React.createElement(
  "div",
  { className: "submit-user-query" },
  React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "header" },
      React.createElement("h1", null, "OrbitAI Chat")
    ),
    React.createElement(
      "div",
      { className: "body" },
      messages.map((message, i) => {
        return React.createElement(Message, { key: i, model: message });
      })
    ),
    React.createElement(
      "div",
      { className: "footer" },
      React.createElement(
        "form",
        { onSubmit: submitHandler },
        React.createElement("input", {
          type: "text",
          placeholder: "Ask me anything",
          value: userQuery,
          onChange: queryChangeHandler,
        }),
        React.createElement(
          "button",
          { className: "button", type: "submit" },
          "Submit"
        )
      )
    )
  )
);
}
