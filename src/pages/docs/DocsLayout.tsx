import { NavLink, Outlet } from "react-router-dom";
import { Nav } from "../../components/Nav";
import { Footer } from "../../components/Footer";
import { DOCS } from "../../data/docs";
import "../../styles/docs.css";

// Shell for every /docs route: top nav, a thin left sidebar of doc links,
// and the active page in the outlet.
export function DocsLayout() {
  return (
    <>
      <Nav />
      <div className="container docs">
        <aside className="docs__sidebar">
          <nav className="docs__nav">
            <NavLink to="/docs" end className="docs__navlink">
              Overview
            </NavLink>
            {DOCS.map((doc) => (
              <NavLink
                key={doc.slug}
                to={`/docs/${doc.slug}`}
                className="docs__navlink"
              >
                {doc.title}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="docs__main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}
