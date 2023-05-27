import React, { useState } from "react";
import axios from "axios";
import "./SubmitUserQueryButton.css";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";
export default function SubmitUserQuery() {
  const [userQuery, setUserQuery] = useState("");
  const [output, setOutput] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("/api/execute-gpt-query", {
        input: userQuery,
      });
      
      setOutput(response.data.output);
    } catch (error) {
      console.error(error);
    }
  };

  const queryChangeHandler = (event) => {
    setUserQuery(event.target.value);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Ask me anything"
          onChange={queryChangeHandler}
        />
        <div>
          <button className="pill" type="submit">
            Submit
          </button>
        </div>
      </form>
      {output && <div>{output}</div>}
    </div>
  );
}
