import type { Route } from './+types/home';
import { Welcome } from '../welcome/welcome';
import { redirect } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export function loader() {
  return redirect('/about');
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <Welcome message={'Hi'} />;
}
