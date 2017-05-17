'use strict';

import './scss/main.scss';

import React from 'react';
import { render } from 'react-dom';
import InstantDisplay from './components/InstantDisplay/InstantDisplay.js';
import UsageChart from './components/UsageChart/UsageChart.js';


window.React = React;

render(
  <main>
    <InstantDisplay />
    <UsageChart />
  </main>,
  document.getElementById('solar-app')
);