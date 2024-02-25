import { FC, ReactElement } from 'react';
type Attribution = {
  name: string;
  subtitle?: string;
};
type QuoteProps = {
  children?: ReactElement | string;
  attribution?: Attribution;
};
const Quote: FC<QuoteProps> = ({ children, attribution }) => {
  return (
    <>
      {' '}
      <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
        <p className="text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white">{children}</p>
        {attribution ? (
          <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
              <cite className="pe-3 font-medium text-gray-900 dark:text-white">{attribution.name}</cite>
              {attribution.subtitle ? (
                <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">{attribution.subtitle}</cite>
              ) : (
                ''
              )}
            </div>
          </figcaption>
        ) : (
          ''
        )}
      </blockquote>
    </>
  );
};

export { Quote };
