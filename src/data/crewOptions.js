export const CATEGORY_OPTIONS = {
  Navigator: {
    description: 'Charts routes, reads signals, and keeps the crew moving in the right direction.',
    colorOptions: ['Comet Blue', 'Solar Gold', 'Orbit Silver'],
    specialtyOptions: ['Astromaps', 'Recon', 'Diplomacy'],
  },
  Engineer: {
    description: 'Keeps every system online, patched, and ready for one more impossible mission.',
    colorOptions: ['Nebula Teal', 'Moss Green', 'Orbit Silver'],
    specialtyOptions: ['Systems', 'Repairs', 'Shields'],
  },
  Guardian: {
    description: 'Protects the team, absorbs pressure, and turns close calls into wins.',
    colorOptions: ['Mars Coral', 'Solar Gold', 'Comet Blue'],
    specialtyOptions: ['Defense', 'Rescue', 'Training'],
  },
  Scientist: {
    description: 'Finds patterns, runs experiments, and unlocks the next breakthrough.',
    colorOptions: ['Nebula Teal', 'Comet Blue', 'Orbit Silver'],
    specialtyOptions: ['Biotech', 'Signals', 'Data'],
  },
};

export const CATEGORY_ORDER = Object.keys(CATEGORY_OPTIONS);

export const COLOR_SWATCHES = {
  'Comet Blue': '#5b7cfa',
  'Solar Gold': '#f4b942',
  'Orbit Silver': '#ccd6e0',
  'Nebula Teal': '#2cb1a1',
  'Moss Green': '#73c66d',
  'Mars Coral': '#ff7768',
};

export const SPEED_OPTIONS = [1, 2, 3, 4, 5];
export const STAMINA_OPTIONS = [1, 2, 3, 4, 5];

export const getDefaultCrewmate = () => {
  const category = CATEGORY_ORDER[0];
  const categoryConfig = CATEGORY_OPTIONS[category];

  return {
    id: null,
    name: '',
    category,
    color: categoryConfig.colorOptions[0],
    specialty: categoryConfig.specialtyOptions[0],
    speed: 3,
    stamina: 3,
    bio: '',
  };
};

export const getStatDescriptor = (value) => {
  if (value >= 5) return 'elite';
  if (value >= 4) return 'strong';
  if (value >= 3) return 'steady';
  if (value >= 2) return 'developing';
  return 'rookie';
};
