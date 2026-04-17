export const formatSupabaseError = (error) => {
  if (!error) {
    return 'Something went wrong.';
  }

  const message = error.message ?? 'Something went wrong.';

  if (/relation|column|schema/i.test(message)) {
    return 'Supabase could not find the expected Crewmates table or columns. Run the SQL in supabase-setup.sql, then refresh and try again.';
  }

  return message;
};
