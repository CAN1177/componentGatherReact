import React from "react";
// import logo from './logo.svg';
// import "./App.css";
// import { ProjectListScreen } from "./screens/project-list";
import { LoginScreen} from "./screens/login/index";

function App() {
  return (
    <div className="App" style={{marginLeft: "200px"}}>  
      {/* <ProjectListScreen /> */}
      <LoginScreen/>
    </div>
  );
}

export default App;
