import { FC, ReactElement } from 'react';

type HeadingProps = {
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  children: ReactElement | string;
};
const Heading: FC<HeadingProps> = ({ component, children }) => {
  const sharedClasses = `font-bold tracking-tight font-serif my-4 `;
  switch (component) {
    case 'h1':
      return <h1 className={sharedClasses + 'text-4xl lg:text-5xl xl:text-6xl'}>{children}</h1>;
    case 'h2':
      return <h2 className={sharedClasses + 'text-3xl lg:text-4xl xl:text-5xl'}>{children}</h2>;
    case 'h3':
      return <h3 className={sharedClasses + 'text-2xl lg:text-3xl xl:text-4xl'}>{children}</h3>;
    case 'h4':
      return <h4 className={sharedClasses + 'text-xl lg:text-2xl xl:text-3xl'}>{children}</h4>;
    case 'h5':
      return <h5 className={sharedClasses + 'text-bold lg:text-xl xl:text-2xl'}>{children}</h5>;
  }
};

export { Heading };
