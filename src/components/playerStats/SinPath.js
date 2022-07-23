import React from "react";

const SinPath = () => {

    const redirectToHome = () => {
        window.location.href = "/home";
    }

  return <div>Error 404 go to <button onClick={redirectToHome}>HOME</button></div>;
}

export default SinPath;