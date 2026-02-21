import { Link } from 'react-router-dom';

export default function Home({ config }) {
  const links = config.centerLinks || [];

  return (
    <div className="home">
      <nav className="center-links">
        {links.map((item, i) => {
          if (item.disabled) {
            return (
              <span key={i} className="center-links-item disabled">
                {item.label} (coming soon)
              </span>
            );
          }
          if (item.isResume) {
            const url = config.resumeUrl || item.url;
            return (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="center-links-item"
              >
                {item.label}
              </a>
            );
          }
          const isInternal = item.url?.startsWith('/');
          if (isInternal) {
            return (
              <Link key={i} to={item.url} className="center-links-item">
                {item.label}
              </Link>
            );
          }
          return (
            <a key={i} href={item.url || '#'} className="center-links-item">
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
