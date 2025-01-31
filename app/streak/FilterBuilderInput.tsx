'use client';
import { useState, type FC } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover';
import { Badge } from '~/components/ui/badge';
import { Command } from 'cmdk';
import { ObjOptionSelector } from './ObjOptionSelector';
import type { AllRelationalOperators, LogicalOperator } from './operators';
import { FilterPill } from './FilterPill';

export type FilterOption = string | Date | boolean;
export type FullFilterSelectionFn = (newFilter: FilterValue) => void;
export type FilterOptionSelectionFn = (newFilter: string) => void;
export type FilterSelectionComponentProps = {
  input?: string;
  onFilterOptionSelect?: FilterOptionSelectionFn;
};
export type FilterDefinition = {
  filterKey: string;
  validRelationalOperators: Array<AllRelationalOperators>;
  OptionSelector?: FC<FilterSelectionComponentProps>;
  shouldAllowCustomText: boolean;
};

// onFilterUpdate
export type FilterValue = {
  localId: string;
  filterKey: string;
  values: FilterOption[]; // will probably only accept single value for first iteration
  logicalOperator: LogicalOperator;
  relationalOperator: string;
};
// export type FilterGroup = FilterValue[];
// export type FilterState = Array<FilterGroup | Array<FilterState>>;
export type FilterState = Array<FilterValue>;
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
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);
  const [currFilter, setCurrFilter] = useState<FilterDefinition | null>(null);
  const [relationalOperator, setRelationalOperator] = useState<string | null>(
    null,
  );
  const [inputText, setInputText] = useState<string>('');
  console.log({
    filterDefinitions,
    filterState,
    onFilterUpdate,
    currFilter,
    isPopoverOpen,
    relationalOperator,
    inputText,
  });
  const onFilterSelection: FilterOptionSelectionFn = (value) => {
    const matchingFilter = filterDefinitions.find(
      (currFilterDef) => currFilterDef.filterKey === value,
    );
    if (!matchingFilter) {
      throw new Error('onFilterSelection called without valid selection');
    }
    console.log({
      matchingFilter,
      filterDefinitions,
      value,
    });
    setCurrFilter(matchingFilter);
    setInputText('');
    // setIsPopoverOpen(false);
    return matchingFilter;
  };
  const onFullFilterSelection: FullFilterSelectionFn = (fullFilter) => {
    console.log({
      fullFilter,
    });
    // TODO: Handle logical Operators and groupings
    const newFilterState: FilterState = [...filterState, fullFilter];
    onFilterUpdate({ newFilterState });
    setCurrFilter(null);
    setRelationalOperator(null);
    setInputText('');
    // setIsPopoverOpen(false);
  };
  return (
    <div className="flex-start align-right p-none flex border border-gray-500 bg-gray-300">
      {filterState.map((filterStateItem) => (
        <FilterPill
          key={filterStateItem.localId}
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
          relationalOperator={relationalOperator || undefined}
          onDelete={(_) => {
            // setIsPopoverOpen(false);
            setCurrFilter(null);
            setRelationalOperator(null);
          }}
        ></FilterPill>
      )}
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <Command>
          <PopoverTrigger asChild>
            <Command.Input
              value={inputText}
              onValueChange={(text) => {
                setInputText(text);
                // setIsPopoverOpen(true);
              }}
              onKeyDown={(e) => {
                console.log('keydown!!');
                console.log({
                  inputTextLen: inputText.length,
                  currFilter,
                  relationalOperator,
                  shouldallow: currFilter?.shouldAllowCustomText,
                  isEnter: e.key === 'Enter',
                });
                if (!inputText.length && !currFilter) {
                  if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
                    // If there's no text in the input, then we should apply focus to the last filter
                    const lastFilterPill = document.getElementById(
                      `filterPill${filterState[filterState.length - 1].localId}`,
                    );
                    if (lastFilterPill) {
                      lastFilterPill.focus();
                    }
                  }
                }
                if (
                  inputText.length &&
                  currFilter &&
                  relationalOperator &&
                  currFilter.shouldAllowCustomText &&
                  e.key === 'Enter'
                ) {
                  // If custom text is allowed, and both the currFilter and relationalOperator have been selected, allow submission.
                  onFullFilterSelection({
                    filterKey: currFilter.filterKey,
                    localId: crypto.randomUUID(),
                    logicalOperator: 'and',
                    relationalOperator,
                    values: [inputText],
                  });
                }
              }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            {currFilter === null && (
              <ObjOptionSelector
                searchKey="filterKey"
                onFilterOptionSelect={onFilterSelection}
                input={inputText}
                options={filterDefinitions}
              />
            )}
            {currFilter !== null && relationalOperator === null && (
              <ObjOptionSelector
                searchKey="operator"
                onFilterOptionSelect={(selection) => {
                  setRelationalOperator(selection);
                  setInputText('');
                  // setIsPopoverOpen(false);
                }}
                input={inputText}
                options={currFilter.validRelationalOperators.map((op) => ({
                  operator: op,
                }))}
              />
            )}
            {currFilter !== null &&
              relationalOperator !== null &&
              currFilter.OptionSelector && (
                <currFilter.OptionSelector
                  input={inputText}
                  onFilterOptionSelect={(selection) => {
                    // TODO: Handle multi-selection for a single filter key
                    const fullFilter: FilterValue = {
                      filterKey: currFilter.filterKey,
                      localId: crypto.randomUUID(),
                      relationalOperator,
                      logicalOperator: 'and',
                      values: [selection],
                    };
                    console.log({ fullFilter, selectionbeforefull: selection });
                    onFullFilterSelection(fullFilter);
                    // setIsPopoverOpen(false);
                  }}
                />
              )}
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  );
};
