import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Result } from "../models/Result";


function SingleResult() {
  const { resultId } = useParams();
  const [result, setResult] = useState<Result>();
  const [otherResults, setOtherResults] = useState<Result[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8080/results/${resultId}`)
      .then((res) => res.json())
      .then((json) => {
        setResult(json);
        
        if (json.sportsperson && json.sportsperson.id) {
          fetch(`http://localhost:8080/results/by-sportsperson/${json.sportsperson.id}`)
            .then((res) => res.json())
            .then((data) => setOtherResults(data));
        }
      });
  }, [resultId]);

  if (!result) {
    return null;
  }

  return (
    <div>
      {/* <h2>Tulemus detail:</h2>
      <p>Event: {result.event}</p>
      <p>Väärtus: {result.value}</p>
      <p>Punktid: {result.points}</p> */}

      {result.sportsperson && (
        <div>
          <h3>Sportlane:</h3>
          <p>Nimi: {result.sportsperson.name}</p>
        </div>
      )}

      <h3>Kõik tulemused sellelt sportlaselt:</h3>
      <ul>
        {otherResults.map((res) => (
          <li key={res.id}>
            {res.event} – {res.value} (Punkte: {res.points})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingleResult;
