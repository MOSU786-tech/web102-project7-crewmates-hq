import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CrewmateCard from '../components/CrewmateCard';
import { CREWMATES_TABLE, supabase } from '../client';
import { getCrewSummary } from '../utils/crewMetrics';
import { formatSupabaseError } from '../utils/supabaseErrors';

const CrewGalleryPage = () => {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchCrewmates = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from(CREWMATES_TABLE)
        .select()
        .order('created_at', { ascending: false });

      if (ignore) {
        return;
      }

      if (error) {
        setErrorMessage(formatSupabaseError(error));
        setCrewmates([]);
      } else {
        setErrorMessage('');
        setCrewmates(data ?? []);
      }

      setLoading(false);
    };

    fetchCrewmates();

    return () => {
      ignore = true;
    };
  }, []);

  const summary = getCrewSummary(crewmates);

  return (
    <section className="page-section">
      <div className="hero-panel">
        <div className="board-header">
          <div>
            <p className="eyebrow">Crew Gallery</p>
            <h2 className="section-title">All crewmates, newest recruits first.</h2>
            <p className="muted">{summary.headline}</p>
          </div>

          <Link className="primary-button" to="/create">
            Create another crewmate
          </Link>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <span>Total crewmates</span>
            <strong>{summary.totalCrewmates}</strong>
          </div>
          <div className="metric-card">
            <span>Average speed</span>
            <strong>{summary.averageSpeed}</strong>
          </div>
          <div className="metric-card">
            <span>Average stamina</span>
            <strong>{summary.averageStamina}</strong>
          </div>
          <div className="metric-card">
            <span>Crew success score</span>
            <strong>{summary.successScore}%</strong>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <span>Ready for launch</span>
            <strong>{summary.readyPercent}%</strong>
          </div>
          <div className="metric-card">
            <span>Dominant category</span>
            <strong>{summary.topCategory}</strong>
          </div>
          <div className="metric-card">
            <span>Detail pages</span>
            <strong>Unique URLs</strong>
          </div>
          <div className="metric-card">
            <span>Data source</span>
            <strong>Supabase CRUD</strong>
          </div>
        </div>
      </div>

      {loading ? <div className="status-banner status-banner--info">Loading crew roster...</div> : null}

      {errorMessage ? <div className="status-banner status-banner--error">{errorMessage}</div> : null}

      {!loading && !errorMessage && !crewmates.length ? (
        <div className="panel empty-state">
          <h3>No crewmates yet.</h3>
          <p className="muted">
            Once you create one, they will appear here automatically with the newest profile at the
            top.
          </p>
          <Link className="primary-button" to="/create">
            Create your first crewmate
          </Link>
        </div>
      ) : null}

      {!loading && crewmates.length ? (
        <div className={`crew-board crew-board--${summary.theme}`}>
          {crewmates.map((crewmate) => (
            <CrewmateCard key={crewmate.id} crewmate={crewmate} successTheme={summary.theme} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default CrewGalleryPage;
