'use strict';

import React from 'react';
import {mount, render, shallow} from 'enzyme';
import InstantDisplay from '../app/components/InstantDisplay/InstantDisplay.js';

jest.mock('../app/service/apiService');

describe('Instant Display Tests', function() {
  let mountedInstantDisplay;
  const instantDisplay = () => {
    if(!mountedInstantDisplay) {
      mountedInstantDisplay = mount(
      <InstantDisplay />
      );
      return mountedInstantDisplay;
    }
  };
  beforeEach(() => {
    mountedInstantDisplay = undefined;
  });
  describe('Initial rendered component', () => {
    const section = instantDisplay();
    section.instance().updateInstantProxy = jest.fn();
    section.update();
    console.log(section.instance());
    test('it renders a single section', () => {
      expect(section.find('section').length).toEqual(1);
    });
    test('it is initially collapsed', () => {
      expect(section.find('div.data-vis.expanded').exists()).toEqual(false);
    });
    test('it will start requesting data', () => {
      expect(section.state().paused).toEqual(false);
    });
  });
  describe('the parsed data', () => {
    //expect.assertions(1);
    //return
  });
});