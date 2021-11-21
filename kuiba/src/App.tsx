import React from "react";
// import Button, { ButtonSize, ButtonType } from "./components/Button/button";

import "./App.css";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-btn">
          <Menu onSelect={(index) =>{
            console.log('%c 🥡 index: ', 'font-size:20px;background-color: #FCA650;color:#fff;', index);
          }}  defaultOpenSubMenus ={["1"]}>
            <MenuItem>Item 1</MenuItem>
            <SubMenu title="Item 2">
              <MenuItem >Child 1</MenuItem>
              <MenuItem >Child 2</MenuItem>
              <MenuItem >Child 3</MenuItem>
            </SubMenu>
          </Menu>
        </div>
      </header>
    </div>
  );
}

export default App;
