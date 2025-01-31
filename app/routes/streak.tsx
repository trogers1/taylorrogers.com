import type { Route } from './+types/home';
import { type ObjOption } from '../streak/ObjOptionSelector';
import {
  FilterBuilderInput,
  type FilterDefinition,
  type FilterState,
  type FilterUpdateFunction,
} from '../streak/FilterBuilderInput';
import {
  inverseNumberRelationalOperators,
  inverseStringRelationalOperators,
  numberRelationalOperators,
  stringRelationalOperators,
} from '~/streak/operators';
import { useState } from 'react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Streak Input Component' },
    {
      name: 'description',
      content: 'Auto-complete filter builder using an input and pills',
    },
  ];
}

const FILTER_QUERY_KEY = '_f';
export function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const filterStates = url.searchParams.getAll(FILTER_QUERY_KEY);
  if (filterStates.length > 1) {
    console.error(
      `Found multiple filter states (${filterStates.length}):\n${filterStates.join('\n')}`,
    );
  }
  const decodedFilterState = decodeURIComponent(filterStates[0] || '[]');
  console.log({ decodedFilterState });
  const filterState = JSON.parse(decodedFilterState) as FilterState;
  return { filterState };
}

// TODO: Convert to an action with loader
const getClientEmails: () => Promise<ObjOption[]> = () =>
  new Promise((resolve) =>
    resolve([
      { email: 'timmy@example.com' },
      { email: 'joe@example.com' },
      { email: 'vira@example.com' },
      { email: 'jane@example.com' },
    ]),
  );

const StreakPage: React.FC = () => {
  const [filterState, setFilterState] = useState<FilterState>([]);
  console.log({ filterState });
  const onFilterUpdate: FilterUpdateFunction = async ({ newFilterState }) => {
    setFilterState(newFilterState);
  };
  const FILTERS: FilterDefinition[] = [
    {
      filterKey: 'email',
      shouldAllowCustomText: true,
      validRelationalOperators: [
        ...stringRelationalOperators,
        ...inverseStringRelationalOperators,
      ],
      getOptions: getClientEmails,
      optionKey: 'email',
    },
    {
      filterKey: 'Number of emails',
      shouldAllowCustomText: false,
      validRelationalOperators: [
        ...numberRelationalOperators,
        ...inverseNumberRelationalOperators,
      ],
      optionKey: 'number',
    },
    {
      filterKey: 'sentAt',
      shouldAllowCustomText: false,
      validRelationalOperators: [
        ...numberRelationalOperators,
        ...inverseNumberRelationalOperators,
      ],
      optionKey: 'date',
    },
  ] as const;
  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 px-4 py-12 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center">
          <FilterBuilderInput
            filterState={filterState}
            onFilterUpdate={onFilterUpdate}
            filterDefinitions={FILTERS}
          />
        </div>
      </div>
    </div>
  );
};

export default StreakPage;
