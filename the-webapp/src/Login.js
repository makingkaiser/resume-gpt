import { useState } from "react"

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const usernameHandler = (event) => {
        setUsername(event.target.value)
    }
    const passwordHandler = (event)=> {
        setPassword(event.target.value)
    }

    return (
        <div className='Login'>
            <form className="form">
                <input value={username}
                    onChange={usernameHandler} 
                    type='text' 
                    placeholder='Username' 
                    className="username" />
                <input value={password}
                    onChange={passwordHandler}
                    type='text' 
                    placeholder='Password' 
                    className="password" />
                <button className="button"> Login </button>
            </form>
        </div>
    )
}