import React from 'react';
import ReactDOM from 'react-dom/client';
import "./assets/css/style.css"
import App from './App';

import { BrowserRouter as Router } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));

// Router permet la navigation dans les pages
// App charge l'application React tout simplement x)
root.render(
  <Router>
    <App />
  </Router>
);


