// Mentor map: Detail page for one crewmate by id.
// Why it exists: Shows full profile data and provides navigation to edit.
// Used by: /crewmates/:id route in App router.
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CREWMATES_TABLE, supabase } from '../client';
import { CATEGORY_OPTIONS, COLOR_SWATCHES } from '../data/crewOptions';
import { formatCreatedAt, getCrewmateReadiness } from '../utils/crewMetrics';
import { formatSupabaseError } from '../utils/supabaseErrors';

const CrewmateDetailPage = () => {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let ignore = false;

    const fetchCrewmate = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from(CREWMATES_TABLE)
        .select()
        .eq('id', id)
        .single();

      if (ignore) {
        return;
      }

      if (error) {
        setErrorMessage(formatSupabaseError(error));
        setCrewmate(null);
      } else {
        setErrorMessage('');
        setCrewmate(data);
      }

      setLoading(false);
    };

    fetchCrewmate();

    return () => {
      ignore = true;
    };
  }, [id]);

  const readiness = useMemo(
    () => getCrewmateReadiness(crewmate ?? { speed: 0, stamina: 0 }),
    [crewmate],
  );

  const shareLink = crewmate ? `${window.location.origin}/crewmates/${crewmate.id}` : '';

  if (loading) {
    return (
      <section className="page-section">
        <div className="status-banner status-banner--info">Loading crewmate details...</div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="page-section">
        <div className="status-banner status-banner--error">{errorMessage}</div>
        <Link className="secondary-button" to="/crew">
          Back to gallery
        </Link>
      </section>
    );
  }

  if (!crewmate) {
    return (
      <section className="page-section">
        <div className="panel empty-state">
          <h3>Crewmate not found.</h3>
          <Link className="secondary-button" to="/crew">
            Back to gallery
          </Link>
        </div>
      </section>
    );
  }

  const categoryInfo = CATEGORY_OPTIONS[crewmate.category];

  return (
    <section className="page-section">
      <div className="hero-panel details-grid">
        <div className="panel">
          <p className="eyebrow">Crewmate Detail</p>
          <h2 className="section-title">{crewmate.name}</h2>
          <p className="muted">{categoryInfo?.description}</p>

          <div className="action-row">
            <Link className="primary-button" to={`/crewmates/${crewmate.id}/edit`}>
              Edit crewmate
            </Link>
            <Link className="secondary-button" to="/crew">
              Back to gallery
            </Link>
          </div>

          <div className="detail-list">
            <div className="detail-item">
              <span>Category</span>
              <strong>{crewmate.category}</strong>
            </div>
            <div className="detail-item">
              <span>Specialty</span>
              <strong>{crewmate.specialty}</strong>
            </div>
            <div className="detail-item">
              <span>Color</span>
              <strong>
                <span
                  className="swatch-dot"
                  style={{ backgroundColor: COLOR_SWATCHES[crewmate.color] }}
                  aria-hidden="true"
                />
                {' '}
                {crewmate.color}
              </strong>
            </div>
            <div className="detail-item">
              <span>Speed</span>
              <strong>{crewmate.speed}</strong>
            </div>
            <div className="detail-item">
              <span>Stamina</span>
              <strong>{crewmate.stamina}</strong>
            </div>
            <div className="detail-item">
              <span>Readiness</span>
              <strong>
                {readiness.label} ({readiness.score}%)
              </strong>
            </div>
            <div className="detail-item">
              <span>Created</span>
              <strong>{formatCreatedAt(crewmate.created_at)}</strong>
            </div>
          </div>
        </div>

        <div className="panel">
          <p className="eyebrow">Extra Info</p>
          <div className="quote-block">
            {crewmate.bio?.trim()
              ? `"${crewmate.bio.trim()}"`
              : 'No bio yet. Add one from the edit page to give this crewmate more story.'}
          </div>

          <div className="detail-list">
            <div className="detail-item">
              <span>Unique profile link</span>
              <strong>{`/crewmates/${crewmate.id}`}</strong>
            </div>
            <div className="detail-item">
              <span>Shareable URL</span>
              <strong className="direct-link">{shareLink}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrewmateDetailPage;
