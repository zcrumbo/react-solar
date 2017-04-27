'use strict';

import './scss/main.scss';

import React from 'react';
import { render } from 'react-dom';
import InstantDisplay from './components/InstantDisplay/InstantDisplay.js';


window.React = React;

render(
  <InstantDisplay />,
  document.getElementById('solar-app')
);