import React from "react";
import Spinner from "../assets/Spinner.gif";

const Loading = () => {
    return (
        <div>
            <h3>로딩 중..</h3>
            <img src={Spinner} alt="로딩" width="20%" />
        </div>
    );
};

export default Loading;