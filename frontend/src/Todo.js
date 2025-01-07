import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
import { Button } from "reactstrap";
import "./TodoStyles.css";

function Todo({ item, type, checkApplied }) {
    JoblyApi.token = localStorage.getItem("user-token");

    const [localApply, setLocalApply] = useState([]);

    const handleApplyClick = (itemID, e) => {
        e.preventDefault();
        JoblyApi.request(
            `users/${localStorage.getItem("user-name")}/jobs/${itemID}`,
            {},
            "post"
        );
        let temp = [...localApply];
        temp.push(itemID);
        setLocalApply(temp);
    };

    return (
        <div>
            {type === "jobs" ? (
                <div className="jobly-todo-container">
                    <div className="jobly-todo-text-container">
                        <p className="jobly-todo-title">{item.title}</p>
                        <p className="jobly-todo-text">{item.companyName}</p>
                        <p className="jobly-todo-text">
                            Salary: {item.salary ? item.salary : "N/A"}
                        </p>
                        <p className="jobly-todo-text">
                            Equity: {item.equity ? item.equity : "N/A"}
                        </p>
                        {checkApplied &&
                            checkApplied.length > 0 &&
                            (checkApplied.includes(item.id) || localApply.includes(item.id)) ? (
                            <Button className="jobly-apply-button" disabled>
                                APPLIED
                            </Button>
                        ) : (
                            <Button
                                className="jobly-apply-button"
                                onClick={(e) => handleApplyClick(item.id, e)}
                            >
                                APPLY
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <Link to={`/companies/${item.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="jobly-todo-container">
                        <div className="jobly-todo-text-container">
                            <p className="jobly-todo-title">{item.name}</p>
                            <p className="jobly-todo-text">{item.description}</p>
                        </div>
                        {item.logoUrl ? (
                            <img
                                src={require(`.${item.logoUrl}`)}
                                alt={item.name}
                                className="jobly-todo-image"
                            />
                        ) : null}
                    </div>
                </Link>
            )}
        </div>
    );
}

export default Todo;