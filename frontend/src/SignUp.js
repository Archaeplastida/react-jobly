import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import JoblyApi from "./api";
import {jwtDecode} from "jwt-decode";

function SignUp() {

    /** Sign up form. */

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await JoblyApi.request("auth/register", { username, password, firstName, lastName, email }, "post");
        const decodeUser = jwtDecode(result.token).username;
        localStorage.setItem("user-token", JSON.stringify(result.token).substring(1, localStorage.getItem("user-token").length - 1));
        localStorage.setItem("user-name", JSON.stringify(decodeUser).substring(1, localStorage.getItem("user-name").length - 1));
        //TODO: create a way to store username into localstorage and error handling
        setShouldRedirect(true);
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
            <label>
                First Name
                <input type="text" onChange={e => setFirstName(e.target.value)}></input>
            </label>
            <label>
                Last Name
                <input type="text" onChange={e => setLastName(e.target.value)}></input>
            </label>
            <label>
                Email
                <input type="email" onChange={e => setEmail(e.target.value)}></input>
            </label>
            <button type="submit" onClick={handleSubmit}>SIGN UP</button>
            {shouldRedirect && <Navigate to="/" />}
        </form>
    )
}

export default SignUp;