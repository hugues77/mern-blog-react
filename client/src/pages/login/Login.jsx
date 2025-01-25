import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const login = async (ev) => {
    ev.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      alert("Identifiant / mot de passe incorrect");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
      <form className="login" onSubmit={login}>
        <h2>Login Form</h2>
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
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
