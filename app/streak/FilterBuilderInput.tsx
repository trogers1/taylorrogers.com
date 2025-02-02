'use client';
import {
  useEffect,
  useRef,
  useReducer,
  useMemo,
  useCallback,
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
  validRelationalOperators: readonly AllRelationalOperators[];
  options?: readonly Record<string, any>[];
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
  filterDefinitions: readonly FilterDefinition[];
};

// State reducer
type FilterBuilderStateBase = {
  inputText: string;
  isFocused: boolean;
  activeOptionIndex: number;
  loadedOptions: readonly Record<string, any>[] | undefined;
};
// Building a filter comes in three steps:
// 1. Selecting which filter by definition
// 2. Selecting the operator
// 3. Selecting the values
type FilterBuilderStepState =
  | {
      filteredOptions: FilterDefinition[];
      currFilter: null;
      currRelOperator: null;
      currFilterBuilderStep: 'selectFilter';
    }
  | {
      filteredOptions: { operator: string }[];
      currFilter: FilterDefinition;
      currRelOperator: null;
      currFilterBuilderStep: 'selectOperator';
    }
  | {
      filteredOptions: { value: FilterValue }[];
      currFilter: FilterDefinition;
      currRelOperator: string;
      currFilterBuilderStep: 'selectValues';
    };
type FilterBuilderState = FilterBuilderStateBase & FilterBuilderStepState;

