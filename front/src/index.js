// react
import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";

// local imports
import Layout from "./components/layout/Layout.js";
import Routes from "./routes";

// style
import "./App.css"


function App() {
  return (
    <div className="text-center">
      <Router>
        <Layout>
          <Routes />
        </Layout>
      </Router>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);


