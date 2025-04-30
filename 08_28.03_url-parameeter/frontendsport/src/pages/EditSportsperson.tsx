import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sportsperson } from "../models/Sportsperson";
import { ToastContainer, toast } from "react-toastify";

function EditSportsperson() {
  const { sportspersonId } = useParams();
  const [sportsperson, setSportsperson] = useState<Sportsperson>();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/sportspersons/${sportspersonId}`) //@GetMapping("sportspersons/{id}") backendis
      .then((res) => res.json())
      .then((json) => setSportsperson(json));
  }, [sportspersonId]);

  const editSportsperson = () => {
    const updatedSportsperson = {
      id: Number(sportspersonId),
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      country: countryRef.current?.value,
    };

    fetch("http://localhost:8080/sportspersons", {
      method: "PUT",
      body: JSON.stringify(updatedSportsperson),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          toast.error(json.message);
        } else {
          navigate("/sportspersons");
        }
      });
  };

  if (!sportsperson) {
    return null;
  }

  return (
    <div>
      <label>Nimi</label>
      <br />
      <input ref={nameRef} defaultValue={sportsperson.name} type="text" />
      <br />
      <label>Vanus</label>
      <br />
      <input ref={ageRef} defaultValue={sportsperson.age} type="number" />
      <br />
      <label>Riik</label>
      <br />
      <input ref={countryRef} defaultValue={sportsperson.country} type="text" />
      <br />
      <button onClick={editSportsperson}>Muuda sportlast</button>
      <ToastContainer />
    </div>
  );
}

export default EditSportsperson;
