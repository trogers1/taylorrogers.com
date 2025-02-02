import type { FilterValue, FullFilter } from './FilterBuilderInput';

type FilterPillArgs = Partial<FullFilter> & {
  onDelete: (args: Partial<FullFilter>) => void;
};

export const FilterPill = ({
  filterKey,
  relationalOperator,
  values,
  localId,
  onDelete,
}: FilterPillArgs) => {
  // Determine the color scheme based on whether `localId` exists
  const colorScheme = localId
    ? 'bg-blue-500 border-blue-700 hover:bg-blue-600'
    : 'bg-red-500 border-red-700 hover:bg-red-600';
  return (
    <button
      onClick={(_) =>
        onDelete({ localId, filterKey, values, relationalOperator })
      }
      aria-label={`${localId ? 'Applied' : 'In progress'} Filter: ${filterKey} ${relationalOperator || ''} ${values ? values.join(', ') : ''}`}
      id={`filterPill${localId ?? '_inProgress'}`}
      aria-details="Press 'Enter' or 'Backspace' to delete"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Backspace') {
          onDelete({ localId, filterKey, values, relationalOperator });
        }
      }}
      tabIndex={0}
      className={`inline-flex items-center rounded-full border-2 ${colorScheme} font-small px-3 py-1 text-xs text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-red-500`}
    >
      {filterKey} {relationalOperator} {values?.join(', ')}
      <div className="ml-2 rounded-full p-1 hover:bg-blue-600 focus:outline-none">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </button>
  );
};
