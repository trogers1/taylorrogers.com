import { Outlet } from 'react-router';
import Navbar from './components/custom/navbar';

export default function RootLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
