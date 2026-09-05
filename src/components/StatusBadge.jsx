const STATUS_STYLES = {
  Submitted: 'bg-blue-50 text-blue-700 border-blue-200',
  Processing: 'bg-purple-50 text-purple-700 border-purple-200',
  'Under Review': 'bg-yellow-50 text-yellow-800 border-yellow-200',
  'Action Required': 'bg-orange-50 text-orange-700 border-orange-200',
  Approved: 'bg-green-50 text-green-700 border-green-200',
  Rejected: 'bg-red-50 text-red-700 border-red-200',
};

const DOT_STYLES = {
  Submitted: 'bg-blue-500',
  Processing: 'bg-purple-500',
  'Under Review': 'bg-yellow-500',
  'Action Required': 'bg-orange-500',
  Approved: 'bg-green-500',
  Rejected: 'bg-red-500',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  const dot = DOT_STYLES[status] || 'bg-gray-400';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${style}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
