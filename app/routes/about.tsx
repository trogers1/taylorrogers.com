'use client';

import type { Route } from './+types/home';
import { AboutPage } from '~/about/AboutPage';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'About Taylor Rogers' },
    { name: 'description', content: 'Learn more about Taylor Rogers' },
  ];
}

export default function About() {
  return <AboutPage />;
}
