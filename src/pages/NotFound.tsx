import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";

export function NotFound() {
  return (
    <>
      <Nav />
      <main className="section">
        <div className="container">
          <h1 className="section__title">Not found</h1>
          <p className="section__lead">
            That page does not exist. Head back to the{" "}
            <Link to="/">landing page</Link> or browse the{" "}
            <Link to="/docs">docs</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
