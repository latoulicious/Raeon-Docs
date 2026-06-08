import { Link } from "react-router-dom";
import { SITE } from "../data/site";

// Top bar shared by landing + docs. Flat surface, thin bottom border —
// the wordmark is the only place the gradient appears up here.
export function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand accent-text">
          {SITE.name}
        </Link>
        <nav className="nav__links">
          <Link to="/docs">Docs</Link>
          <a href={SITE.repoUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
