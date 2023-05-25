import { useState } from "react";
import "./SubmitUserQueryButton.css";
export default function SubmitUserQuery() {
    const [userQuery, setUserQuery] = useState("");
    const submitHandler = (event) => {
        event.preventDefault();
        // default behavior of a form is to refresh the page, and this prevents that
        console.log(userQuery)
        // for now console.log the userQuery, but later we will send it to the backend
    }
    const queryChangeHandler = (event) => {
        setUserQuery(event.target.value);
    }



  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Ask me anything"
        onChange={queryChangeHandler}
      />
      <div>
      <button className='pill' type="submit"> LFG! </button>
      </div>

    </form>
  );
}
