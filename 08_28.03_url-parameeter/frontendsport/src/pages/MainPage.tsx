import { useEffect, useState } from "react";
import '../App.css'
import { Result } from '../models/Result';
import { Sportsperson } from '../models/Sportsperson';


function MainPage() {
 
  const [sportspersons, setSportspersons] = useState<Sportsperson[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [filteredSportspersons, setFilteredSportspersons] = useState<Sportsperson[]>([]);
  const [countryFilter, setCountryFilter] = useState("all");
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/sportspersons")
      .then((res) => res.json())
      .then((json) => setSportspersons(json));
  }, []);

  
  useEffect(() => {
    fetch("http://localhost:8080/results")
      .then((res) => res.json())
      .then((json) => setResults(json));
  }, []);
  return (
    <div>
      <h1>Sportspersons</h1>
      {sportspersons.map(sportsperson => (
        <div key={sportsperson.id}>
          <h2>{sportsperson.name}</h2>
          <p>Country: {sportsperson.country}</p>
          <p>Age: {sportsperson.age}</p>
          <p>Total Points: {sportsperson.totalPoints}</p>
        </div>
      ))}
      <h1>Results</h1>
      {results.map(result => (
  <div key={result.id}>
    <h3>{result.event}</h3>
    <p>Result: {result.value}</p>
    <p>Points: {result.points}</p>
    <p>
      Sportsperson: 
      {result.sportsperson ? result.sportsperson.name : "No sportsperson assigned"}
    </p>
  </div>
))}
    </div>
  );
}
export default MainPage;