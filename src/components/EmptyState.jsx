import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 border border-dashed border-gray-300 rounded-xl bg-white">
      <Icon size={36} className="text-gray-400 mb-3" />
      <h3 className="font-heading text-lg font-semibold text-navy-900 mb-1">{title}</h3>
      {description && <p className="text-gray-500 text-sm max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}
