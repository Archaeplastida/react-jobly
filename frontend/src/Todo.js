import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import JoblyApi from "./api";
 
function Todo({ item, type }) {

    JoblyApi.token = localStorage.getItem("user-token");

    const [checkAppliedState, setCheckAppliedState] = useState();

    const containerStyle = {
      border: "1px solid #e0e0e0",
      borderRadius: "8px",
      padding: "16px",
      margin: "12px 0",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      textAlign: "left",
      display: "flex", // Use flexbox for layout
      alignItems: "center", // Vertically center text and image
      justifyContent: "space-between", // Push image to the right
    };
  
    const imageStyle = {
      width: "50px",
      height: "50px",
      objectFit: "cover",
      borderRadius: "8px",
      marginLeft: "16px", // Add spacing between text and image
    };
  
    const textContainerStyle = {
      display: "flex",
      flexDirection: "column", // Stack title and text vertically
      flex: "1", // Allow text container to take up remaining space
    };
  
    const titleStyle = {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "8px",
    };
  
    const textStyle = {
      fontSize: "14px",
      color: "#555",
      margin: "4px 0",
    };

    const handleApplyClick = (itemID, e) => {
        e.preventDefault();
        console.log(`users/${localStorage.getItem("user-name")}/jobs/${itemID}`);
        JoblyApi.request(`users/${localStorage.getItem("user-name")}/jobs/${itemID}`, {}, "post");
    }

    // useEffect(() => {
    //     async function checkApplied() {
    //       const result = await JoblyApi.request(`users/${localStorage.getItem("user-name")}`, {}, "get");
    //       setCheckAppliedState(result.user.applications);
    //       console.log(result);
    //     }
    //     if (!checkAppliedState){
    //         checkApplied();
    //     }
    //   }, []);
  
    return (
      <div style={containerStyle}>
        {type === "jobs" ? (
          <>
            <div style={textContainerStyle}>
              <p style={titleStyle}>{item.title}</p>
              <p style={textStyle}>{item.companyName}</p>
              <p style={textStyle}>Salary: {item.salary ? item.salary : "N/A"}</p>
              <p style={textStyle}>Equity: {item.equity ? item.equity : "N/A"}</p>
              <button onClick={e => handleApplyClick(item.id, e)}>APPLY</button>
            </div>
          </>
        ) : (
          <>
          <Link to={`/companies/${item.handle}`}>
            <div style={textContainerStyle}>
              <p style={titleStyle}>{item.name}</p>
              <p style={textStyle}>{item.description}</p>
            </div>
            </Link>
            {item.logoUrl ? (
              <img
                src={require(`.${item.logoUrl}`)}
                alt={item.name}
                style={imageStyle}
              />
            ) : null}
          </>
        )}
      </div>
    );
  }
 
export default Todo;
 