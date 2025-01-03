import React, { useState, useEffect } from "react";
import JoblyApi from "./api";

function Profile() {

    JoblyApi.token = localStorage.getItem("user-token");

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [populate, setPopulate] = useState();

    const fetchUserInfo = async () => {
        const result = await JoblyApi.request(`users/${localStorage.getItem("user-name")}`, {}, "get");
        setFirstName(result.user.firstName)
        setLastName(result.user.lastName)
        setEmail(result.user.email);
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({firstName, lastName, email});
        JoblyApi.request(`users/${localStorage.getItem("user-name")}`, {firstName, lastName, email}, "patch");
    }


    return(
        <div>
            <form>
                <input type="text" disabled={true} value={localStorage.getItem("user-name")}/>
                <input onChange={e => {setFirstName(e.target.value)}} value={firstName} type="text"/>
                <input onChange={e => {setLastName(e.target.value)}} value={lastName} type="text"/>
                <input onChange={e => {setEmail(e.target.value)}} value={email} type="email"/>
                <button onClick={handleSubmit} type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default Profile;