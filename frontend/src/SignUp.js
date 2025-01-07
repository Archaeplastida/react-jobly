import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './AuthForms.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await JoblyApi.request("auth/register", { username, password, firstName, lastName, email }, "post");
            const decodedUser = jwtDecode(result.token).username;
            localStorage.setItem("user-token", result.token);
            localStorage.setItem("user-name", decodedUser);
            localStorage.setItem("reload", "true");
            setShouldRedirect(true);
        } catch (err) {
            setError(err.message || "Failed to sign up.");
        }
    };

    if (shouldRedirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="auth-form-container">
            <h2 className="mb-4">Sign Up</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </FormGroup>
                {error && <Alert color="danger">{error}</Alert>}
                <Button color="primary" block>SIGN UP</Button>
            </Form>
        </div>
    );
}

export default SignUp;