import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TodoList from "./TodoList";
import JoblyApi from "./api";
import { Container } from "reactstrap";
import "./TodoStyles.css";

function Company() {
    const { companyHandle } = useParams();
    const [companyJobs, setCompanyJobs] = useState();
    const [companyDescription, setCompanyDescription] = useState();

    useEffect(() => {
        async function fetchJobsFromCompany() {
            const result = await JoblyApi.request(
                `companies/${companyHandle.toLowerCase()}`,
                {},
                "get"
            );
            setCompanyDescription(result.company.description);
            setCompanyJobs(result.company.jobs);
        }
        fetchJobsFromCompany();
    }, []);

    return (
        <Container className="jobly-container">
            <h2>{`Jobs in ${companyHandle}`}</h2>
            <p>{companyDescription}</p>
            {companyJobs && companyJobs.length ? (
                <TodoList type="jobs" items={companyJobs} />
            ) : (
                <p className="jobly-loading">Loading...</p>
            )}
        </Container>
    );
}

export default Company;