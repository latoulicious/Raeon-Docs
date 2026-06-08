import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SITE } from "../data/site";
import "../styles/landing.css";

// What-it-is: a few factual lines, one gradient-tinted keyword each.
// Commands + quick-start live on their own doc pages (/docs/commands,
// /docs/getting-started) — the landing just points there.
const WHAT_IT_IS: { lead: string; rest: string }[] = [
  { lead: "Lavalink audio", rest: " — the bot ships no audio bytes itself; a v4 node resolves and streams." },
  { lead: "Persistent queues", rest: " — optional PostgreSQL keeps the queue across restarts." },
  { lead: "Playlist queueing", rest: " — a playlist URL bulk-enqueues up to the 20-track cap." },
  { lead: "Self-hosted", rest: " — run your own instance. No public invite, no OAuth, no telemetry." },
];

export function Landing() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero">
          <div className="container">
            <h1 className="hero__wordmark accent-text">{SITE.name}</h1>
            <p className="hero__subline">{SITE.subline}</p>
            <div className="hero__actions">
              <Link to="/docs/getting-started" className="btn btn--primary">
                Get Started
              </Link>
              <a
                href={SITE.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section__title">What it is</h2>
            <ul className="what-list">
              {WHAT_IT_IS.map((item) => (
                <li key={item.lead}>
                  <span className="accent-text what-list__lead">{item.lead}</span>
                  {item.rest}
                </li>
              ))}
            </ul>
            <p className="section__note">
              See the <Link to="/docs/commands">command reference</Link> and the{" "}
              <Link to="/docs/getting-started">quick start</Link> in the docs.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
