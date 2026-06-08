import { SITE } from "../data/site";

// Footer carries the second (and last) joke; everything between hero and
// here stays factual.
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>MIT</span>
        <a href={SITE.repoUrl} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <span className="footer__joke">Funded entirely by bad decisions.</span>
      </div>
    </footer>
  );
}
