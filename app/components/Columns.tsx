import { FC, ReactElement } from 'react';

type ColumnsProps = {
  children: ReactElement[];
};
/**
 * Should make this much more flexible later. It only supports two columns now.
 */
const Columns: FC<ColumnsProps> = ({ children }) => (
  <div className="grid md:grid-cols-2 gap-4 lg:gap-8">{children}</div>
);

export { Columns };
