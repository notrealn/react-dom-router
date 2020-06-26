import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch, useLocation, NavLink } from 'react-router-dom';
import { renderApp } from '../src/util';

import './style.css';

function App() {
  //   const location = useLocation();

  return (
    <>
      <nav title="Monument Platformer">
        <NavLink exact to="/">
          root
        </NavLink>
        <NavLink to="/page2">
          /page2
        </NavLink>
        <NavLink  to="/page3">
          /page3
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/page2">
            <div>page 2</div>
          </Route>
          <Route path="/page3">
          <div>page 3</div>

          </Route>
        </Switch>
      </main>
    </>
  );
}

export class Home extends React.Component {
  render() {
    return (
      <>
        <span>page 1</span>
      </>
    );
  }
}

renderApp(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
