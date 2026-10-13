/**
 * Line icons used across the page. Inner SVG markup is static and local, so
 * dangerouslySetInnerHTML is safe here.
 */
const PATHS = {
  "shield-check": '<path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/><path d="M9 12l2 2 4-4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  "search-plus": '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/><path d="M11 8v6M8 11h6"/>',
  search: '<circle cx="11" cy="11" r="6"/><path d="M20 20l-4.5-4.5"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  armchair: '<path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M3 15a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3H3z"/><path d="M6 18v2M18 18v2"/>',
  car: '<path d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v4H3z"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/>',
  "car-check": '<path d="M3 13l2-5a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 5v4H3z"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/><path d="M9 4l1.5 1.5L14 2"/>',
  sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 17v4M17 19h4"/>',
  tint: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 14l6-6M10 20l10-10"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  scratch: '<path d="M4 20L20 4M8 20L20 8M4 16L16 4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
  steam: '<path d="M3 8c3-3 6 3 9 0s6 3 9 0M3 14c3-3 6 3 9 0s6 3 9 0M3 20c3-3 6 3 9 0s6 3 9 0"/>',
  wind: '<path d="M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7"/>',
  roof: '<path d="M3 18v-5a9 9 0 0 1 18 0v5z"/><path d="M3 18h18"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  half: '<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  chat: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/>',
  check: '<path d="M5 12l4 4 10-10"/>',
  instagram: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/>',
  facebook: '<path d="M14 8h2V5h-2.5A3.5 3.5 0 0 0 10 8.5V11H8v3h2v6h3v-6h2.2l.5-3H13V8.7c0-.4.3-.7.7-.7z"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  polish: '<circle cx="12" cy="12" r="8"/><path d="M8 12a4 4 0 0 1 8 0"/><path d="M12 4v4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  prev: '<path d="M15 6l-6 6 6 6"/>',
  next: '<path d="M9 6l6 6-6 6"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  truck: '<path d="M2 7h11v9H2zM13 10h4l3 3v3h-7"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="16" cy="17.5" r="1.8"/>',
  hammer: '<path d="M14 3l7 7-3 3-7-7z"/><path d="M11 6L5 12l2 2 6-6"/><path d="M12 13l-8 8"/>',
  burst: '<circle cx="12" cy="12" r="1.6"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  headlight: '<circle cx="15" cy="12" r="5"/><path d="M3 8h5M2 12h6M3 16h5"/>',
  molecule: '<circle cx="12" cy="6" r="2.2"/><circle cx="6" cy="17" r="2.2"/><circle cx="18" cy="17" r="2.2"/><path d="M11 8l-4 7M13 8l4 7M8.4 17h7.2"/>',
  swirl: '<path d="M12 4a8 8 0 1 0 8 8"/><path d="M12 8a4 4 0 1 0 4 4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7.5" stroke-dasharray="3.2 2.3"/>',
  diamond: '<path d="M6 4h12l4 6-10 11L2 10z"/><path d="M2 10h20M9 4l-3 6 6 11 6-11-3-6"/>',
  chats: '<path d="M3 5h11v8H7l-4 3z"/><path d="M10 15h5l4 3v-8h-3"/>',
  seat: '<path d="M9 3h4v7H9z"/><path d="M4 13h16v4H4z"/><path d="M6 17v3M18 17v3"/>',
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({
  name,
  strokeWidth = 1.6,
}: {
  name: IconName;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: PATHS[name] }}
    />
  );
}
