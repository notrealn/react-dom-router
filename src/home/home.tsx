import React from 'react';

import { renderApp } from '../../src/util';

import './style.scss';

const App = (props: {}) => {
  return (
    <>
      <div>
        something
        <a href="play">play</a>
      </div>
    </>
  );
};

renderApp(
  <App />
);
