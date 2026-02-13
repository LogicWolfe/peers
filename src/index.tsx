import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import PeerReviews from './views/PeerReviews';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PeerReviews />
  </React.StrictMode>
);
