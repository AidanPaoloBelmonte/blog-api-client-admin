import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header({ removeCookie, user, setUser }) {
  const navigate = useNavigate();

  async function onLogout() {
    const response = await axios.post("http://localhost:3000/logout", null, {
      withCredentials: true,
    });

    if (response?.status == 200) {
      removeCookie("payload");
      removeCookie("user");

      setUser(null);

      navigate("/", { viewTransition: true });
    }
  }

  function handleHeaderAccountOptions() {
    if (!user) {
      return (
        <>
          <li>
            <Link to="/login" viewTransition>
              Log In
            </Link>
          </li>
          <li>
            <Link className="special" to="/signup" viewTransition>
              Sign Up
            </Link>
          </li>
        </>
      );
    }

    return (
      <>
        <li>
          <a>
            <button className="asLink" type="button" onClick={onLogout}>
              Log Out
            </button>
          </a>
        </li>
        <li>
          <Link className="special" to={`/users/${user.id}`}>
            {user.username}
          </Link>
        </li>
      </>
    );
  }

  return (
    <section className="baseSection headerSection">
      <div className="headerContents">
        <Link to="/">
          <h1>The Golb Blog</h1>
        </Link>

        <div key={user?.id ?? "anonymous"} className="navbar">
          <ul className="navlinks">
            <li>
              <Link to="/blogs" viewTransition>
                Blog
              </Link>
            </li>
            <li>
              <span className="separator"></span>
            </li>
            {handleHeaderAccountOptions()}
          </ul>
        </div>
      </div>
    </section>
  );
}
