import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./layout.tsx', [
    index('routes/home.tsx'),
    route('/about', 'routes/about.tsx'),
    route('/streak', 'routes/streak.tsx'),
    route('/timeline', 'routes/timeline.tsx'),
  ]),
] satisfies RouteConfig;
