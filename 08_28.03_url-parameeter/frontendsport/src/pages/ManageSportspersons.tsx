import { useEffect, useRef, useState } from "react";
import { Sportsperson } from "../models/Sportsperson";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ManageSportspersons() {

  const [sportspersons, setSportspersons] = useState<Sportsperson[]>([]);

  const nameRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("http://localhost:8080/sportspersons")
      .then(res => res.json())
      .then(json => setSportspersons(json));
  }, []);

  const deleteSportsperson = (id: number) => {
    fetch(`http://localhost:8080/sportspersons/${id}`, {
      method: "DELETE",
    }).then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          setSportspersons(json);
          toast.success("Sportsperson deleted!");
        } else {
          toast.error(json.message);
        }
      });
  };

  const addSportsperson = () => {
    const newSportsperson = {
      name: nameRef.current?.value,
      country: countryRef.current?.value,
      age: Number(ageRef.current?.value),
    };

    fetch("http://localhost:8080/sportspersons", {
      method: "POST",
      body: JSON.stringify(newSportsperson),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(json => {
        if (json.message === undefined && json.timestamp === undefined && json.status === undefined) {
          setSportspersons(json);
          toast.success("Sportsperson added!");
          if (nameRef.current && countryRef.current && ageRef.current) {
            nameRef.current.value = "";
            countryRef.current.value = "";
            ageRef.current.value = "";
          }
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div>
      <h2>Manage Sportspersons</h2>
      <label>Name</label><br />
      <input ref={nameRef} type="text" /><br />
      <label>Country</label><br />
      <input ref={countryRef} type="text" /><br />
      <label>Age</label><br />
      <input ref={ageRef} type="number" /><br />
      <button onClick={addSportsperson}>Add</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Country</th>
            <th>Age</th>
            {/* <th>Total Points</th> sest see on olemas juba ManageResultis */ }
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sportspersons.map(sportsperson => (
            <tr key={sportsperson.id}>
              <td>{sportsperson.id}</td>
              <td>{sportsperson.name}</td>
              <td>{sportsperson.country}</td>
              <td>{sportsperson.age}</td>
              <td>
                <button onClick={() => deleteSportsperson(sportsperson.id)}>Delete</button>
                <Link to={`/admin/edit-sportsperson/${sportsperson.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}

export default ManageSportspersons;