type Action =
  | { type: 'RESET_STATE' }
  | { type: 'SET_CURR_FILTER'; payload: FilterDefinition }
  | { type: 'SET_CURR_OPERATOR'; payload: string }
  | { type: 'SET_INPUT_TEXT'; payload: string }
  | { type: 'SET_FILTERED_FILTER_DEF_OPTIONS'; payload: FilterDefinition[] }
  | { type: 'SET_FILTERED_OPERATOR_OPTIONS'; payload: string[] }
  | { type: 'SET_FILTERED_VALUE_OPTIONS'; payload: { value: FilterValue }[] }
  | { type: 'SET_IS_FOCUSED'; payload: boolean }
  | { type: 'SET_ACTIVE_OPTION_INDEX'; payload: number }
  | {
      type: 'SET_LOADED_OPTIONS';
      payload: readonly Record<string, any>[] | undefined;
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

const initialState: FilterBuilderState = {
  currFilter: null,
  currRelOperator: null,
  inputText: '',
  filteredOptions: [],
  currFilterBuilderStep: 'selectFilter',
  isFocused: true,
  activeOptionIndex: -1,
  loadedOptions: undefined,
} as const;

function reducer(
  state: FilterBuilderState,
  action: Action,
): FilterBuilderState {
  switch (action.type) {
    case 'RESET_STATE':
      return initialState;
    case 'SET_CURR_FILTER':
      return {
        ...state,
        filteredOptions: [],
        currRelOperator: null,
        currFilter: action.payload,
        currFilterBuilderStep: 'selectOperator',
      };
    case 'SET_CURR_OPERATOR':
      if (!state.currFilter) {
        throw new Error('Cannot set operator without selecting a filter first');
      }
      return {
        ...state,
        filteredOptions: [],
        currFilter: state.currFilter,
        currRelOperator: action.payload,
        currFilterBuilderStep: 'selectValues',
      };
    case 'SET_INPUT_TEXT':
      return { ...state, inputText: action.payload };
    case 'SET_FILTERED_FILTER_DEF_OPTIONS':
      if (state.currFilter) {
        throw new Error("You've already selected a filter!");
      }
      return {
        ...state,
        currFilterBuilderStep: 'selectFilter',
        filteredOptions: action.payload,
      };
    case 'SET_FILTERED_OPERATOR_OPTIONS':
      if (!state.currFilter) {
        throw new Error(
          'Cannot set operator values without selecting a filter first',
        );
      }
      if (state.currRelOperator !== null) {
        throw new Error("You've already selected an operator");
      }
      return {
        ...state,
        currFilterBuilderStep: 'selectOperator',
        filteredOptions: action.payload.map((operator) => ({ operator })),
      };
    case 'SET_FILTERED_VALUE_OPTIONS':
      if (!state.currFilter) {
        throw new Error(
          'Cannot set operator values without selecting a filter first',
        );
      }
      if (!state.currRelOperator) {
        throw new Error("You've already selected an operator");
      }
      return {
        ...state,
        filteredOptions: action.payload,
        currFilterBuilderStep: 'selectValues',
      };
    case 'SET_IS_FOCUSED':
      return { ...state, isFocused: action.payload };
    case 'SET_ACTIVE_OPTION_INDEX':
      return { ...state, activeOptionIndex: action.payload };
    case 'SET_LOADED_OPTIONS':
      return { ...state, loadedOptions: action.payload };
    default:
      return state;
  }
}

export const FilterBuilderInput: React.FC<FilterBuilderArgs> = ({
  filterDefinitions,
  filterState,
  onFilterUpdate,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isFocused: false,
  });
  const optionsRef = useRef<HTMLDivElement>(null);

  const {
    currFilter,
    currRelOperator,
    inputText,
    filteredOptions,
    currFilterBuilderStep,
    isFocused,
    activeOptionIndex,
    loadedOptions,
  } = state;

  const shouldUseValueDirectly = useMemo(
    () =>
      currFilterBuilderStep === 'selectValues' &&
      !currFilter.options &&
      !currFilter.getOptions &&
      allowedInputBuiltinTypes.includes(currFilter.optionKey),
    [currFilter, currFilterBuilderStep],
  );

  useEffect(() => {
    if (currFilterBuilderStep === 'selectValues') {
      if (currFilter.options) {
        // No need to load asynchronously, just set them
        dispatch({ type: 'SET_LOADED_OPTIONS', payload: currFilter.options });
        return;
      }
      if (!currFilter.options && !currFilter.getOptions) {
        // Make sure we have none set if none are provided
        dispatch({ type: 'SET_LOADED_OPTIONS', payload: undefined });
      }
      if (!currFilter.options && currFilter.getOptions) {
        // We need to get options asynchronously`
        dispatch({ type: 'SET_LOADED_OPTIONS', payload: undefined });
        const awaitOptions = async (input: string) => {
          const newLoadedOptions = await Promise.resolve(
            currFilter.getOptions?.(input),
          );
          dispatch({ type: 'SET_LOADED_OPTIONS', payload: newLoadedOptions });
        };
        awaitOptions(inputText);
      }
    }
  }, [inputText, currFilter, currFilterBuilderStep]);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;
      dispatch({ type: 'SET_INPUT_TEXT', payload: value });

      if (
        currFilterBuilderStep === 'selectValues' &&
        shouldUseValueDirectly &&
        currFilter.optionKey === 'date'
      ) {
        handleValueSelection(value);
        return;
      }
      let filtered;
      switch (currFilterBuilderStep) {
        case 'selectFilter':
          filtered = fuzzy.filter(value, [...filterDefinitions], {
            extract: (e) => e.filterKey,
          });
          dispatch({
            type: 'SET_FILTERED_FILTER_DEF_OPTIONS',
            payload: filtered.map((option) => option.original),
          });
          break;
        case 'selectOperator':
          filtered = fuzzy.filter(value, [
            ...currFilter.validRelationalOperators,
          ]);
          dispatch({
            type: 'SET_FILTERED_OPERATOR_OPTIONS',
            payload: filtered.map((option) => option.original),
          });
          break;
        case 'selectValues':
          filtered = fuzzy.filter(
            value,
            loadedOptions ? [...loadedOptions] : [], // fuzzy.filter cannot accept readonly options
            {
              extract: (e) => e[currFilter.optionKey],
            },
          );
          dispatch({
            type: 'SET_FILTERED_VALUE_OPTIONS',
            payload: filtered.map((option) => ({
              value: option.string,
            })),
          });
          break;
      }

      dispatch({ type: 'SET_ACTIVE_OPTION_INDEX', payload: -1 });
    },
    [
      currFilter,
      currRelOperator,
      filterDefinitions,
      loadedOptions,
      shouldUseValueDirectly,
    ],
  );

  const handleFilterSelect = useCallback((filterDef: FilterDefinition) => {
    dispatch({ type: 'SET_CURR_FILTER', payload: filterDef });
    dispatch({ type: 'SET_INPUT_TEXT', payload: '' });
  }, []);

  const handleRelationalOperatorSelect = useCallback(
    (operator: { operator: string }) => {
      dispatch({ type: 'SET_CURR_OPERATOR', payload: operator.operator });
      dispatch({ type: 'SET_INPUT_TEXT', payload: '' });
    },
    [],
  );

  const handleValueSelection = useCallback(
    (option: FilterValue) => {
      if (currFilterBuilderStep !== 'selectValues') {
        throw new Error(
          'Cannot select filter values without a filter definition or relational operator',
        );
      }
      dispatch({ type: 'SET_INPUT_TEXT', payload: '' });
      dispatch({ type: 'SET_FILTERED_VALUE_OPTIONS', payload: [] });

      const fullFilter: FullFilter = {
        localId: crypto.randomUUID(),
        filterKey: currFilter.filterKey,
        logicalOperator: 'and',
        relationalOperator: currRelOperator,
        values: [option], // TODO: Support multi-value select via another reducer to add/remove/etc values
      };
      onFilterUpdate({ newFilterState: [...filterState, fullFilter] });

      dispatch({ type: 'RESET_STATE' });
    },
    [currFilter, currRelOperator, filterState, onFilterUpdate],
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.key === 'ArrowDown') {
        dispatch({
          type: 'SET_ACTIVE_OPTION_INDEX',
          payload: Math.min(activeOptionIndex + 1, filteredOptions.length - 1),
        });
      } else if (e.key === 'ArrowUp') {
        dispatch({
          type: 'SET_ACTIVE_OPTION_INDEX',
          payload: Math.max(activeOptionIndex - 1, 0),
        });
      } else if (e.key === 'Enter' && activeOptionIndex !== -1) {
        if (currFilterBuilderStep === 'selectFilter') {
          handleFilterSelect(filteredOptions[activeOptionIndex]);
        } else if (currFilterBuilderStep === 'selectOperator') {
          handleRelationalOperatorSelect(filteredOptions[activeOptionIndex]);
        } else {
          handleValueSelection(filteredOptions[activeOptionIndex].value);
        }
      } else if (e.key === 'Enter' && currFilter && currRelOperator) {
        handleValueSelection(inputText);
      } else if (e.key === 'Backspace' && inputText === '') {
        if (currFilter) {
          const lastFilterPill = document.getElementById(
            'filterPill_inProgress',
          );
          lastFilterPill?.focus();
        } else {
          const lastFilterPill = document.getElementById(
            `filterPill${filterState[filterState.length - 1].localId}`,
          );
          lastFilterPill?.focus();
        }
      }

      if (optionsRef.current && activeOptionIndex !== -1) {
        const activeOption = optionsRef.current.children[activeOptionIndex];
        if (activeOption && activeOption.scrollIntoView) {
          activeOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    },
    [
      activeOptionIndex,
      currFilter,
      currRelOperator,
      filteredOptions,
      currFilterBuilderStep,
      filterState,
      handleFilterSelect,
      handleRelationalOperatorSelect,
      handleValueSelection,
      inputText,
    ],
  );

  const renderOptions = useCallback(
    ({
      options,
      optionKey,
      onClick,
    }: {
      options: readonly any[];
      optionKey: string;
      onClick:
        | typeof handleFilterSelect
        | typeof handleRelationalOperatorSelect
        | typeof handleValueSelection;
    }) => {
      return options.map((option, index) => (
        <li
          key={index}
          aria-label={`Option: ${option[optionKey]}`}
          onClick={() => onClick(option)}
          className={`cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            index === activeOptionIndex ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          {optionKey && typeof option === 'object' ? option[optionKey] : option}
        </li>
      ));
    },
    [activeOptionIndex],
  );

  return (
    <div className="flex-start align-right p-none flex rounded-md border border-gray-300 border-gray-500 bg-[#121212] focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
      {filterState.map((filterStateItem) => (
        <FilterPill
          key={filterStateItem.localId}
          values={filterStateItem.values}
          filterKey={filterStateItem.filterKey}
          localId={filterStateItem.localId}
          relationalOperator={filterStateItem.relationalOperator}
          onDelete={({ localId }) => {
            onFilterUpdate({
              newFilterState: filterState.filter(
                (filterVal) => filterVal.localId !== localId,
              ),
            });
          }}
        />
      ))}
      {currFilter && (
        <FilterPill
          filterKey={currFilter.filterKey}
          relationalOperator={currRelOperator || undefined}
          onDelete={() => {
            dispatch({ type: 'RESET_STATE' });
          }}
        />
      )}
      <div className="relative w-64">
        <input
          id="FilterBuilderInput"
          type={shouldUseValueDirectly ? currFilter?.optionKey : 'text'}
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => dispatch({ type: 'SET_IS_FOCUSED', payload: true })}
          onKeyDown={handleKeyDown}
          placeholder="Type to search..."
          className="w-full border-none p-2 text-white focus:outline-none"
        />

        {isFocused && filteredOptions.length > 0 && (
          <div
            ref={optionsRef}
            className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg dark:bg-gray-900"
          >
            <ul>
              {!currFilter &&
                renderOptions({
                  options: filteredOptions,
                  optionKey: 'filterKey',
                  onClick: handleFilterSelect,
                })}
              {currFilter &&
                !currRelOperator &&
                renderOptions({
                  options: filteredOptions,
                  optionKey: 'operator',
                  onClick: handleRelationalOperatorSelect,
                })}
              {currFilter &&
                currRelOperator &&
                loadedOptions &&
                renderOptions({
                  options: loadedOptions,
                  optionKey: currFilter.optionKey,
                  onClick: handleValueSelection,
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
