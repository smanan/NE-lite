import React from 'react';
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { AiFillCaretLeft } from "react-icons/ai";

const BackButton = () => {
    return(
        <button className='backbtnbox ' onClick={() => window.location = "https://ne-lite.com/" }> Back To Home</button>
    )
}

export default BackButton