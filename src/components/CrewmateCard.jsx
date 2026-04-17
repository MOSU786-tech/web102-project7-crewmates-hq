// Mentor map: Summary card for one crewmate in the gallery list.
// Why it exists: Encapsulates quick actions (open detail/edit) and key stats display.
// Used by: CrewGalleryPage list rendering.
import { Link, useNavigate } from 'react-router-dom';
import './CrewmateCard.css';
import { COLOR_SWATCHES } from '../data/crewOptions';
import { formatCreatedAt, getCrewmateReadiness } from '../utils/crewMetrics';

const CrewmateCard = ({ crewmate, successTheme }) => {
  const navigate = useNavigate();
  const readiness = getCrewmateReadiness(crewmate);

  const openDetailPage = () => {
    navigate(`/crewmates/${crewmate.id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openDetailPage();
    }
  };

  return (
    <article
      className={`crewmate-card crewmate-card--${successTheme}`}
      onClick={openDetailPage}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex="0"
    >
      <div className="card-header">
        <div>
          <p className="eyebrow">{crewmate.category}</p>
          <h3>{crewmate.name}</h3>
        </div>

        <Link
          className="inline-button"
          to={`/crewmates/${crewmate.id}/edit`}
          onClick={(event) => event.stopPropagation()}
        >
          Edit
        </Link>
      </div>

      <div className="card-pill-row">
        <span className="card-pill">
          <span
            className="swatch-dot"
            style={{ backgroundColor: COLOR_SWATCHES[crewmate.color] }}
            aria-hidden="true"
          />
          {crewmate.color}
        </span>
        <span className="card-pill">{crewmate.specialty}</span>
        <span className="card-pill">{readiness.label}</span>
      </div>

      <div className="card-stats">
        <div>
          <span>Speed</span>
          <strong>{crewmate.speed}</strong>
        </div>
        <div>
          <span>Stamina</span>
          <strong>{crewmate.stamina}</strong>
        </div>
      </div>

      <div className="card-footer">
        <span>Created {formatCreatedAt(crewmate.created_at)}</span>
        <Link
          className="card-link"
          to={`/crewmates/${crewmate.id}`}
          onClick={(event) => event.stopPropagation()}
        >
          Open profile
        </Link>
      </div>
    </article>
  );
};

export default CrewmateCard;
