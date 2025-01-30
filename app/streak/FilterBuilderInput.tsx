'use client';
import {
  useState,
  type FC,
  type KeyboardEvent,
  type KeyboardEventHandler,
  type MouseEvent,
  type TouchEvent,
} from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Badge } from '~/components/ui/badge';
import { ObjOptionSelector } from './ObjOptionSelector';
import type { AllRelationalOperators, LogicalOperator } from './operators';

export type FilterOption = string | Date | boolean;
export type FilterSelectionFn = (
  event:
    | MouseEvent<HTMLElement>
    | KeyboardEvent<HTMLElement>
    | TouchEvent<HTMLElement>,
) => void;
export type FilterSelectionComponentProps = {
  input?: string;
  onFilterOptionSelect: FilterSelectionFn;
};
export type FilterDefinition = {
  key: string;
  validRelationalOperators: Array<AllRelationalOperators>;
  OptionSelector?: FC<FilterSelectionComponentProps>;
};

// onFilterUpdate
export type FilterValue = {
  key: string;
  values: FilterOption[]; // will probably only accept single value for first iteration
  operator: LogicalOperator;
  comparator: AllRelationalOperators;
};
export type FilterGroup = Partial<Record<LogicalOperator, FilterValue[]>>;
export type FilterState = Array<FilterGroup | Array<FilterState>>;
export type FilterUpdateFunction = ({
  currFilterState,
}: {
  currFilterState: FilterState;
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
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [currFilter, setCurrFilter] = useState<FilterDefinition | null>(null);
  const [relationalOperator, setRelationalOperator] =
    useState<AllRelationalOperators | null>(null);
  const [inputText, setInputText] = useState<string | undefined>(undefined);
  console.log({
    filterDefinitions,
    filterState,
    onFilterUpdate,
    filter: currFilter,
    open: isPopoverOpen,
    comparator: relationalOperator,
    inputText,
  });
  const onFilterSelection: FilterSelectionFn = (event) => {
    // Do not handle other key presses
    if (getIsKeyboardEvent(event) && event.key !== 'Enter') {
      return;
    }
    const matchingFilter = filterDefinitions.find(
      (currFilterDef) => currFilterDef.key === event.currentTarget.textContent,
    );
    if (!matchingFilter) {
      throw new Error('onFilterSelection called without valid selection');
    }
    console.log({
      matchingFilter,
      filterDefinitions,
      clickCurrTarget: event.currentTarget.textContent,
    });
    setCurrFilter(matchingFilter);
    setInputText(undefined);
    setIsPopoverOpen(false);
    return matchingFilter;
  };
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <div className="flex-start align-right flex">
          <Badge>what</Badge>
          <Badge>what</Badge>
          <input
            className="flex-9 h-9"
            placeholder="Type a command or search..."
            onChange={(event) => {
              console.log({ changingTarget: event.target });
              setInputText(event.target.value); // TODO: Debounce
            }}
            value={inputText}
            type={
              currFilter &&
              relationalOperator &&
              allowedInputBuiltinTypes.includes(currFilter.key)
                ? currFilter.key
                : 'text'
            }
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        {currFilter === null && (
          <ObjOptionSelector
            searchKey="key"
            onFilterOptionSelect={onFilterSelection}
            input={inputText}
            options={filterDefinitions}
          />
        )}
        {currFilter !== null && relationalOperator === null && (
          <ObjOptionSelector
            searchKey="key"
            onFilterOptionSelect={(selection: AllRelationalOperators) => {
              setRelationalOperator(selection);
              setInputText(undefined);
              setIsPopoverOpen(false);
            }}
            input={inputText}
            options={filterDefinitions}
          />
        )}
        {currFilter !== null &&
          relationalOperator !== null &&
          currFilter.OptionSelector && (
            <currFilter.OptionSelector
              input={inputText}
              onFilterOptionSelect={(selection) => {}}
            />
          )}
      </PopoverContent>
    </Popover>
  );
};
