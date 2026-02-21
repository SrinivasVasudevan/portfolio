import { useState, useEffect } from 'react';

export default function Me() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content/me.json`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page content-page"><p className="loading">Loading...</p></div>;
  if (error || !data) return <div className="page content-page"><p className="loading">Failed to load content.</p></div>;

  return (
    <div className="page content-page">
      <h1 className="page-title">{data.title || 'me'}</h1>
      <div className="prose">
        {(data.paragraphs || []).map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
    </div>
  );
}
