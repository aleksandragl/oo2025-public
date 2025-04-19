import React, { useEffect, useState } from "react";
import { Result } from "../models/Result"; 
import "./ManageResults.css"; 

function ManageResults() {
    const [results, setResults] = useState<Result[]>([]);
  

    useEffect(() => {
      fetch("http://localhost:8080/results")
        .then((res) => res.json())
        .then((json) => setResults(json));
    }, []);
  

    const deleteResult = (id: number) => {
      fetch(`http://localhost:8080/results/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((json) => setResults(json));
    };
  
    return (
      <div className="manage-results">
        <h2>Manage Results</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Event</th>
              <th>Value</th>
              <th>Points</th>
              <th>Sportsperson</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.id}>
                <td>{result.id}</td>
                <td>{result.event}</td>
                <td>{result.value}</td>
                <td>{result.points}</td>
                <td>{result.sportsperson?.name || "N/A"}</td> 
                <td>
                  <button onClick={() => deleteResult(result.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
export default ManageResults;