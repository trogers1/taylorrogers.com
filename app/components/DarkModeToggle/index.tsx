import { MoonIcon, SunIcon } from './Icons';

type ToggleProps = {
  onChange: VoidFunction;
  currState: boolean;
};
const DarkModeToggle: FC<ToggleProps> = ({ onChange, currState }) => {
  return (
    <div className="flex flex-nowrap">
      <MoonIcon />
      <label className="inline-flex m-0.5 items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked={true} />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
      </label>
      <SunIcon />
    </div>
  );
};

export { DarkModeToggle };
