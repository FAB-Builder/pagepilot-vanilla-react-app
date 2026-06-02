import DocLayout from './DocLayout';

interface ComingSoonProps {
  title: string;
  description: string;
}

function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <DocLayout>
      <article className="doc-article">
        <header className="doc-article-head">
          <h1>{title}</h1>
          <p className="doc-lead">{description}</p>
        </header>
        <section className="doc-section">
          <div className="doc-empty">
            <span className="empty-emoji" aria-hidden>
              🚧
            </span>
            <h2>Demo coming soon</h2>
            <p className="panel-sub">This section is being built out next.</p>
          </div>
        </section>
      </article>
    </DocLayout>
  );
}

export default ComingSoon;
