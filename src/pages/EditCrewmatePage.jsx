import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CrewmateForm from '../components/CrewmateForm';
import { CREWMATES_TABLE, supabase } from '../client';
import { formatSupabaseError } from '../utils/supabaseErrors';

const EditCrewmatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState('info');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setStatusTone('error');
        setStatusMessage(formatSupabaseError(error));
        setCrewmate(null);
      } else {
        setStatusMessage('');
        setCrewmate(data);
      }

      setLoading(false);
    };

    fetchCrewmate();

    return () => {
      ignore = true;
    };
  }, [id]);

  const updateCrewmate = async (event) => {
    event.preventDefault();

    if (!crewmate?.name.trim()) {
      setStatusTone('error');
      setStatusMessage('Your crewmate still needs a name.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: crewmate.name.trim(),
      category: crewmate.category,
      color: crewmate.color,
      specialty: crewmate.specialty,
      speed: Number(crewmate.speed),
      stamina: Number(crewmate.stamina),
      bio: crewmate.bio.trim(),
    };

    const { error } = await supabase.from(CREWMATES_TABLE).update(payload).eq('id', id);

    if (error) {
      setStatusTone('error');
      setStatusMessage(formatSupabaseError(error));
      setIsSubmitting(false);
      return;
    }

    navigate('/crew');
  };

  const deleteCrewmate = async () => {
    if (!window.confirm('Delete this crewmate from the roster?')) {
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from(CREWMATES_TABLE).delete().eq('id', id);

    if (error) {
      setStatusTone('error');
      setStatusMessage(formatSupabaseError(error));
      setIsSubmitting(false);
      return;
    }

    navigate('/crew');
  };

  if (loading) {
    return (
      <section className="page-section">
        <div className="status-banner status-banner--info">Loading crewmate for editing...</div>
      </section>
    );
  }

  if (!crewmate) {
    return (
      <section className="page-section">
        <div className="status-banner status-banner--error">
          {statusMessage || 'Crewmate not found.'}
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <CrewmateForm
        title={`Update ${crewmate.name}`}
        subtitle="You can edit the current values below, and delete this crewmate from the same page if needed."
        crewmate={crewmate}
        setCrewmate={setCrewmate}
        onSubmit={updateCrewmate}
        onDelete={deleteCrewmate}
        submitLabel="Save changes"
        isSubmitting={isSubmitting}
        statusMessage={statusMessage}
        statusTone={statusTone}
      />
    </section>
  );
};

export default EditCrewmatePage;
