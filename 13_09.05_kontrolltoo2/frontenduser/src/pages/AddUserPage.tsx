import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function AddUserPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  function handleAdd() {
    const newUser = {
      name: nameRef.current?.value ?? "",
      username: usernameRef.current?.value ?? "",
      email: emailRef.current?.value ?? "",
      phone: phoneRef.current?.value ?? "",
      website: websiteRef.current?.value ?? "",
      password: passwordRef.current?.value ?? "",
    };

 
    if (
      !newUser.name ||
      !newUser.username ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.website
    ) {
      alert("Palun täida kõik vajalikud väljad");
      return;
    }

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Viga lisamisega");
        return res.json();
      })
      .then(() => {
        alert("Kasutaja lisatud!");
        navigate("/users");
      })
      .catch((error) => alert(error.message));
  }

  return (
    <div>
      <h2>Lisa uus kasutaja</h2>
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
      <label>
        Parool: <input ref={passwordRef} type="password" />
      </label>
      <br />
      <button onClick={handleAdd}>Lisa kasutaja</button>
    </div>
  );
}

export default AddUserPage;
