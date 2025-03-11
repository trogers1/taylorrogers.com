import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import Navbar from './components/custom/navbar';

export default function RootLayout() {
  return (
    <html lang="en" className="flex size-full flex-col">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex w-full flex-grow flex-col">
        <Navbar />
        <main className="w-full flex-grow">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
        </main>
      </body>
    </html>
  );
}
