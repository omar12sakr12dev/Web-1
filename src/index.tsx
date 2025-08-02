import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { registerServiceWorker, monitorWebVitals, preloadCriticalResources } from './components/PerformanceOptimizer';

// Preload critical resources
preloadCriticalResources();

// Register service worker for PWA
registerServiceWorker();

// Monitor web vitals
monitorWebVitals();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

