'use strict';
import {Parser} from 'xml2js';
//import mock from './mockInstantResponse.xml';
//var mock = JSON.stringify(require('./mockInstantResponse.xml'));
const parser = new Parser({mergeAttrs: true, charkey: 'val', async:true});

const mock = {
  text:'<?xml version="1.0" encoding="UTF-8" ?> <data serial="0x2d195193"><ts>1496599422</ts> <r t="P" n="Grid"><v>3325384208</v><i>-1058</i></r> <r t="P" n="Solar"><v>59269564103</v><i>1358</i></r> <r t="P" n="Solar+"><v>59462017317</v><i>1358</i></r> <r t="P" n="Heat Pump|"><v>15056171607</v><i>25</i></r> <r t="P" n="Water Heater"><v>2162135157</v><i>2</i></r></data>'
};

export function fetchDataInstantProxy(){
  return new Promise((resolve, reject)=> {
    process.nextTick(() => {
      (parser.parseString(mock.text, (err, results)=> {
        console.log(results)
        if (err) reject(err);
        resolve(results);
      }));
    });
  });
}