import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Result } from "../models/Result";

function EditResult() {
  const { resultId } = useParams();
  const [result, setResult] = useState<Result | null>(null);
  const eventRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);
  const [sportspersonId, setSportspersonId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/results/${resultId}`) //  backendis @GetMapping("/results/{id}")
      .then((res) => res.json())
      .then((json) => {
        setResult(json);
        if (json.sportsperson) {
          setSportspersonId(json.sportsperson.id); // salvestame id sportslast
        }
      });
  }, [resultId]);

  const editResult = () => {
    if (!result) {
      return; 
    }

    const updatedResult = {
      id: result.id,
      event: eventRef.current?.value,
      value: Number(valueRef.current?.value),
      sportsperson: { id: sportspersonId }, 
      points: result.points, 
    };

    fetch("http://localhost:8080/results", {
      method: "PUT",
      body: JSON.stringify(updatedResult),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) {
          alert(json.message);
        } else {
            navigate("/results");//navigate(`/results/${resultId}`);
        }
      });
  };

  if (!result) {
    return null;
  }

  return (
    <div>
      <label>Event</label>
      <br />
      <input ref={eventRef} defaultValue={result.event} type="text" />
      <br />
      <label>Value</label>
      <br />
      <input ref={valueRef} defaultValue={result.value} type="number" />
      <br />
      <button onClick={editResult}>Edit Result</button>
    </div>
  );
}

export default EditResult;
