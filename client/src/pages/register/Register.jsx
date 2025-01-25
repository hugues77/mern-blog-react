import { useState } from "react";
import "./Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function Register(ev) {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 200) {
      alert("Inscription reussi");
    } else {
      alert("Inscription échouée, réessayer. Merci");
    }
  }

  return (
    <div>
      <form className="register" onSubmit={Register}>
        <h2>Inscription Form</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        {/* <input type="password"  placeholder='Confirmer Mot de passe' /> */}
        <button>Inscription</button>
      </form>
    </div>
  );
};

export default Register;
