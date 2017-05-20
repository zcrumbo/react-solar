'use strict';

import './scss/main.scss';

import React from 'react';
import { render } from 'react-dom';
import InstantDisplay from './components/InstantDisplay/InstantDisplay.js';
import Summaries from './components/Summaries/Summaries.js';

window.React = React;

render(
  <main>
    <InstantDisplay />
    <div className="clearfix"></div>
    <Summaries />
  </main>,
  document.getElementById('solar-app')
);