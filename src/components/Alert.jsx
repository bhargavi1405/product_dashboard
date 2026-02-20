export default function Alert({ type, message, show }) {
  if (!show) return null;
  return <div className={`alert ${type}`}>{message}</div>;
}
