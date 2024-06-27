import { initMiddleware } from 'devise-axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import './index.css';
import AuthProvider from "./providers/AuthProvider";
import BillProvider from "./providers/BillProvider";
import PaymentProvider from "./providers/PaymentProvider";

initMiddleware();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BillProvider>
          <PaymentProvider>
            <App />
          </PaymentProvider>
        </BillProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);