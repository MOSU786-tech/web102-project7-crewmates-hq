import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CrewmateForm from '../components/CrewmateForm';
import { CREWMATES_TABLE, supabase } from '../client';
import { getDefaultCrewmate } from '../data/crewOptions';
import { formatSupabaseError } from '../utils/supabaseErrors';

const CreateCrewmatePage = () => {
  const navigate = useNavigate();
  const [crewmate, setCrewmate] = useState(getDefaultCrewmate());
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState('info');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createCrewmate = async (event) => {
    event.preventDefault();

    if (!crewmate.name.trim()) {
      setStatusTone('error');
      setStatusMessage('Give your crewmate a name before saving.');
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

    const { error } = await supabase.from(CREWMATES_TABLE).insert(payload);

    if (error) {
      setStatusTone('error');
      setStatusMessage(formatSupabaseError(error));
      setIsSubmitting(false);
      return;
    }

    navigate('/crew');
  };

  return (
    <section className="page-section">
      <CrewmateForm
        title="Create a new crewmate"
        subtitle="Pick a category first, then click through the available attribute values to shape your recruit."
        crewmate={crewmate}
        setCrewmate={setCrewmate}
        onSubmit={createCrewmate}
        submitLabel="Launch crewmate"
        isSubmitting={isSubmitting}
        statusMessage={statusMessage}
        statusTone={statusTone}
      />
    </section>
  );
};

export default CreateCrewmatePage;
