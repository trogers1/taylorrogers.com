import { useEffect, useState } from 'react';
import fuzzy from 'fuzzy';
import type { FilterSelectionComponentProps } from './FilterBuilderInput';

type AutocompleteOption = Record<string, any>;
type AutocompleteProps = FilterSelectionComponentProps & {
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
      const newLoadedOptions = await Promise.resolve(options);
      setLoadedOptions(newLoadedOptions);
    };
    awaitOptions();
  }, [options]);
  if (!loadedOptions) {
    return <span>Loading...</span>;
  }
  return (
    <ul>
      {fuzzy
        .filter(input, loadedOptions, {
          extract: (option) => option[searchKey],
        })
        .map((fuzzyResult) => (
          <li
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
