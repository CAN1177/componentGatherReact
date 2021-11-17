import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-btn">
          <Button disabled size={ButtonSize.Large}>Disabled</Button>
          <Button btnType={ButtonType.Primary} size={ButtonSize.Large} >
            Primary
          </Button>
          <Button btnType={ButtonType.Danger} onClick={(e) =>{alert("222")}}size={ButtonSize.Small}>
            Danger
          </Button>
          <Button btnType={ButtonType.Default} autoFocus size={ButtonSize.Small}>
            Default
          </Button>
          <Button btnType={ButtonType.Link} href="http://can1177.com">
            Link
          </Button>
        </div>
      </header>
    </div>
  );
}

export default App;
