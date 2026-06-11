interface MaterialIconProps {
  name: string;
  className?: string;
  filled?: boolean;
}

export function MaterialIcon({ name, className = "", filled }: MaterialIconProps) {
  return (
    <span
      aria-hidden
      className={`material-symbols-outlined ${className}`}
      style={
        filled
          ? { fontVariationSettings: "'FILL' 1" }
          : undefined
      }
    >
      {name}
    </span>
  );
}
