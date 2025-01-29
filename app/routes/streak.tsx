import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';

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
  const filterState = JSON.parse(filterStates[0] || '[]');
  return { filterState };
}

const StreakPage: React.FC = () => {
  const { filterState } = useLoaderData<typeof loader>();
  console.log({ filterState });
  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 px-4 py-12 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center">
          <input />
        </div>
      </div>
    </div>
  );
};

export default StreakPage;
