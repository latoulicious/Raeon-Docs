import { Link } from "react-router-dom";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { SITE } from "../data/site";
import { COMMAND_GROUPS } from "../data/commands";
import "../styles/landing.css";

// What-it-is: a few factual lines, one gradient-tinted keyword each.
const WHAT_IT_IS: { lead: string; rest: string }[] = [
  { lead: "Lavalink audio", rest: " — the bot ships no audio bytes itself; a v4 node resolves and streams." },
  { lead: "Persistent queues", rest: " — optional PostgreSQL keeps the queue across restarts." },
  { lead: "Playlist queueing", rest: " — a playlist URL bulk-enqueues up to the 20-track cap." },
  { lead: "Self-hosted", rest: " — run your own instance. No public invite, no OAuth, no telemetry." },
];

const QUICK_START = `cp .env.example .env
# fill DISCORD_TOKEN, LAVALINK_PASSWORD, DB_PASSWORD
docker compose up -d --build
docker compose logs -f raeon-bot`;

export function Landing() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero">
          <div className="container">
            <h1 className="hero__wordmark gradient-text">{SITE.name}</h1>
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
                  <span className="gradient-text what-list__lead">{item.lead}</span>
                  {item.rest}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section__title">Commands</h2>
            <div className="cmd-groups">
              {COMMAND_GROUPS.map((group) => (
                <div key={group.title} className="cmd-group">
                  <h3 className="cmd-group__title">{group.title}</h3>
                  <ul className="cmd-list">
                    {group.commands.map((cmd) => (
                      <li key={cmd.name} className="cmd">
                        <code className="cmd__name">
                          /{cmd.name}
                          {cmd.args ? <span className="cmd__args"> {cmd.args}</span> : null}
                        </code>
                        <span className="cmd__desc">{cmd.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="section__note">
              Full reference in the <Link to="/docs/commands">command docs</Link>.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="section__title">Quick start</h2>
            <p className="section__lead">
              {SITE.tagline} The Docker stack — bot, Lavalink node, and
              PostgreSQL — comes up with one command.
            </p>
            <pre className="codeblock">
              <code>{QUICK_START}</code>
            </pre>
            <p className="section__note">
              Prefer running the bot on the host? See the{" "}
              <Link to="/docs/getting-started">local path</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
