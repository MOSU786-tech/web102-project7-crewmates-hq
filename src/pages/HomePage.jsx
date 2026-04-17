// Mentor map: Landing page explaining project goals and navigation paths.
// Why it exists: Gives rubric-aligned overview and directs users to key flows.
// Used by: / route in App router.
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <section className="page-section">
      <div className="hero-panel hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Mission Control</p>
          <h2>Create a crew worth remembering.</h2>
          <p>
            This app lets you create crewmates, assign their stats by clicking preset values,
            review the full gallery sorted by newest first, and jump into unique detail or edit
            pages for every recruit.
          </p>

          <div className="action-row">
            <Link className="primary-button" to="/create">
              Build your first crewmate
            </Link>
            <Link className="secondary-button" to="/crew">
              Browse the crew gallery
            </Link>
          </div>
        </div>

        <div className="panel">
          <p className="eyebrow">Required Features</p>
          <div className="detail-list">
            <div className="detail-item">
              <span>Create form</span>
              <strong>Name, category, clickable attributes, and bio</strong>
            </div>
            <div className="detail-item">
              <span>Summary page</span>
              <strong>Newest crewmates at the top with edit actions</strong>
            </div>
            <div className="detail-item">
              <span>Detail page</span>
              <strong>Unique URL plus a path back to editing</strong>
            </div>
            <div className="detail-item">
              <span>Update and delete</span>
              <strong>Supabase changes reflected as soon as you save</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <span>Category-based options</span>
          <strong>Stretch</strong>
        </div>
        <div className="metric-card">
          <span>Success metric</span>
          <strong>Crew Score</strong>
        </div>
        <div className="metric-card">
          <span>Sorting</span>
          <strong>Newest first</strong>
        </div>
        <div className="metric-card">
          <span>Routes</span>
          <strong>5 pages</strong>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
