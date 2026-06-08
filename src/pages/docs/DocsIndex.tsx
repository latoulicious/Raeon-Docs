import { Link } from "react-router-dom";
import { DOCS } from "../../data/docs";

export function DocsIndex() {
  return (
    <article className="doc">
      <h1>Docs</h1>
      <p className="doc__lead">
        A curated, public-friendly subset of the bot wiki — setup, commands,
        configuration, and architecture. The wiki stays the source of truth;
        these pages are mirrored from it.
      </p>
      <ul className="doc-index">
        {DOCS.map((doc) => (
          <li key={doc.slug} className="doc-index__item">
            <Link to={`/docs/${doc.slug}`} className="doc-index__title">
              {doc.title}
            </Link>
            <span className="doc-index__blurb">{doc.blurb}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
