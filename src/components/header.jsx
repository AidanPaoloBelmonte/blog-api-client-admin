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

      navigate("/login");
    }
  }

  function handleHeaderAccountOptions() {
    if (!user) {
      return <></>;
    }

    return (
      <>
        <li>
          <Link to="/blogs" viewTransition>
            Blog
          </Link>
        </li>
        <li>
          <span className="separator"></span>
        </li>
        <li>
          <a>
            <button className="asLink" type="button" onClick={onLogout}>
              Log Out
            </button>
          </a>
        </li>
        <li>
          <Link className="special" to={`/user/${user.id}`} viewTransition>
            {user.username}
          </Link>
        </li>
      </>
    );
  }

  let homeLink = "/";
  if (!user) {
    homeLink += "login";
  }

  return (
    <section className="baseSection headerSection">
      <div className="headerContents">
        <Link to={homeLink} viewTransition>
          <h1>The Golb Blog Admin</h1>
        </Link>

        <div key={user?.id ?? "anonymous"} className="navbar">
          <ul className="navlinks">{handleHeaderAccountOptions()}</ul>
        </div>
      </div>
    </section>
  );
}
