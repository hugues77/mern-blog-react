import { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState(null);
  useEffect(() => {
    fetch("http://localhost:4000/my-profil", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUsername(userInfo.username);
      });
    });
  });
  return (
    <div>
      <header>
        <Link to="/" className="logo">
          My Blog
        </Link>
        <nav>
          {username ? (
            <>
              <Link to="/create">Nouveau Post</Link>
              <Link to="/logout">Déconnexion</Link>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Inscription</Link>
            </>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
