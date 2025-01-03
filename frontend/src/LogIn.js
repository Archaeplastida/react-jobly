import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";

function LogIn() {

    /**Login form. */

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await JoblyApi.request("auth/token", { username, password }, "post");
        if (result && result.token) {
            const decodeUser = jwtDecode(result.token).username;
            localStorage.setItem("user-token", JSON.stringify(result.token))
            localStorage.setItem("user-token", localStorage.getItem("user-token").substring(1, localStorage.getItem("user-token").length - 1));
            localStorage.setItem("user-name", JSON.stringify(decodeUser));
            localStorage.setItem("user-name", localStorage.getItem("user-name").substring(1, localStorage.getItem("user-name").length - 1));
            setShouldRedirect(true);
        }
        //TODO: create a way to store username into localstorage and error handling
    }

    return (
        <form>
            <label>
                Username
                <input type="text" onChange={e => setUsername(e.target.value)}></input>
            </label>
            <label>
                Password
                <input type="password" onChange={e => setPassword(e.target.value)}></input>
            </label>
            <button onClick={handleSubmit}>LOG IN</button>
            {shouldRedirect && <Navigate to="/" />}
        </form>
    )
}

export default LogIn;