import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { formatDate } from '../utils/format';

export default function Timeline({ steps }) {
  return (
    <div>
      <ol className="relative border-l-2 border-gray-200 ml-3">
        {steps.map((step, idx) => (
          <li key={idx} className="mb-6 last:mb-0 ml-6">
            <span
              className={`absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-white ${
                step.done ? 'text-green-600' : step.current ? 'text-navy-700' : 'text-gray-300'
              }`}
            >
              {step.done ? (
                <CheckCircle2 size={20} />
              ) : step.current ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Circle size={20} />
              )}
            </span>
            <p className={`text-sm font-medium ${step.done || step.current ? 'text-navy-900' : 'text-gray-400'}`}>
              {step.step}
            </p>
            {step.date && <p className="text-xs text-gray-500 mt-0.5">{formatDate(step.date)}</p>}
            {step.current && !step.date && <p className="text-xs text-navy-600 mt-0.5">In progress</p>}
          </li>
        ))}
      </ol>
      <p className="text-xs text-gray-400 mt-2">Tracking status is simulated for this prototype.</p>
    </div>
  );
}
