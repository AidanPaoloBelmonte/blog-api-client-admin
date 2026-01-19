import { Link } from "react-router";

export default function Header({ isAuth }) {
  const headerAccountUnauth = (
    <>
      <li>
        <Link to="/login" viewTransition>
          Log In
        </Link>
      </li>
      <li>
        <Link to="/signup" viewTransition>
          Sign Up
        </Link>
      </li>
    </>
  );

  function handleHeaderAccountOptions() {
    if (!isAuth) {
      return headerAccountUnauth;
    }

    return null;
  }

  return (
    <section className="baseSection headerSection">
      <div className="headerContents">
        <Link to="/">
          <h1>The Golb Blog</h1>
        </Link>

        <div className="navbar">
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
