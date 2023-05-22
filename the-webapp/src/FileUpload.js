import React from 'react';
import { useState } from 'react';
// import { MdCloudUpload, MdDelete } from 'react-icons/md';
// import { AiFillFile } from 'react-icons/ai';
import './FileUpload.css';

export default function FileUpload() {
    const [file, setFile] = useState();
    function handleFile(event) {
        setFile(event.target.files[0])
        console.log(event.target.files[0])
    }
    
    return (
        <div>
            <form className='input'>
                <input type="file" name="file"
                    onClick={handleFile} />
                <button>Upload</button>
            </form>
        </div>
    );
}