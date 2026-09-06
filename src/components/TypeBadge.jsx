import { useLanguage } from '../context/LanguageContext';

export default function TypeBadge({ type }) {
  const { t } = useLanguage();

  const isScheme = type === 'SCHEME';

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1
        text-xs
        font-semibold
        ${
          isScheme
            ? 'bg-green-100 text-green-800'
            : 'bg-navy-100 text-navy-800'
        }
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${
            isScheme
              ? 'bg-green-600'
              : 'bg-navy-600'
          }
        `}
      />

      {isScheme
        ? t('scheme')
        : t('digitalService')}
    </span>
  );
}