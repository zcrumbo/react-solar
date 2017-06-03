'use strict';

import React from 'react';
import {mount, render, shallow} from 'enzyme';
import InstantDisplay from '../app/components/InstantDisplay/InstantDisplay.js';

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
  describe('The rendered component', () => {
    const section = instantDisplay();
    section.instance().updateInst = jest.fn();
    section.update();
    console.log(section.find('section').length);
    test('it renders a single section', () => {
      expect(section.find('section').length).toEqual(1);
    });
  });
});