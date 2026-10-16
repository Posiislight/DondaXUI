import { StrictMode } from 'react'

import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App.tsx'
import { Analytics } from '@vercel/analytics/react';

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Built pages are prerendered (scripts/prerender.mjs), so hydrate their markup;
// the dev server's index.html has an empty #root.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
