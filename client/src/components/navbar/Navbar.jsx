import { useEffect, useContext } from "react";
import { UserContext } from "../../pages/context/textContext";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  // const [username, setUsername] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((user) => {
        setUserInfo(user);
        // console.log(user.id);
      });
    });
  }, []);
  // const Navigate = useNavigate();
  // const { tokenID } = localStorage.getItem("token");
  // const user = localStorage.getItem("username");

  // const [token, setToken] = useState(tokenID);

  //function logout
  // const logout = () => {
  //   localStorage.clear("");
  //   setUsername(null);
  //   // setToken(null);
  //   // <Navigate to={"/"} />;
  //   Navigate("/");
  // };

  // const username = userInfo?.username;
  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;
  return (
    <div>
      <header>
        <Link to="/" className="logo">
          My Blog
        </Link>
        <nav>
          {username && (
            <>
              <Link to="/create">Créer New Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
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
