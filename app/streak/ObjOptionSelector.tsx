import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import type { FilterSelectionComponentProps } from './FilterBuilderInput';

export type ObjOption = Record<string, any>;
type ObjOptionSelectorProps = FilterSelectionComponentProps & {
  options: ObjOption[] | Promise<ObjOption[]>;
  searchKey: keyof ObjOption;
};
export const ObjOptionSelector: React.FC<ObjOptionSelectorProps> = ({
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
      const newLoadedOptions = await Promise.resolve(currOptions);
      setLoadedOptions(newLoadedOptions);
    };
    awaitOptions(options);
  }, [options]);
  return (
    <Command.List className="focus:border-blue">
      {loadedOptions &&
        loadedOptions.map((option) => (
          <Command.Item onSelect={onFilterOptionSelect} key={option[searchKey]}>
            {option[searchKey]}
          </Command.Item>
        ))}
    </Command.List>
  );
};
