import { FC, ReactElement } from 'react';

type CaptionProps = { children: ReactElement | string };
const Caption: FC<CaptionProps> = ({ children }) => {
  return (
    <div className="flex justify-center">
      <figcaption className="italic text-sm text-gray-500 dark:text-gray-400">{children} </figcaption>
    </div>
  );
};

export { Caption };
