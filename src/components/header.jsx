import { Link } from "react-router";

export default function Header() {
  return (
    <section className="baseSection headerSection">
      <div className="headerContents">
        <h1>The Golb Blog</h1>

        <div className="navbar">
          <ul className="navlinks">
            <li>
              <Link to="/" viewTransition>
                Blog
              </Link>
            </li>
            <li>
              <span className="separator"></span>
            </li>
            <li>
              <Link to="/login" viewTransition>
                Log In
              </Link>
            </li>
            <li>
              <Link to="/">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
