import type { Route } from './+types/home';
import { useLoaderData } from 'react-router';
import { ObjOptionSelector, type ObjOption } from '../streak/ObjOptionSelector';
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
import { useOptimistic, useRef, useState } from 'react';

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
  const { filterState } = useLoaderData<typeof loader>();
  const [optimisticFilterState, addOptimisticFilterState] = useOptimistic(
    filterState,
    (_: FilterState, newFilterState: FilterState) => newFilterState,
  );
  console.log({ filterState });
  const onFilterUpdate: FilterUpdateFunction = async ({ newFilterState }) => {
    addOptimisticFilterState(newFilterState);
    console.log({ afteroptimistic: newFilterState });
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    searchParams.delete(FILTER_QUERY_KEY);
    searchParams.append(
      FILTER_QUERY_KEY,
      encodeURIComponent(JSON.stringify(newFilterState)),
    );
    console.log({ url, afteroptimistic: newFilterState });
    return;
    window.location.replace(url);
  };
  const FILTERS: FilterDefinition[] = [
    {
      filterKey: 'email',
      shouldAllowCustomText: true,
      validRelationalOperators: [
        ...stringRelationalOperators,
        ...inverseStringRelationalOperators,
      ],
      OptionSelector: (props) => (
        <ObjOptionSelector
          options={getClientEmails()}
          searchKey="email"
          {...props}
        />
      ),
    },
    {
      filterKey: 'Number of emails',
      shouldAllowCustomText: false,
      validRelationalOperators: [
        ...numberRelationalOperators,
        ...inverseNumberRelationalOperators,
      ],
      OptionSelector: (props) => {
        const [val, setVal] = useState<number | null>(null);
        return (
          <div className="space-x-3">
            <input
              value={val || ''}
              type="number"
              onKeyDown={(e) => {
                console.log('keydown!');
                if (e.key !== 'Enter') {
                  return;
                }
                props.onFilterOptionSelect &&
                  val &&
                  Number.isInteger(val) &&
                  props.onFilterOptionSelect(String(val));
                setVal(null);
              }}
              onChange={(event) => {
                console.log({ event });
                setVal(Number(event.target.value));
              }}
              {...props}
            />
            <button
              onClick={(e) => {
                props.onFilterOptionSelect &&
                  val &&
                  Number.isInteger(val) &&
                  props.onFilterOptionSelect(String(val));
                setVal(null);
              }}
            >
              Select
            </button>
          </div>
        );
      },
    },
    {
      filterKey: 'sentAt',
      shouldAllowCustomText: false,
      validRelationalOperators: [
        ...numberRelationalOperators,
        ...inverseNumberRelationalOperators,
      ],
      OptionSelector: (props) => {
        return (
          <div className="space-x-3">
            <input
              type="date"
              onChange={(event) => {
                console.log('date change');
                props.onFilterOptionSelect &&
                  event.target.value &&
                  props.onFilterOptionSelect(event.target.value);
              }}
              {...props}
            />
          </div>
        );
      },
    },
  ] as const;
  return (
    <div className="min-h-screen">
      <div className="bg-gray-100 px-4 py-12 text-gray-900 transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-center">
          <FilterBuilderInput
            filterState={optimisticFilterState}
            onFilterUpdate={onFilterUpdate}
            filterDefinitions={FILTERS}
          />
        </div>
        <div className="mb-12 flex flex-col items-center">
          <Autocomplete
            options={[
              'Apple',
              'Banana',
              'Cherry',
              'Date',
              'Elderberry',
              'Fig',
              'Grape',
              'Honeydew',
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default StreakPage;

const Autocomplete = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1); // Track active option
  const optionsRef = useRef(null); // Ref for the options container

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Filter options based on input
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredOptions(filtered);
    setActiveOptionIndex(-1); // Reset active option when input changes
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setInputValue(option);
    setFilteredOptions([]); // Clear the options
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      // Move down the options list
      setActiveOptionIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === 'ArrowUp') {
      // Move up the options list
      setActiveOptionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === 'Enter' && activeOptionIndex !== -1) {
      // Select the active option
      handleOptionClick(filteredOptions[activeOptionIndex]);
    }

    // Scroll the active option into view
    if (optionsRef.current && activeOptionIndex !== -1) {
      const activeOption = optionsRef.current.children[activeOptionIndex];
      if (activeOption) {
        activeOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  return (
    <div className="relative w-64">
      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click on options
        onKeyDown={handleKeyDown}
        placeholder="Type to search..."
        className="focus:border-blue-500 focus:ring-blue-500 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-1"
      />

      {/* Floating Options Div */}
      {isFocused && filteredOptions.length > 0 && (
        <div
          ref={optionsRef}
          className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg"
        >
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                index === activeOptionIndex ? 'border-red-900' : ''
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
