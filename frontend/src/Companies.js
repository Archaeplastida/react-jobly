import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import TodoList from "./TodoList";

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
        <h2>Companies</h2>
        <div>
          <input
            type="text"
            placeholder="Search Companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={inputStyle}
          />
          <button onClick={handleSearch} style={buttonStyle}>
            SEARCH
          </button>
        </div>
        <div>
          {filteredCompanies && filteredCompanies.length > 0 ? (
            <TodoList items={filteredCompanies} type="companies" />
          ) : (
            <p style={loadingStyle}>No companies found...</p>
          )}
        </div>
      </div>
    );
  }

export default Companies;