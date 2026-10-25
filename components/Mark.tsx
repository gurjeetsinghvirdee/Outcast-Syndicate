/** Four lanes, one live clip: the syndicate's mark. */
export function Mark({ size = 22, title }: { size?: number; title?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="1" y="2.5" width="13" height="3.4" fill="#111111" />
      <rect x="7.5" y="7.8" width="15.5" height="3.4" fill="#c8ff00" stroke="#111111" strokeWidth="1" />
      <rect x="3.5" y="13.1" width="10" height="3.4" fill="#111111" />
      <rect x="10" y="18.4" width="13" height="3.4" fill="#111111" />
    </svg>
  );
}
