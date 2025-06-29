import { createBrowserRouter } from 'react-router';

import App from '../App.tsx';
import HomePage from '../components/pages/HomePage';

import { ROUTES } from './routes.ts';

export const ROUTER = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: ROUTES.MOVIES,
        Component: HomePage,
      },
    ],
  },
]);
