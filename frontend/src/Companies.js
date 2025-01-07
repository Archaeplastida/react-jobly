import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import TodoList from "./TodoList";
import { Container, Row, Col, Input, Button } from "reactstrap";
import "./TodoStyles.css";

function Companies() {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCompanies, setFilteredCompanies] = useState([]);

    useEffect(() => {
        async function fetchCompanies() {
            const result = await JoblyApi.request("companies", {}, "get");
            setCompanies(result.companies);
            setFilteredCompanies(result.companies);
        }
        fetchCompanies();
    }, []);

    const handleSearch = () => {
        const filtered = companies.filter((company) =>
            company.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCompanies(filtered);
    };

    return (
        <Container className="jobly-container">
            <h2>Companies</h2>
            <Row className="mb-3">
                <Col>
                    <div className="jobly-search-container">
                        <Input
                            type="text"
                            placeholder="Search companies..."
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
                    {filteredCompanies && filteredCompanies.length > 0 ? (
                        <TodoList items={filteredCompanies} type="companies" />
                    ) : (
                        <p className="jobly-loading">No companies found...</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Companies;