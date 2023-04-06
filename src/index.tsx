import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Login } from './page/loginPage/login';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Login/>
  </React.StrictMode>
);
