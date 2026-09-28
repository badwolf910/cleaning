// Minimal line-icon set (stroke = currentColor) used in place of emoji for a refined look.

const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

export function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function LeafIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M20 4c-9 0-16 6-16 15 9 0 16-6 16-15z" />
      <path d="M5 19c3-5 7-8 12-10" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function BadgeCheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12.2l2.3 2.3 4.7-4.9" />
    </svg>
  );
}

export function BroomIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M14 4l6 6-3 3-6-6z" />
      <path d="M11 9L4 16l1.5 3.5L9 21l7-7" />
      <path d="M5.5 19.5l3-3" />
    </svg>
  );
}

export function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" />
    </svg>
  );
}

export function BoxIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M3.5 8l8.5-4 8.5 4-8.5 4-8.5-4z" />
      <path d="M3.5 8v8l8.5 4 8.5-4V8" />
      <path d="M12 12v8" />
    </svg>
  );
}
