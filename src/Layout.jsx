import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Layout({ config, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [time, setTime] = useState('');
  const [weather, setWeather] = useState('');
  const showBack = location.pathname !== '/';

  useEffect(() => {
    if (!config?.footer?.showTime) return;
    const format = () =>
      setTime(
        new Date().toLocaleString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        })
      );
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, [config?.footer?.showTime]);

  useEffect(() => {
    if (!config?.footer?.showWeather || config.footer.location?.lat == null) return;
    const { lat, lon } = config.footer.location;
    const loc = config.footer.location;
    const place = [loc.city, loc.region, loc.country].filter(Boolean).join(', ');
    setWeather(place);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`
    )
      .then((r) => r.json())
      .then((data) => {
        const temp = data.current?.temperature_2m;
        if (temp != null) setWeather(`${place} · ${Math.round(temp)}°F`);
      })
      .catch(() => {});
  }, [config?.footer?.showWeather, config?.footer?.location]);

  const socials = config.socials || {};
  const footerCfg = config.footer || {};

  return (
    <div className="layout">
      <header className="header">
        <div className="header-left">
          <Link to="/" className="name-link">
            {config.name}
          </Link>
          {config.tagline && <p className="tagline">{config.tagline}</p>}
        </div>
        <nav className="socials">
          {socials.x && (
            <a href={socials.x} target="_blank" rel="noopener noreferrer">
              x
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin
            </a>
          )}
          {socials.gh && (
            <a href={socials.gh} target="_blank" rel="noopener noreferrer">
              gh
            </a>
          )}
        </nav>
      </header>

      <main className="main">
        {showBack && (
          <button type="button" className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
        )}
        {children}
      </main>

      <footer className="footer">
        {footerCfg.showTime && time && <span>{time}</span>}
        {footerCfg.showWeather && weather && <span>{weather}</span>}
      </footer>
    </div>
  );
}
