import { useState, useEffect } from 'react';

export default function Workexp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/content/workexp.json')
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
      <h1 className="page-title">{data.title || 'work experience'}</h1>
      {data.tagline && <p className="page-tagline">{data.tagline}</p>}
      <ul className="entry-list">
        {entries.map((entry, i) => (
          <li key={i} className="entry-item">
            <div className="entry-row">
              <span className="entry-left">{entry.role}</span>
              <span className="entry-date">{entry.date}</span>
            </div>
            <div className="entry-company-row">
              {entry.logo ? (
                <img
                  src={entry.logo}
                  alt=""
                  className="entry-logo"
                  aria-hidden
                />
              ) : (
                <span className="entry-logo-initial" aria-hidden>
                  {(entry.company || ' ').charAt(0).toUpperCase()}
                </span>
              )}
              <span className="entry-company">{entry.company}</span>
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
