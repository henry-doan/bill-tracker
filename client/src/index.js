import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import AuthProvider from "./providers/AuthProvider";
import BillProvider from "./providers/BillProvider";

import { initMiddleware } from 'devise-axios';
import 'semantic-ui-css/semantic.min.css';

initMiddleware();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BillProvider>
          <App />
        </BillProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);