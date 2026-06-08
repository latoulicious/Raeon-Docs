import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getDoc } from "../../data/docs";
import { SITE } from "../../data/site";
import { Mermaid } from "../../components/Mermaid";

// Keep internal markdown links (`/docs/...`) inside the SPA; let external
// links open normally in a new tab.
function MarkdownLink({
  href,
  children,
}: {
  href?: string;
  children?: React.ReactNode;
}) {
  if (href && href.startsWith("/")) {
    return <Link to={href}>{children}</Link>;
  }
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

// Render ```mermaid fences as live diagrams; everything else stays a normal
// code element.
function MarkdownCode({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const lang = /language-(\w+)/.exec(className ?? "")?.[1];
  if (lang === "mermaid") {
    return <Mermaid chart={String(children).trim()} />;
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export function DocPage() {
  const { slug } = useParams();
  const entry = slug ? getDoc(slug) : undefined;

  if (!entry) {
    return (
      <article className="doc">
        <h1>Page not found</h1>
        <p>
          No such doc page. Back to the <Link to="/docs">docs index</Link>.
        </p>
      </article>
    );
  }

  const { frontmatter, body } = entry.doc;
  const syncedFrom = frontmatter.synced_from;
  const syncedCommit = frontmatter.synced_commit;

  return (
    <article className="doc">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ a: MarkdownLink, code: MarkdownCode }}
      >
        {body}
      </ReactMarkdown>
      {syncedFrom ? (
        <p className="doc__sync">
          Mirrored from <code>{syncedFrom}</code>
          {syncedCommit ? (
            <>
              {" "}
              at{" "}
              <a
                href={`${SITE.repoUrl}/commit/${syncedCommit}`}
                target="_blank"
                rel="noreferrer"
              >
                <code>{syncedCommit}</code>
              </a>
            </>
          ) : null}
          . The bot wiki is the source of truth.
        </p>
      ) : null}
    </article>
  );
}
