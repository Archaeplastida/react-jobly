import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import JoblyApi from "./api";
import { Container } from "reactstrap";

function TodoList({ items, type }) {
    const [appliedResult, setAppliedResult] = useState([]);

    useEffect(() => {
        const fetchAppliedForJobs = async () => {
            try {
                const result = await JoblyApi.request(
                    `users/${localStorage.getItem("user-name")}`,
                    {},
                    "get"
                );
                setAppliedResult(result.user.applications);
            } catch (error) {
                console.error("Error fetching applied jobs:", error);
            }
        };

        fetchAppliedForJobs();
    }, []);

    return (
        <Container>
            {items.map((item) => (
                <Todo
                    key={item.id}
                    item={item}
                    type={type}
                    checkApplied={appliedResult}
                />
            ))}
        </Container>
    );
}

export default TodoList;