import { FC } from 'react';

type PostedDateProps = {
  children: string;
};
const PostedDate: FC<PostedDateProps> = ({ children }) => (
  <p className="text-gray-500 dark:text-gray-400">{children}</p>
);

export { PostedDate };
