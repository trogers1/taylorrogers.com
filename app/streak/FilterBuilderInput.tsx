'use client';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEventHandler,
  type KeyboardEventHandler,
} from 'react';
import fuzzy from 'fuzzy';
import { type AllRelationalOperators, type LogicalOperator } from './operators';
import { FilterPill } from './FilterPill';

export type FilterValue = string | Date | boolean;
export type FullFilterSelectionFn = (newFilter: FullFilter) => void;
export type FilterValueSelectionFn = (arg: FilterValue[]) => void;
export type FilterSelectionComponentProps = {
  input?: string;
  onFilterValueSelect?: FilterValueSelectionFn;
};
export type FilterDefinition = {
  filterKey: string;
  validRelationalOperators: Array<AllRelationalOperators>;
  options?: Record<string, any>[];
  optionKey: string;
  getOptions?:
    | ((input: string) => Record<string, any>[])
    | ((input: string) => Promise<Record<string, any>[]>);
  shouldAllowCustomText: boolean;
};

// onFilterUpdate
export type FullFilter = {
  localId: string;
  filterKey: string;
  values: FilterValue[]; // will probably only accept single value for first iteration
  logicalOperator: LogicalOperator;
  relationalOperator: string;
};
export type FilterState = Array<FullFilter>;
export type FilterUpdateFunction = ({
  newFilterState,
}: {
  newFilterState: FilterState;
}) => Promise<void>;

export type FilterBuilderArgs = {
  filterState: FilterState;
  onFilterUpdate: FilterUpdateFunction;
  filterDefinitions: FilterDefinition[];
};

