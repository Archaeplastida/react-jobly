import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import TodoList from "./TodoList";
import { Container, Row, Col, Input, Button } from "reactstrap";
import "./TodoStyles.css";

function Jobs({ company }) {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        async function fetchJobs() {
            const result = await JoblyApi.request("jobs", {}, "get");
            let jobList = result.jobs;

            if (company) {
                jobList = jobList.filter(
                    (job) => job.companyName.toLowerCase() === company.toLowerCase()
                );
            }

            setJobs(jobList);
            setFilteredJobs(jobList);
        }
        fetchJobs();
    }, [company]);

    const handleSearch = () => {
        const filtered = jobs.filter((job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filtered);
    };

    return (
        <Container className="jobly-container">
            <h2>Job Listings</h2>
            <Row className="mb-3">
                <Col>
                    <div className="jobly-search-container">
                        <Input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="jobly-search-input"
                        />
                        <Button onClick={handleSearch} className="jobly-search-button">
                            SEARCH
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    {filteredJobs && filteredJobs.length > 0 ? (
                        <TodoList items={filteredJobs} type="jobs" />
                    ) : (
                        <p className="jobly-loading">No jobs found...</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Jobs;