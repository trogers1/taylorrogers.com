'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Badge } from '~/components/ui/badge';
import { Autocomplete } from './Autocomplete';
import type { AllRelationalOperators, LogicalOperator } from './operators';
import { useState } from 'react';

export type FilterOption = string | Date | boolean;
export type FilterSelectionFn = (selection: any) => void;
export type FilterSelectionComponentProps = {
  input: string;
  onFilterOptionSelect: FilterSelectionFn;
};
export type FilterDefinition = {
  key: string;
  validComparators: Array<AllRelationalOperators>;
  SelectOptions?: (arg: FilterSelectionComponentProps) => JSX.Element;
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
    setCurrFilter(matchingFilter ?? null);
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
          <Autocomplete searchKey="key" onOptionSelect={} />
        )}
      </PopoverContent>
    </Popover>
  );
};
