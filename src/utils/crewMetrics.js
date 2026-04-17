// Mentor map: Pure utility functions for date formatting and score calculations.
// Why it exists: Keeps business logic out of UI components.
// Used by: CrewGalleryPage, CrewmateCard, CrewmateDetailPage, CrewmateForm.
export const formatCreatedAt = (value) => {
  if (!value) return 'Unknown';

  return new Date(value).toLocaleString([], {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const getCrewmateReadiness = (crewmate) => {
  const speed = Number(crewmate?.speed ?? 0);
  const stamina = Number(crewmate?.stamina ?? 0);
  const score = Math.round(((speed + stamina) / 10) * 100);

  if (score >= 85) {
    return { score, label: 'Mission Ready' };
  }

  if (score >= 65) {
    return { score, label: 'On Track' };
  }

  return { score, label: 'Needs Training' };
};

export const getCrewSummary = (crewmates) => {
  if (!crewmates.length) {
    return {
      totalCrewmates: 0,
      averageSpeed: '0.0',
      averageStamina: '0.0',
      readyPercent: 0,
      topCategory: 'No crew yet',
      successScore: 0,
      theme: 'steady',
      headline: 'Your hangar is quiet. Start by creating your first crewmate.',
    };
  }

  const totals = crewmates.reduce(
    (summary, crewmate) => {
      summary.speed += Number(crewmate.speed ?? 0);
      summary.stamina += Number(crewmate.stamina ?? 0);
      summary.categoryCount[crewmate.category] =
        (summary.categoryCount[crewmate.category] ?? 0) + 1;

      if (getCrewmateReadiness(crewmate).score >= 70) {
        summary.readyCount += 1;
      }

      return summary;
    },
    { speed: 0, stamina: 0, readyCount: 0, categoryCount: {} },
  );

  const averageSpeed = totals.speed / crewmates.length;
  const averageStamina = totals.stamina / crewmates.length;
  const readyPercent = Math.round((totals.readyCount / crewmates.length) * 100);
  const categoryEntries = Object.entries(totals.categoryCount);
  const topCategory = categoryEntries.sort((left, right) => right[1] - left[1])[0][0];
  const diversityBonus = Math.round((categoryEntries.length / 4) * 15);
  const successScore = Math.min(
    100,
    Math.round(averageSpeed * 10 + averageStamina * 10 + readyPercent * 0.4 + diversityBonus),
  );

  if (successScore >= 82) {
    return {
      totalCrewmates: crewmates.length,
      averageSpeed: averageSpeed.toFixed(1),
      averageStamina: averageStamina.toFixed(1),
      readyPercent,
      topCategory,
      successScore,
      theme: 'elite',
      headline: 'This crew looks polished, balanced, and ready to launch.',
    };
  }

  if (successScore >= 65) {
    return {
      totalCrewmates: crewmates.length,
      averageSpeed: averageSpeed.toFixed(1),
      averageStamina: averageStamina.toFixed(1),
      readyPercent,
      topCategory,
      successScore,
      theme: 'steady',
      headline: 'Solid momentum. A few more tuned-up recruits and this crew gets dangerous.',
    };
  }

  return {
    totalCrewmates: crewmates.length,
    averageSpeed: averageSpeed.toFixed(1),
    averageStamina: averageStamina.toFixed(1),
    readyPercent,
    topCategory,
    successScore,
    theme: 'scrappy',
    headline: 'Potential is here, but this roster still needs reps before the big mission.',
  };
};
