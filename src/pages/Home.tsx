import { Link } from 'react-router-dom';
import { navItems } from '../navItems';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>PagePilot Vanilla React Demo</h1>
        <p>
          A playground showing how to embed PagePilot (AHDjs) experiences into a plain React app.
          Pick a section below to see it in action and grab the integration code.
        </p>
      </section>

      <section className="nav-grid">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className="nav-card">
            <span className="nav-card-emoji" aria-hidden>
              {item.emoji}
            </span>
            <span className="nav-card-title">{item.label}</span>
            <span className="nav-card-desc">{item.description}</span>
            <span className="nav-card-cta">Open demo →</span>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default Home;
