import { FC } from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import { Link } from '@remix-run/react';

const Nav: FC = () => (
  <nav className="bg-gray-900 text-gray-50 py-4 px-4 flex items-center justify-between">
    <Link className="font-medium" to="#">
      Home
    </Link>
    <Link className="font-medium" to="#">
      About
    </Link>
    <Link className="font-medium" to="#">
      Services
    </Link>
    <Link className="font-medium" to="#">
      Contact
    </Link>
    <DarkModeToggle />
  </nav>
);

export { Nav };
