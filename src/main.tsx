import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AppProvider } from './context/AppContext';
import { HASH_ROUTES } from './seo/routes';
import './index.css';

// Old links used hash URLs (wordbrain.vercel.app/#/practice). Send them to the real page.
const legacy = HASH_ROUTES[window.location.hash];
if (legacy) window.history.replaceState(null, '', legacy);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
