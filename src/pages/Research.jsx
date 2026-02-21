import { useState, useEffect } from 'react';

export default function Research() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/content/research.json')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page list-page"><p className="loading">Loading...</p></div>;
  if (error || !data) return <div className="page list-page"><p className="loading">Failed to load content.</p></div>;

  const entries = data.entries || [];

  return (
    <div className="page list-page">
      <h1 className="page-title">{data.title || 'research'}</h1>
      {data.tagline && <p className="page-tagline">{data.tagline}</p>}
      <ul className="entry-list">
        {entries.map((entry, i) => (
          <li key={i} className="entry-item">
            <div className="entry-row">
              {entry.url ? (
                <a
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="entry-left entry-link"
                >
                  {entry.title}
                </a>
              ) : (
                <span className="entry-left">{entry.title}</span>
              )}
              <span className="entry-date">{entry.date}</span>
            </div>
            {entry.summary && (
              <p className="entry-summary">{entry.summary}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
