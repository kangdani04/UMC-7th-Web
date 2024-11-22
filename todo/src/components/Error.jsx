import React from "react";
import ErrorAni from "../assets/Error.gif";

const Error = () => {
    return (
        <div>
            <h3>error</h3>
            <img src={ErrorAni} alt="에러" width="20%" />
        </div>
    );
};

export default Error;