'use client';

import { NavLink } from 'react-router';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Switch } from '../ui/switch';

export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('tr-theme') as
      | 'light'
      | 'dark'
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('tr-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="bg-muted py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex space-x-4">
          {/* <NavLink
            to="/"
            className="text-lg font-semibold transition-colors duration-200 hover:text-muted-foreground"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-lg font-semibold transition-colors duration-200 hover:text-muted-foreground"
          >
            About
          </NavLink> */}
        </div>
        <div className="flex items-center">
          <Sun className="mr-2 h-4 w-4" />
          <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          <Moon className="ml-2 h-4 w-4" />
        </div>
      </div>
    </nav>
  );
}
