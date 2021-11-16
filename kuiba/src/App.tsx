import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-btn">
          <Button disabled>Hello</Button>
          <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
            Hello, 树🌲
          </Button>
          <Button btnType={ButtonType.Link} href="http://can1177.com">
            俺的Blog
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
