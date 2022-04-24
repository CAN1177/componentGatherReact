import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import UserList from "./01/UserList";

const routes = [
  ["01 UserList", UserList]
];
const Empty = () => "";
export default function App() {
  return (
    <Router>
      <div className="app">
        <Empty />
        <ul className="sider">
          {routes.map(([label]) => (
            <li key={label}>
              <Link to={`/${label.replace(" ", "/")}`}>{label}</Link>
            </li>
          ))}
        </ul>
        <div id="pageContainer" className="page-container">
          <Switch>
            {routes.map(([label, Component, additionalRoute = ""]) => (
              <Route
                key={label}
                path={`/${label.replace(" ", "/")}${additionalRoute}`}
              >
                <Component />
              </Route>
            ))}
            <Route path="/" exact>
              <h1>Welcome!</h1>
            </Route>
            <Route path="*">Page not found.</Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
