import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/index.scss';
import App from './app';
import "./i8next";
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<App />);


