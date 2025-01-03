import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import TodoList from "./TodoList";

function Jobs({ company }) {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
      async function fetchJobs() {
        const result = await JoblyApi.request("jobs", {}, "get");
        let jobList = result.jobs;
  
        // If the company prop is provided, filter jobs by company name
        if (company) {
          jobList = jobList.filter((job) =>
            job.companyName.toLowerCase() === company.toLowerCase()
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
  
    const containerStyle = {
      padding: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
      textAlign: "center",
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
    };
  
    const inputStyle = {
      padding: "10px",
      width: "70%",
      marginRight: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    };
  
    const buttonStyle = {
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      backgroundColor: "#007bff",
      color: "#fff",
      cursor: "pointer",
    };
  
    const loadingStyle = {
      marginTop: "20px",
      fontSize: "16px",
      color: "#666",
    };
  
    return (
      <div style={containerStyle}>
        <h2>Job Listings</h2>
        <div>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleSearch} style={buttonStyle}>
            SEARCH
          </button>
        </div>
        <div>
          {filteredJobs && filteredJobs.length > 0 ? (
            <TodoList items={filteredJobs} type="jobs" />
          ) : (
            <p style={loadingStyle}>No jobs found...</p>
          )}
        </div>
      </div>
    );
  }

export default Jobs;