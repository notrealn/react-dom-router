import * as React from 'react';
import { Route, BrowserRouter, Switch, useLocation, NavLink } from 'react-router-dom';
import { renderApp } from '../src/util';
import { Home } from './home/home';

import './index.scss';

class App extends React.Component {
  render() {
    const location = useLocation();

    return (
      <>
        <nav>
          <NavLink exact to="/"><button>root</button></NavLink>
          <NavLink to="/page2"><button>/page2</button></NavLink>
          <NavLink to="/page3"><button>/page3</button></NavLink>
        </nav>
        <main>
          <Switch location={location}>
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
}

renderApp(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
