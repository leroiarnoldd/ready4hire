import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

// Hide loading spinner
const loading = document.getElementById('loading');
if(loading) loading.style.display = 'none';
