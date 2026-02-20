export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled,
}) {
  return (
    <button className={`btn ${variant}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