export const allowedInputBuiltinTypes = [
  'button',
  'checkbox',
  'color',
  'date',
  'email',
  'hidden',
  'number',
  'search',
  'text',
];
export const FilterBuilderInput: React.FC<FilterBuilderArgs> = ({
  filterDefinitions,
  filterState,
  onFilterUpdate,
}) => {
  const [currFilter, setCurrFilter] = useState<FilterDefinition | null>(null);
  const [currRelOperator, setCurrRelationalOperator] = useState<string | null>(
    null,
  );
  const [inputText, setInputText] = useState<string>('');
  const [filteredFilterDefOptions, setFilteredFilterDefOptions] = useState<
    FilterDefinition[]
  >([]);
  const [filteredRelOpOptions, setFilteredRelOpOptions] = useState<string[]>(
    [],
  );
  const [filteredValueOptions, setFilteredValueOptions] = useState<string[]>(
    [],
  );
  const [isFocused, setIsFocused] = useState(false);
  const [activeOptionIndex, setActiveOptionIndex] = useState(-1);
  const optionsRef = useRef<HTMLDivElement>(null); // Ref for the options container
  const [loadedOptions, setLoadedOptions] = useState<
    Record<string, any>[] | undefined
  >(currFilter ? currFilter.options : undefined);
  useEffect(() => {
    if (currFilter && currFilter.options) {
      setLoadedOptions(currFilter.options);
      return;
    }
    // If options aren't provided, we use the input to getOptions()
    if (currFilter && !currFilter.options && currFilter.getOptions) {
      setLoadedOptions(undefined);
      const awaitOptions = async (
        currInput: typeof inputText,
        currentFilter: typeof currFilter,
      ) => {
        console.log('awaiting', currInput);
        const newLoadedOptions = await Promise.resolve(
          currentFilter.getOptions
            ? currentFilter.getOptions(currInput)
            : undefined,
        );
        console.log('loaded', newLoadedOptions);
        setLoadedOptions(newLoadedOptions);
      };
      awaitOptions(inputText, currFilter);
    }
  }, [inputText, currFilter, currFilter?.options, currFilter?.getOptions]);
  // We can use 'optionKey' as the input type if no way is provided to get options
  const shouldUseValueDirectly =
    currFilter &&
    currRelOperator &&
    !currFilter.options &&
    !currFilter.getOptions;
  let filteredOptions:
    | typeof filteredFilterDefOptions
    | typeof filteredRelOpOptions
    | typeof filteredValueOptions;
  if (!currFilter) {
    filteredOptions = filteredFilterDefOptions;
  } else if (!currRelOperator) {
    filteredOptions = filteredRelOpOptions;
  } else {
    filteredOptions = filteredValueOptions;
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setInputText(value);
    if (shouldUseValueDirectly && currFilter.optionKey === 'date') {
      console.log('date', value);
      handleValueSelection([value]);
      return;
    }

    // The options we're searching through depend on where we are in the filter-building flow.
    // If currFilter is unset, we're looking through the filter definitions
    if (!currFilter) {
      const filtered = fuzzy.filter(value, filterDefinitions, {
        extract: (e) => e.filterKey,
      });
      setFilteredFilterDefOptions(filtered.map((option) => option.original));
    } else if (!currRelOperator) {
      const filtered = fuzzy.filter(value, currFilter.validRelationalOperators);
      setFilteredRelOpOptions(filtered.map((option) => option.original));
    } else {
      // TODO: Figure out async option-getting for values. Maybe just use components.
      // There's a race condition here now
      const filtered = fuzzy.filter(value, loadedOptions || [], {
        extract: (e) => e[currFilter.optionKey],
      });
      setFilteredValueOptions(filtered.map((option) => option.string));
    }

    setActiveOptionIndex(-1); // Reset active option when input changes
  };

  // 1. Handle filter def selection
  const handleFilterSelect = (filterDef: FilterDefinition) => {
    setCurrFilter(filterDef); // Our first step for each filter is picking our filter definition
    setInputText(''); // Clear input to next select the operator we're using
    setFilteredFilterDefOptions([]); // Clear the FilterDefinition options
  };
  // 2. Handle operator selection
  const handleRelationalOperatorSelect = (operator: string) => {
    if (!currFilter) {
      throw new Error('Cannot select an operator without a filter definition');
    }
    setCurrRelationalOperator(operator); // Our second step for each filter is picking our operator
    setInputText(''); // Clear input for final step: to next select the value(s) we're using
    setFilteredRelOpOptions([]); // Clear the filtered operator options
  };
  // 3. Handle final filter value selection
  const handleValueSelection = (values: FilterValue[]) => {
    if (!currFilter || !currRelOperator) {
      throw new Error(
        'Cannot select filter values without a filter definition or relational operator',
      );
    }
    setInputText(''); // Clear input for final step: to next select the value(s) we're using
    setFilteredValueOptions([]); // Clear the current value options

    // We should have everything we need to build out a FullFilter and save it off
    const fullFilter: FullFilter = {
      localId: crypto.randomUUID(),
      filterKey: currFilter?.filterKey,
      logicalOperator: 'and',
      relationalOperator: currRelOperator,
      values,
    };
    onFilterUpdate({ newFilterState: [...filterState, fullFilter] }); // now we can start over creating a new filter

    // Reset state for a new filter
    setCurrFilter(null);
    setCurrRelationalOperator(null);
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowDown') {
      // Move down the options list
      setActiveOptionIndex((prevIndex) =>
        prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex,
      );
    } else if (e.key === 'ArrowUp') {
      // Move up the options list
      setActiveOptionIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (e.key === 'Enter' && activeOptionIndex !== -1) {
      // Select the active option according to where we are in the filter-construction flow
      if (!currFilter) {
        handleFilterSelect(filteredFilterDefOptions[activeOptionIndex]);
      } else if (!currRelOperator) {
        handleRelationalOperatorSelect(filteredRelOpOptions[activeOptionIndex]);
      } else {
        handleValueSelection([filteredValueOptions[activeOptionIndex]]);
      }
    } else if (e.key === 'Enter' && currFilter && currRelOperator) {
      // Select whatever is being typed as-is
      handleValueSelection([inputText]);
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
    <div className="flex-start align-right p-none flex border border-gray-500 bg-gray-300">
      {filterState.map((filterStateItem) => (
        <FilterPill
          key={filterStateItem.localId}
          values={filterStateItem.values}
          filterKey={filterStateItem.filterKey}
          localId={filterStateItem.localId}
          relationalOperator={filterStateItem.relationalOperator}
          onDelete={({ localId }) => {
            console.log('here');
            onFilterUpdate({
              newFilterState: filterState.filter(
                (filterVal) => filterVal.localId !== localId,
              ),
            });
          }}
        ></FilterPill>
      ))}
      {currFilter && (
        <FilterPill
          filterKey={currFilter.filterKey}
          relationalOperator={currRelOperator || undefined}
          onDelete={(_) => {
            setCurrFilter(null);
            setCurrRelationalOperator(null);
          }}
        ></FilterPill>
      )}
      <div className="relative w-64">
        <input
          type={shouldUseValueDirectly ? currFilter.optionKey : 'text'}
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          // onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click on options
          onKeyDown={handleKeyDown}
          placeholder="Type to search..."
          className="text-grey-200 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />

        {/* Floating Options Div */}
        {isFocused && filteredOptions.length > 0 && (
          <div
            ref={optionsRef}
            className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg"
          >
            <ul>
              {currFilter === null &&
                filterDefinitions.map((filterDef, index) => (
                  <div
                    key={filterDef.filterKey}
                    onClick={() => handleFilterSelect(filterDef)}
                    className={`cursor-pointer p-2 hover:bg-gray-100 ${
                      index === activeOptionIndex ? 'border-red-900' : ''
                    }`}
                  >
                    {filterDef.filterKey}
                  </div>
                ))}
              {currFilter !== null &&
                currRelOperator === null &&
                [...new Set(currFilter.validRelationalOperators)].map(
                  (operator, index) => (
                    <div
                      key={operator}
                      onClick={() => handleRelationalOperatorSelect(operator)}
                      className={`cursor-pointer p-2 hover:bg-gray-100 ${
                        index === activeOptionIndex ? 'border-red-900' : ''
                      }`}
                    >
                      {operator}
                    </div>
                  ),
                )}
              {currFilter !== null &&
                currRelOperator !== null &&
                loadedOptions &&
                currFilter.optionKey &&
                loadedOptions.map((option, index) => (
                  <div
                    key={option[currFilter.optionKey]}
                    onClick={() =>
                      handleValueSelection([option[currFilter.optionKey]])
                    }
                    className={`cursor-pointer p-2 hover:bg-gray-100 ${
                      index === activeOptionIndex ? 'border-red-900' : ''
                    }`}
                  >
                    {option[currFilter.optionKey]}
                  </div>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
