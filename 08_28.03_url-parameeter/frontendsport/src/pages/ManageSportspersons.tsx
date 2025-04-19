import React, { useEffect, useState } from "react";
import { Sportsperson } from "../models/Sportsperson";
import "./ManageSportspersons.css";

function ManageSportspersons() {
  const [sportspersons, setSportspersons] = useState<Sportsperson[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/sportspersons")
      .then(res => res.json())
      .then(json => setSportspersons(json));
  }, []);

  const deleteSportsperson = (id: number) => {
    fetch(`http://localhost:8080/sportspersons/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(json => setSportspersons(json));
  };

  return (
    <div className="manage-sportspersons">
      <h2>Manage Sportspersons</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Age</th>
            <th>Total Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sportspersons.map(sportsperson => (
            <tr key={sportsperson.id}>
              <td>{sportsperson.id}</td>
              <td>{sportsperson.name}</td>
              <td>{sportsperson.country}</td>
              <td>{sportsperson.age}</td>
              <td>{sportsperson.totalPoints || 0}</td>
              <td>
                <button onClick={() => deleteSportsperson(sportsperson.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageSportspersons;