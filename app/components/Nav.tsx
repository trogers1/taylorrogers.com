import { FC } from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import { Link } from '@remix-run/react';

const Nav: FC = () => (
  <nav className="bg-gray-900 text-gray-50 py-4 px-4 flex items-center justify-between">
    <Link className="font-medium" href="#">
      Home
    </Link>
    <Link className="font-medium" href="#">
      About
    </Link>
    <Link className="font-medium" href="#">
      Services
    </Link>
    <Link className="font-medium" href="#">
      Contact
    </Link>
    <DarkModeToggle />
  </nav>
);

export { Nav };
