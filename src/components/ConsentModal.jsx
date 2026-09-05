import { ShieldCheck } from 'lucide-react';

export default function ConsentModal({ open, title, fields, onCancel, onAllow, allowLabel = 'Allow & Fill' }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="rounded-full bg-navy-50 p-2">
            <ShieldCheck size={20} className="text-navy-700" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-navy-900">{title || 'Use GovConnect Auto-Fill?'}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-3">The following data from your GovConnect profile will be shared:</p>
        <ul className="mb-5 space-y-1.5">
          {fields.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-navy-800">
              <span className="text-green-600">✓</span> {f}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-400 mb-5">Consent functionality is simulated for this prototype.</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-h-[40px]"
          >
            Cancel
          </button>
          <button
            onClick={onAllow}
            className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-medium text-white hover:bg-navy-900 transition-colors min-h-[40px]"
          >
            {allowLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
