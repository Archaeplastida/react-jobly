import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import JoblyApi from "./api";
import { jwtDecode } from "jwt-decode";
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './AuthForms.css';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await JoblyApi.request("auth/token", { username, password }, "post");
            if (result && result.token) {
                const decodedUser = jwtDecode(result.token).username;
                localStorage.setItem("user-token", result.token);
                localStorage.setItem("user-name", decodedUser);
                localStorage.setItem("reload", "true");
                setShouldRedirect(true);
            }
        } catch (err) {
            setError(err.message || "Failed to log in.");
        }
    };

    return (
        <div className="auth-form-container">
            <h2 className="mb-4">Log In</h2>
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
                {error && <Alert color="danger">{error}</Alert>}
                <Button color="primary" block>LOG IN</Button>
            </Form>
            {shouldRedirect && <Navigate to="/" />}
        </div>
    );
}

export default LogIn;