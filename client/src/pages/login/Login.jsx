import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/textContext";
import "./Login.scss";

const Login = () => {
  // const Navigate = useNavigate();
  // const sessionUser = localStorage.getItem("username");
  const { setUserInfo } = useContext(UserContext);

  // if (sessionUser) {
  //   Navigate("/");
  // }
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  // const [notification, setNotification] = useState({
  //   error: false,
  //   message: "",
  // });
  // const [data, setData] = useState();
  // const Navigate = useNavigate();

  const login = async (ev) => {
    try {
      ev.preventDefault();
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      // if (response.status === 401) {
      //   console.log("Une erreur est survenue, réessayer!");
      //   setNotification({
      //     error: true,
      //     message: "Identifiant/mot de passe incorrecte !",
      //   });
      // } else {
      //   const data = await response.json();
      //   // console.log(data);

      //   if (data?.token) {
      //     localStorage.setItem("token", data.token);
      //     localStorage.setItem("username", data.username);
      //     setRedirect(true);
      //   } else {
      //     setNotification({
      //       error: true,
      //       message: "Identifiant / mot de passe incorrect",
      //     });
      //   }
      // }

      if (response.ok) {
        response.json().then((user) => {
          setUserInfo(user);
          setRedirect(true);
        });
      } else {
        alert("erreur connexion");
      }
    } catch (err) {
      // setNotification({ error: true, message: err.message });
      console.log("Rien n'est impossible à celui qui croit !", err.message);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
    // return (window.location = "/");
  }
  return (
    <div>
      <form className="login" onSubmit={login}>
        {/* {notification.error === true ? (
          <div className="alert-message">{notification.message}</div>
        ) : (
          <div className="hide-message"></div>
        )} */}
        <h2>Login Form</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          name="password"
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
