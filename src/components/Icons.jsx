const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

// Figma "u:arrow-down-left": a 12x12 arrow centered in a 24x24 frame, rotated 45deg so it points left.
export const BackIcon = (props) => (
  <svg {...base} width={24} height={24} {...props}>
    <path d="M18 6L6 18M6 18V9.5M6 18h8.5" transform="rotate(45 12 12)" />
  </svg>
);

export const PhoneIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const LogoutIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
  </svg>
);

export const StarIcon = (props) => (
  <svg {...base} fill="currentColor" stroke="none" {...props}>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
  </svg>
);

export const MinusIcon = (props) => (
  <svg {...base} strokeWidth={3} {...props}>
    <path d="M5 12h14" />
  </svg>
);

export const PlusIcon = (props) => (
  <svg {...base} strokeWidth={3} {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
