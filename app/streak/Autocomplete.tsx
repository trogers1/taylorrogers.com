import { useEffect, useState } from 'react';
import fuzzy from 'fuzzy';
import type { FilterSelectionComponentProps } from './FilterBuilderInput';

type AutocompleteOption = Record<string, any>;
type AutocompleteProps<T> = FilterSelectionComponentProps<T> & {
  options: AutocompleteOption[] | Promise<AutocompleteOption[]>;
  searchKey: keyof AutocompleteOption;
};
export const Autocomplete: React.FC<AutocompleteProps> = ({
  input,
  onFilterOptionSelect,
  options,
  searchKey,
}) => {
  const [loadedOptions, setLoadedOptions] = useState<Awaited<
    typeof options
  > | null>(null);
  useEffect(() => {
    setLoadedOptions(null);
    const awaitOptions = async () => {
      console.log('awaiting options', options);
      const newLoadedOptions = await Promise.resolve(options);
      console.log('options now loaded: ', newLoadedOptions);
      setLoadedOptions(newLoadedOptions);
    };
    awaitOptions();
  }, [options]);
  if (!loadedOptions) {
    return <span>Loading...</span>;
  }
  return (
    <ul aria-label="Autocomplete options">
      {fuzzy
        .filter(input, loadedOptions, {
          extract: (option) => option[searchKey],
        })
        .map((fuzzyResult) => (
          <li
            aria-label="Autocomplete option"
            key={fuzzyResult.original[searchKey]}
            onKeyDown={(event) => {
              // TODO: implement this
              console.log({ target: event.target });
            }}
            onClick={onFilterOptionSelect}
          >
            {fuzzyResult.original[searchKey]}
          </li>
        ))}
    </ul>
  );
};
