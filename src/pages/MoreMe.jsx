import { useState, useEffect } from 'react';

const TWITCH_CHANNEL = 'av3rage_pepega';
const TWITCH_URL = `https://www.twitch.tv/${TWITCH_CHANNEL}`;

function TwitchEmbed() {
  const parent = window.location.hostname || 'localhost';
  const src = `https://player.twitch.tv/?channel=${TWITCH_CHANNEL}&parent=${parent}&autoplay=false`;

  return (
    <div className="twitch-wrap">
      <iframe
        src={src}
        allowFullScreen
        className="twitch-iframe"
        title="Twitch stream"
        allow="autoplay; fullscreen"
      />
      <a
        href={TWITCH_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="twitch-link"
      >
        ↗ watch on twitch
      </a>
    </div>
  );
}

export default function MoreMe() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/content/more-me.json')
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page content-page"><p className="loading">Loading...</p></div>;
  if (error || !data) return <div className="page content-page"><p className="loading">Failed to load content.</p></div>;

  return (
    <div className="page content-page">
      <h1 className="page-title">{data.title || 'more me'}</h1>
      <div className="prose">
        {(data.paragraphs || []).map((text, i) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      <TwitchEmbed />
    </div>
  );
}
