import { useEffect, useRef, useState } from "react";
import { Result } from "../models/Result";
import { Sportsperson } from "../models/Sportsperson";
import { ToastContainer, toast } from "react-toastify";

function ManageResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [sportspersons, setSportspersons] = useState<Sportsperson[]>([]);

  const eventRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const pointsRef = useRef<HTMLInputElement>(null);
  const sportspersonRef = useRef<HTMLSelectElement>(null);

  // Fetch Results
  useEffect(() => {
    fetch("http://localhost:8080/results")
      .then((res) => res.json())
      .then((json) => setResults(json));
  }, []);

  // Fetch Sportspersons (for dropdown)
  useEffect(() => {
    fetch("http://localhost:8080/sportspersons")
      .then((res) => res.json())
      .then((json) => setSportspersons(json));
  }, []);

  // Delete Result
  const deleteResult = (id: number) => {
    fetch(`http://localhost:8080/results/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === undefined) {
          setResults(json);
          toast.success("Tulemus kustutatud!");
        } else {
          toast.error(json.message);
        }
      });
  };

  // Add Result
  const addResult = () => {
    const newResult = {
      event: eventRef.current?.value,
      value: Number(valueRef.current?.value),
      points: Number(pointsRef.current?.value),
      sportspersonId: Number(sportspersonRef.current?.value),
    };

    fetch("http://localhost:8080/results", {
      method: "POST",
      body: JSON.stringify(newResult),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message === undefined) {
          setResults(json);
          toast.success("Tulemus lisatud!");
          if (eventRef.current) eventRef.current.value = "";
          if (valueRef.current) valueRef.current.value = "";
          if (pointsRef.current) pointsRef.current.value = "";
          if (sportspersonRef.current) sportspersonRef.current.value = "";
        } else {
          toast.error(json.message);
        }
      });
  };

  return (
    <div>
      <h2>Manage Results</h2>
      <label>Event</label> <br />
      <input ref={eventRef} type="text" /> <br />
      <label>Value</label> <br />
      <input ref={valueRef} type="number" step="0.01" /> <br />
      <label>Points</label> <br />
      <input ref={pointsRef} type="number" /> <br />
      <label>Sportsperson</label> <br />
      <select ref={sportspersonRef}>
        <option value="">-- Select --</option>
        {sportspersons.map((sp) => (
          <option key={sp.id} value={sp.id}>
            {sp.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={addResult}>Add</button>

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

      <ToastContainer />
    </div>
  );
}

export default ManageResults;
