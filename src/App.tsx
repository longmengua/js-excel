import React from "react";
import logo from "./logo.svg";
import "./app.css";
import ExcelParser from "./excel-parser";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ExcelParser />
      </header>
    </div>
  );
}

export default App;
