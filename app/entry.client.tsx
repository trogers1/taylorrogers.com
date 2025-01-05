import { startTransition, StrictMode, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import posthog from 'posthog-js';
import './app.css';

function PosthogInit() {
  useEffect(() => {
    posthog.init('phc_kEa3Sh3bjrL35HKgQSOsij8Kh6025TXSSO24V2vgj0A', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
    });
  }, []);

  return null;
}
startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
      <PosthogInit />
    </StrictMode>,
  );
});
