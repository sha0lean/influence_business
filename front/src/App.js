import './index.css';
import React from "react";
import Layout from "./components/layout/Layout.js";
import "../node_modules/@drewbot/sass-flexbox-grid/public/sass-flexbox/main.min.css"

import Routes from "./routes";
function App() {

  return (
    <div className="App">
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
}


export default App;
