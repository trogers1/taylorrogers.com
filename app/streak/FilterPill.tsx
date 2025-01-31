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
  return (
    <button
      onClick={(_) =>
        onDelete({ localId, filterKey, values, relationalOperator })
      }
      aria-label={`Applied Filter: ${filterKey} ${relationalOperator} ${values?.join(', ')}`}
      id={`filterPill${localId}`}
      aria-details="Press 'Enter' or 'Backspace' to delete"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'Backspace') {
          onDelete({ localId, filterKey, values, relationalOperator });
        }
      }}
      tabIndex={0}
      className={`inline-flex items-center rounded-s-full rounded-e-${values ? 'full' : 'none'} bg-${values ? 'blue' : 'red'}-500 font-small py-none px-3 text-xs text-black`}
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
