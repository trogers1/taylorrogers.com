import { useEffect, useState } from 'react';
import type { FilterSelectionComponentProps } from './FilterBuilderInput';

export type ObjOption = Record<string, any>;
type ObjOptionSelectorProps = FilterSelectionComponentProps & {
  options?: ObjOption[];
  getOptions?: (
    input: FilterSelectionComponentProps['input'],
  ) => ObjOption[] | Promise<ObjOption[]>;
  searchKey: keyof ObjOption;
};
export const ObjOptionSelector: React.FC<ObjOptionSelectorProps> = ({
  input,
  onFilterValueSelect,
  options,
  getOptions,
  searchKey,
}) => {
  const [loadedOptions, setLoadedOptions] = useState<ObjOption[] | undefined>(
    options,
  );
  useEffect(() => {
    // If options aren't provided, we use the input to getOptions()
    if (!options && getOptions) {
      setLoadedOptions(undefined);
      const awaitOptions = async (currInput: typeof input) => {
        console.log('awaiting', currInput);
        const newLoadedOptions = await Promise.resolve(getOptions(currInput));
        console.log('loaded', newLoadedOptions);
        setLoadedOptions(newLoadedOptions);
      };
      awaitOptions(input);
    }
  }, [input]);
  console.log({
    input,
    onFilterValueSelect,
    options,
    getOptions,
    searchKey,
  });
  return (
    <>
      {!loadedOptions && <span>Loading...</span>}
      {loadedOptions &&
        loadedOptions.map((option, index) => (
          <li
            className={`cursor-pointer p-2 hover:bg-gray-100`}
            onClick={() =>
              onFilterValueSelect && onFilterValueSelect([option[searchKey]])
            }
            key={option[searchKey]}
          >
            {option[searchKey]}
          </li>
        ))}
    </>
  );
};
