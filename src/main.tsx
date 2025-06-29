import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { ROUTER } from './constants/router.ts';

import './styles/globals.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={ROUTER} />
  </StrictMode>,
);
