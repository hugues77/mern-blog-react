import { useState } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate();
  // const { tokenID } = localStorage.getItem("token");
  const user = localStorage.getItem("username");

  const [username, setUsername] = useState(user);
  // const [token, setToken] = useState(tokenID);

  //function logout
  const logout = () => {
    localStorage.clear("");
    setUsername(null);
    // setToken(null);
    // <Navigate to={"/"} />;
    Navigate("/");
  };

  // const username = userInfo?.username;
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
              <a onClick={logout}>Déconnexion</a>
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
