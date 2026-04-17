// Mentor map: Converts raw Supabase errors into user-friendly messages.
// Why it exists: Prevents duplicate error handling logic across pages.
// Used by: Create, read, detail, and edit crewmate pages.
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
