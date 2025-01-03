import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import TodoList from "./TodoList";
import JoblyApi from "./api";

function Company() {
    const {companyHandle} = useParams();
    const [companyJobs, setCompanyJobs] = useState();

    useEffect(() => {
        async function fetchJobsFromCompany() {
          const result = await JoblyApi.request(`companies/${companyHandle.toLowerCase()}`, {}, "get");
          console.log(result);
          setCompanyJobs(result.company.jobs);
        }
        fetchJobsFromCompany();
      }, []);

    return(
        <div>
            <h2>{`Jobs in ${companyHandle}`}</h2>
            {companyJobs && companyJobs.length ? (<TodoList type="jobs" items={companyJobs}/>) : "Loading..."}
        </div>
    )

}

export default Company;