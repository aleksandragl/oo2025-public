import { useCallback, useEffect, useRef, useState } from 'react';
import '../App.css';
import { Sportsperson } from '../models/Sportsperson';

function MainPage() {
  const [countries, setCountries] = useState<string[]>([]);
  const [sportspersons, setSportspersons] = useState<Sportsperson[]>([]);
  const [totalSportspersons, setTotalSportspersons] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sportspersonsByPage, setSportspersonsByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [activeCountry, setActiveCountry] = useState('all');

  useEffect(() => {
    fetch("http://localhost:8080/sportspersons/by-country?country=all&page=0&size=1000")
      .then(res =>
        res.json() as Promise<{
          content: Sportsperson[];
          totalElements: number;
          totalPages: number;
        }>
      )
      .then(json => {
        setSportspersons(json.content);
        setTotalSportspersons(json.totalElements);
        setTotalPages(json.totalPages);
        const uniq = Array.from(
          new Set(json.content.map(sp => sp.country))
        );
        setCountries(uniq);
      });
  }, []);
  
  const showByCountry = useCallback((country: string, currentPage: number) => {
    setActiveCountry(country);
    setPage(currentPage);
    fetch(
      "http://localhost:8080/sportspersons/by-country" +
      `?country=${country}` +
      `&size=${sportspersonsByPage}` +
      `&page=${currentPage}`
    )
      .then(res => res.json())
      .then(json => {
        setSportspersons(json.content);
        setTotalSportspersons(json.totalElements);
        setTotalPages(json.totalPages);
      });
  }, [sportspersonsByPage]);

  
  useEffect(() => {
    showByCountry('all', 0)
  }, [showByCountry])

  function updatePage(newPage: number) {
    showByCountry(activeCountry, newPage)
  }

  const sportspersonsByPageRef = useRef<HTMLSelectElement>(null)

  return (
    <div>
      <select
        ref={sportspersonsByPageRef}
        onChange={() =>
          setSportspersonsByPage(
            Number(sportspersonsByPageRef.current?.value)
          )
        }
      >
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>

      <button onClick={() => showByCountry('all', 0)}>
        Kõik sportlased
      </button>

      {countries.map(country =>
        <button
          key={country}
          onClick={() => showByCountry(country, 0)}
        >
          {country}
        </button>
      )}

      <br /><br />

      <div>Kokku sportlasi: {totalSportspersons} tk</div>

      {sportspersons.map(sportsperson => (
        <div key={sportsperson.id}>
          <div>{sportsperson.id}</div>
          <div>{sportsperson.name}</div>
          <div>{sportsperson.country}</div>
          <div>{sportsperson.age}</div>
          <div>{sportsperson.totalPoints}</div>
        </div>
      ))}

      <button
        disabled={page === 0}
        onClick={() => updatePage(page - 1)}
      >
        Eelmine
      </button>
      <span>{page + 1}</span>
      <button
        disabled={page >= totalPages - 1}
        onClick={() => updatePage(page + 1)}
      >
        Järgmine
      </button>
    </div>
  )
}

export default MainPage