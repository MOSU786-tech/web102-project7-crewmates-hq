// Mentor map: Shared create/edit form UI for crewmates.
// Why it exists: Reuses one controlled form for both create and update flows.
// Used by: CreateCrewmatePage and EditCrewmatePage.
import { Link } from 'react-router-dom';
import './CrewmateForm.css';
import {
  CATEGORY_OPTIONS,
  CATEGORY_ORDER,
  COLOR_SWATCHES,
  STAMINA_OPTIONS,
  SPEED_OPTIONS,
  getStatDescriptor,
} from '../data/crewOptions';
import { getCrewmateReadiness } from '../utils/crewMetrics';

const CrewmateForm = ({
  title,
  subtitle,
  crewmate,
  setCrewmate,
  onSubmit,
  onDelete,
  submitLabel,
  isSubmitting,
  statusMessage,
  statusTone = 'info',
}) => {
  const categoryConfig = CATEGORY_OPTIONS[crewmate.category] ?? CATEGORY_OPTIONS[CATEGORY_ORDER[0]];
  const readiness = getCrewmateReadiness(crewmate);

  const handleTextChange = (event) => {
    const { name, value } = event.target;

    setCrewmate((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const selectCategory = (nextCategory) => {
    const nextCategoryConfig = CATEGORY_OPTIONS[nextCategory];

    setCrewmate((current) => ({
      ...current,
      category: nextCategory,
      color: nextCategoryConfig.colorOptions.includes(current.color)
        ? current.color
        : nextCategoryConfig.colorOptions[0],
      specialty: nextCategoryConfig.specialtyOptions.includes(current.specialty)
        ? current.specialty
        : nextCategoryConfig.specialtyOptions[0],
    }));
  };

  const selectValue = (field, value) => {
    setCrewmate((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <div className="form-layout">
      <form className="panel form-card" onSubmit={onSubmit}>
        <div className="section-header">
          <div>
            <p className="eyebrow">Crew Builder</p>
            <h2 className="section-title">{title}</h2>
            <p className="muted">{subtitle}</p>
          </div>

          {crewmate.id ? (
            <Link className="secondary-button" to={`/crewmates/${crewmate.id}`}>
              View detail page
            </Link>
          ) : null}
        </div>

        {statusMessage ? (
          <div className={`status-banner status-banner--${statusTone}`}>{statusMessage}</div>
        ) : null}

        <label className="field-block" htmlFor="name">
          <span>Name</span>
          <input
            id="name"
            name="name"
            className="text-input"
            maxLength="50"
            placeholder="Nova Pulse"
            value={crewmate.name}
            onChange={handleTextChange}
          />
        </label>

        <div className="form-section">
          <div>
            <p className="field-label">Category</p>
            <p className="field-helper">
              Category controls which colors and specialties this crewmate can use.
            </p>
          </div>
          <div className="option-grid">
            {CATEGORY_ORDER.map((category) => (
              <button
                key={category}
                className={`option-button ${crewmate.category === category ? 'is-active' : ''}`}
                type="button"
                onClick={() => selectCategory(category)}
              >
                <strong>{category}</strong>
                <span>{CATEGORY_OPTIONS[category].description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-section">
          <div>
            <p className="field-label">Color</p>
            <p className="field-helper">Pick one of the allowed palette values for this category.</p>
          </div>
          <div className="option-grid option-grid--compact">
            {categoryConfig.colorOptions.map((color) => (
              <button
                key={color}
                className={`option-button option-button--swatch ${
                  crewmate.color === color ? 'is-active' : ''
                }`}
                type="button"
                onClick={() => selectValue('color', color)}
              >
                <span
                  className="swatch-dot"
                  style={{ backgroundColor: COLOR_SWATCHES[color] }}
                  aria-hidden="true"
                />
                <span>{color}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-two-up">
          <div className="form-section">
            <div>
              <p className="field-label">Speed</p>
              <p className="field-helper">How quickly this crewmate reacts under pressure.</p>
            </div>
            <div className="pill-row">
              {SPEED_OPTIONS.map((speed) => (
                <button
                  key={speed}
                  className={`pill-button ${Number(crewmate.speed) === speed ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => selectValue('speed', speed)}
                >
                  {speed}
                </button>
              ))}
            </div>
          </div>

          <div className="form-section">
            <div>
              <p className="field-label">Stamina</p>
              <p className="field-helper">How long they can keep the mission on track.</p>
            </div>
            <div className="pill-row">
              {STAMINA_OPTIONS.map((stamina) => (
                <button
                  key={stamina}
                  className={`pill-button ${Number(crewmate.stamina) === stamina ? 'is-active' : ''}`}
                  type="button"
                  onClick={() => selectValue('stamina', stamina)}
                >
                  {stamina}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-section">
          <div>
            <p className="field-label">Specialty</p>
            <p className="field-helper">Choose one specialty available to the selected category.</p>
          </div>
          <div className="option-grid option-grid--compact">
            {categoryConfig.specialtyOptions.map((specialty) => (
              <button
                key={specialty}
                className={`option-button ${crewmate.specialty === specialty ? 'is-active' : ''}`}
                type="button"
                onClick={() => selectValue('specialty', specialty)}
              >
                <strong>{specialty}</strong>
              </button>
            ))}
          </div>
        </div>

        <label className="field-block" htmlFor="bio">
          <span>Bio</span>
          <textarea
            id="bio"
            name="bio"
            className="text-input text-input--area"
            maxLength="220"
            placeholder="What makes this crewmate valuable when things get messy?"
            value={crewmate.bio}
            onChange={handleTextChange}
          />
        </label>

        <div className="action-row">
          <button
            className="primary-button"
            type="submit"
            disabled={isSubmitting || !crewmate.name.trim()}
          >
            {isSubmitting ? 'Saving...' : submitLabel}
          </button>

          {onDelete ? (
            <button className="danger-button" type="button" onClick={onDelete} disabled={isSubmitting}>
              Delete crewmate
            </button>
          ) : null}

          <Link className="secondary-button" to="/crew">
            Back to gallery
          </Link>
        </div>
      </form>

      <aside className="panel preview-card">
        <div className="section-header">
          <div>
            <p className="eyebrow">Live Preview</p>
            <h3>{crewmate.name.trim() || 'Unnamed Recruit'}</h3>
          </div>
          <span className="preview-score">{readiness.score}% ready</span>
        </div>

        <p className="preview-category">{crewmate.category}</p>
        <p className="muted">{categoryConfig.description}</p>

        <div className="preview-pill-row">
          <span className="preview-pill">
            <span
              className="swatch-dot"
              style={{ backgroundColor: COLOR_SWATCHES[crewmate.color] }}
              aria-hidden="true"
            />
            {crewmate.color}
          </span>
          <span className="preview-pill">{crewmate.specialty}</span>
          <span className="preview-pill">{readiness.label}</span>
        </div>

        <div className="preview-stats">
          <div>
            <span>Speed</span>
            <strong>{crewmate.speed}</strong>
            <small>{getStatDescriptor(Number(crewmate.speed))}</small>
          </div>
          <div>
            <span>Stamina</span>
            <strong>{crewmate.stamina}</strong>
            <small>{getStatDescriptor(Number(crewmate.stamina))}</small>
          </div>
        </div>

        <div className="quote-block">
          {crewmate.bio.trim()
            ? `"${crewmate.bio.trim()}"`
            : 'Add a short bio to give this crewmate more personality on the detail page.'}
        </div>
      </aside>
    </div>
  );
};

export default CrewmateForm;
