import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

import "./App.css";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-btn">
          <Button disabled size={ButtonSize.Large}>
            Disabled
          </Button>
          <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
            Primary
          </Button>
          <Button
            btnType={ButtonType.Danger}
            onClick={(e) => {
              alert("222");
            }}
            size={ButtonSize.Small}
          >
            Danger
          </Button>
          <Button
            btnType={ButtonType.Default}
            autoFocus
            size={ButtonSize.Small}
          >
            Default
          </Button>
          <Button btnType={ButtonType.Link} href="http://can1177.com">
            Link
          </Button>

          <Menu defaultIndex={0} onSelect={(index) =>{
            console.log('%c 🥡 index: ', 'font-size:20px;background-color: #FCA650;color:#fff;', index);
          }}>
            <MenuItem index={1}>Item 1</MenuItem>
            <MenuItem index={2}>Item 2</MenuItem>
          </Menu>
        </div>
      </header>
    </div>
  );
}

export default App;
