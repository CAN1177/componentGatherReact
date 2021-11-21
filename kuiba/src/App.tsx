import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import "./App.css";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu"
import Icon from "./components/Icon/icon";

library.add(fas)
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-btn" >
          <Icon icon="fighter-jet"  theme="primary" size="4x" /> <span style={{fontSize:'40px'}}>Kuiba</span>
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
