import React from 'react'
import { HelmetProvider } from 'react-helmet-async';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import App from './App.jsx'
import './index.css'
import './fonts.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <Suspense>
    <App />
    </Suspense>
    </HelmetProvider>
)
