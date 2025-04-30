import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Sportsperson } from "../models/Sportsperson";


function SingleSportsperson() {
  const { sportspersonId } = useParams();
  const [sportsperson, setSportsperson] = useState<Sportsperson>();

  useEffect(() => {
    fetch(`http://localhost:8080/sportspersons/${sportspersonId}`)
      .then((res) => res.json())
      .then((json) => setSportsperson(json));
  }, [sportspersonId]);

  if (!sportsperson) {
    return null;
  }

  return (
    <div>
      <h2>Sportlane: {sportsperson.name}</h2>
      <p>Riik: {sportsperson.country}</p>
      <p>Vanus: {sportsperson.age}</p>
      {sportsperson.totalPoints && <p>Kokku punktide arv: {sportsperson.totalPoints}</p>}

      {/* <h3>Tulemused:</h3>
      {sportsperson.results && sportsperson.results.length > 0 ? (
        <ul>
          {sportsperson.results.map((result: Result) => (
            <li key={result.id}>
              {result.event}: {result.value} (Punkte: {result.points})
            </li>
          ))}
        </ul>
      ) : (
        <p>Tulemusi ei ole</p>
      )} */}
    </div>
  );
}

export default SingleSportsperson;
