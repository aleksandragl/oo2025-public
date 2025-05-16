import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { User } from "../models/User";

function UsersPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);

        if (nameRef.current) nameRef.current.value = data.name || "";
        if (usernameRef.current) usernameRef.current.value = data.username || "";
        if (emailRef.current) emailRef.current.value = data.email || "";
        if (phoneRef.current) phoneRef.current.value = data.phone || "";
        if (websiteRef.current) websiteRef.current.value = data.website || "";
      });
  }, [id]);

  function handleSave() {
    if (!user) return;

    const updatedUser = {
      ...user,
      name: nameRef.current?.value ?? "",
      username: usernameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      phone: phoneRef.current?.value ?? "",
      website: websiteRef.current?.value ?? "",
    };

    fetch(`http://localhost:8080/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    }).then(() => {
      alert("Kasutaja salvestatud!");
      navigate("/users");
    });
  }

  if (!user) return <div>Laen andmeid...</div>;

  return (
    <div>
      <h2>Kasutaja detailid</h2>
      <label>
        Nimi: <input ref={nameRef} type="text" />
      </label>
      <br />
      <label>
        Username: <input ref={usernameRef} type="text" />
      </label>
      <br />
      <label>
        Email: <input ref={emailRef} type="email" />
      </label>
      <br />
      <label>
        Telefon: <input ref={phoneRef} type="tel" />
      </label>
      <br />
      <label>
        Website: <input ref={websiteRef} type="text" />
      </label>
      <br />
      <button onClick={handleSave}>Salvesta</button>
    </div>
  );
}

export default UsersPage;
