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
  describe('The rendered component', () => {
    const section = instantDisplay();
    section.instance().updateInst = jest.fn();
    section.update();
    //console.log(section)
    test('it renders a single section', () => {
      expect(section.find('section').length).toEqual(1);
    });
  });
  describe('the parsed data', () => {
    //expect.assertions(1);
    //return
  });
});