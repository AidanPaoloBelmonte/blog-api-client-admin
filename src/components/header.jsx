import { Link } from "react-router";

export default function Header() {
  return (
    <section className="baseSection headerSection">
      <div className="headerContents">
        <h1>The Golb Blog</h1>

        <div className="navbar">
          <ul className="navlinks">
            <li>
              <Link top="/">Blog</Link>
            </li>
            <li>
              <span className="separator"></span>
            </li>
            <li>
              <Link top="/">Log In</Link>
            </li>
            <li>
              <Link top="/">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
