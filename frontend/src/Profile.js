import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './Profile.css';

function Profile() {
    JoblyApi.token = localStorage.getItem("user-token");

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const fetchUserInfo = async () => {
        const result = await JoblyApi.request(`users/${localStorage.getItem("user-name")}`, {}, "get");
        setFirstName(result.user.firstName)
        setLastName(result.user.lastName)
        setEmail(result.user.email);
    }

    useEffect(() => {
        fetchUserInfo();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log({ firstName, lastName, email });
        try {
            await JoblyApi.request(`users/${localStorage.getItem("user-name")}`, { firstName, lastName, email }, "patch");
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
        } catch (err) {
            console.error("Profile update failed:", err);
        }
    }

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            {updateSuccess && (
                <Alert color="success" className="profile-update-alert">
                    Profile updated successfully!
                </Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input type="text" id="username" value={localStorage.getItem("user-name")} disabled />
                </FormGroup>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" id="firstName" value={firstName} onChange={e => { setFirstName(e.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" id="lastName" value={lastName} onChange={e => { setLastName(e.target.value) }} />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" value={email} onChange={e => { setEmail(e.target.value) }} />
                </FormGroup>
                <Button color="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
}

export default Profile;