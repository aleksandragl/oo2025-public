import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../models/User";

function MainPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [usersByPage, setUsersByPage] = useState(5);
  const [page, setPage] = useState(0);
  const usersByPageRef = useRef<HTMLSelectElement>(null);
  const [sort, setSort] = useState("name,asc");


  const loadUsers = useCallback((currentPage: number) => {
    fetch(
      `http://localhost:8080/users?page=${currentPage}&size=${usersByPage}&sort=${sort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.content);
        setTotalUsers(data.totalElements);
        setTotalPages(data.totalPages);
        setPage(currentPage); 
      });
  }, [usersByPage, sort]);


  useEffect(() => {
    loadUsers(page);
  }, [loadUsers, page]);


  useEffect(() => {
    setPage(0);
    loadUsers(0);
  }, [sort, usersByPage, loadUsers]);


  function handleUsersByPageChange() {
    const newSize = Number(usersByPageRef.current?.value) || 5;
    setUsersByPage(newSize);
   
  }


  function updatePage(newPage: number) {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage); 
    }
  }

  return (
    <div>
      <h1>Kasutajad</h1>

      <div>
        <button onClick={() => setSort("name,asc")}>Sorteeri A-Z</button>
        <button onClick={() => setSort("name,desc")}>Sorteeri Z-A</button>
      </div>

      <label>
        Kasutajaid leheküljel:{" "}
        <select
          ref={usersByPageRef}
          onChange={handleUsersByPageChange}
          defaultValue={usersByPage.toString()}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </label>

      <div>Kokku kasutajaid: {totalUsers} tk</div>

      {users.map((user) => (
        <div
          key={user.id}
          style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}
        >
          <div>
            <b>{user.name}</b> ({user.username})
          </div>
          <div>Email: {user.email}</div>
          <div>Telefon: {user.phone}</div>
          <Link to={`/users/${user.id}`}>
            <button>Vaata lähemalt</button>
          </Link>
        </div>
      ))}

      <div style={{ marginTop: "15px" }}>
        <button disabled={page === 0} onClick={() => updatePage(page - 1)}>
          Eelmine
        </button>
        <span>
          {" "}
          {page + 1} / {totalPages}{" "}
        </span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => updatePage(page + 1)}
        >
          Järgmine
        </button>
      </div>
    </div>
  );
}

export default MainPage;
