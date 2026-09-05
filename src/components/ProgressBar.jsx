export default function ProgressBar({ percent, colorClass = 'bg-navy-700' }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
