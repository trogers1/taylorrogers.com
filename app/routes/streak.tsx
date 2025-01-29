import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';
import { Autocomplete } from '../streak/Autocomplete';
import {
  FilterBuilderInput,
  type FilterDefinition,
  type FilterSelectionComponentProps,
  type FilterState,
  type FilterUpdateFunction,
} from '../streak/FilterBuilderInput';
import {
  inverseStringRelationalOperators,
  stringRelationalOperators,
} from '~/streak/operators';

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
  const filterState = JSON.parse(filterStates[0] || '[]') as FilterState;
  return { filterState };
}

// TODO: Convert to an action with loader
const getClientEmails: () => Promise<string[]> = () =>
  new Promise((resolve) =>
    resolve([
      'timmy@example.com',
      'joe@example.com',
      'vira@example.com',
      'jane@example.com',
    ]),
  );

const StreakPage: React.FC = () => {
  const { filterState } = useLoaderData<typeof loader>();
  console.log({ filterState });
  const onFilterUpdate: FilterUpdateFunction = async ({ currFilterState }) => {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    searchParams.delete(FILTER_QUERY_KEY);
    searchParams.append(
      FILTER_QUERY_KEY,
      encodeURIComponent(JSON.stringify(currFilterState)),
    );
    window.location.replace(url);
  };
  const FILTERS: FilterDefinition[] = [
    {
      key: 'email',
      validComparators: [
        ...stringRelationalOperators,
        ...inverseStringRelationalOperators,
      ],
      SelectOptions: (props: FilterSelectionComponentProps) => (
        <Autocomplete
          input={props.input}
          onFilterOptionSelect={(selection: string) => {
            const newFilterState = [...filterState];
            onFilterUpdate({ currFilterState: newFilterState });
            return newFilterState;
          }}
          getOptions={getClientEmails}
        />
      ),
    },
    // {
    //   key: 'sentAt',
    //   validComparators: [...numberComparators, ...inverseNumberComparators],
    //   getOptions: getClientEmails,
    // },
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
