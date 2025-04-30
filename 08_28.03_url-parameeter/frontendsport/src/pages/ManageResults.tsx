import { useEffect, useRef, useState } from "react";
import { Result } from "../models/Result";
import { Sportsperson } from "../models/Sportsperson";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

function ManageResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [sportspersons, setSportspersons] = useState<Sportsperson[]>([]);

  const eventRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const sportspersonRef = useRef<HTMLSelectElement>(null);

  const loadResults = () => {
    fetch("http://localhost:8080/results")
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) setResults(json);
      })
      .catch(() => toast.error("Failed to load results"));
  };
  // lae sportlased kellel on arvutatud totalPoints
  const loadSportspersons = () => {
    fetch("http://localhost:8080/sportspersons/with-points")
      .then(res => res.json())
      .then(json => {
        if (Array.isArray(json)) setSportspersons(json);
      })
      .catch(() => toast.error("Failed to load sportspersons"));
  };

  useEffect(() => {
    loadResults();
    loadSportspersons();
  }, []);
  //kustutame tulemus ID järgi
  const deleteResult = (id: number) => {
    fetch(`http://localhost:8080/results/${id}`, { method: "DELETE" })
      .then(async res => {
        const json = await res.json();
        if (!res.ok) {
          toast.error(json.message || "Delete failed");
          return;
        }
        if (Array.isArray(json)) {
          setResults(json);
          loadSportspersons();
          toast.success("Deleted");
        }
      })
      .catch(() => toast.error("Network error"));
  };
  //lisame uus tulemus sportlasele
  const addResult = () => {
    const event = eventRef.current?.value ?? "";
    const value = Number(valueRef.current?.value);
    const spId = Number(sportspersonRef.current?.value); //spId sportspersonId

    if (!event || value <= 0 || !spId) {
      toast.error("Please fill in all fields correctly");
      return;
    }

    fetch(`http://localhost:8080/results?sportspersonId=${spId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, value }),
    })
      .then(async res => {
        const json = await res.json();
        if (!res.ok) {
          toast.error(json.message || "Add failed");
          return;
        }
        setResults(prev => [...prev, json as Result]);
        loadSportspersons();
        toast.success("Added");

        // clear fields
        if (eventRef.current) eventRef.current.value = "";
        if (valueRef.current) valueRef.current.value = "";
        if (sportspersonRef.current) sportspersonRef.current.value = "";
      })
      .catch(() => toast.error("Network error"));
  };

  return (
    <div>
      <h2>Manage Results</h2>
      {/* Add Result Form */}
      <h3>Add Result</h3>
      <label>Event</label><br />
      <input ref={eventRef} type="text" /><br />
      <label>Value</label><br />
      <input ref={valueRef} type="number" step="0.01" /><br />
      <label>Sportsperson</label><br />
      <select ref={sportspersonRef}>
        <option value="">-- Select --</option>
        {sportspersons.map(sp => (
          <option key={sp.id} value={sp.id}>{sp.name}</option>
        ))}
      </select><br />
      <button onClick={addResult}>Add</button>

      {/* Results Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Event</th>
            <th>Value</th>
            <th>Points</th>
            <th>Sportsperson</th>
            <th>Total Points</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {results.length > 0 ? results.map(result => {
          const sportsperson = sportspersons.find(sp => sp.id === result.sportsperson?.id);
          return (
            <tr key={result.id}>
              <td>{result.id}</td>
              <td>{result.event}</td>
              <td>{result.value}</td>
              <td>{result.points}</td>
              <td>{result.sportsperson?.name ?? "N/A"}</td>
              <td>{sportsperson?.totalPoints ?? "—"}</td>
              <td>
                <button onClick={() => deleteResult(result.id)}>Delete</button> 
                <Link to={`/admin/edit-result/${result.id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          );
        }) : (
          <tr><td colSpan={7}>No results</td></tr>
        )}
      </tbody>
      </table>

      <ToastContainer />
    </div>
  );
}

export default ManageResults;
