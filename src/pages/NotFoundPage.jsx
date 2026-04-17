// Mentor map: Fallback page for unmatched routes.
// Why it exists: Gives users recovery navigation instead of a blank screen.
// Used by: wildcard route in App router.
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <section className="page-section">
      <div className="panel empty-state">
        <p className="eyebrow">404</p>
        <h2>That route drifted off course.</h2>
        <p className="muted">Head back home or jump straight into the crew gallery.</p>
        <div className="action-row">
          <Link className="primary-button" to="/">
            Go home
          </Link>
          <Link className="secondary-button" to="/crew">
            Open gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
