/** The Ton Up mark: a dartboard's double, treble and bull rings. */
export function Mark({ size = 28, ink = "currentColor" }: { size?: number; ink?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="none" stroke={ink} strokeWidth="2" />
      <circle cx="14" cy="14" r="6" fill="none" stroke={ink} strokeWidth="2" />
      <circle cx="14" cy="14" r="2" fill="var(--accent-fill, #c8102e)" />
    </svg>
  );
}

/** Small padlock used on Pro badges. */
export function Lock({ size = 10, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke={color} strokeWidth="3">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
