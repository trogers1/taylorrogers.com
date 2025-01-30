import { useEffect, useState } from 'react';
import fuzzy from 'fuzzy';
import type { FilterSelectionComponentProps } from './FilterBuilderInput';

type ObjOption = Record<string, any>;
type ObjOptionSelectorProps = FilterSelectionComponentProps & {
  options: ObjOption[] | Promise<ObjOption[]>;
  searchKey: keyof ObjOption;
};
export const ObjOptionSelector: React.FC<ObjOptionSelectorProps> = ({
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
    const awaitOptions = async (currOptions: typeof options) => {
      console.log('awaiting options', currOptions);
      const newLoadedOptions = await Promise.resolve(currOptions);
      console.log('options now loaded: ', newLoadedOptions);
      setLoadedOptions(newLoadedOptions);
    };
    awaitOptions(options);
  }, [options]);
  if (!loadedOptions) {
    return <span>Loading...</span>;
  }
  return (
    <ul aria-label="Options List">
      {fuzzy
        .filter(input || '', loadedOptions, {
          extract: (option) => option[searchKey],
        })
        .map((fuzzyResult) => (
          <li
            aria-label="Option"
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
