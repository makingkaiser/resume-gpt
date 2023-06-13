import React from 'react';
import { useState } from 'react';
import axios from "axios";
import './FileUpload.css';
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json";


export default function FileUpload() {
    const [file, setFile] = useState(null);

    function handleFile(event) {
        setFile(event.target.files[0])
        console.log(event.target.files[0])
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        const data = new FormData();
        data.append('file', file);

        const response = await axios.post("/upload", data)
            .then((e) => {
                console.log("Upload Success!")
            })
            .catch((e) => {
                console.error("Error", e);
            });
    };

    return (
        <div className='upload'>
            <form action="#" onSubmit={submitHandler}>
                <h1> Upload your file</h1>
                    <input type="file"
                        onChange={handleFile} />
                <button> Upload </button>
            </form>

        </div>

    );
}