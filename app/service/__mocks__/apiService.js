'use strict';
import {Parser} from 'xml2js';
const mock = require( './mockInstantResponse.xml');
//console.log('--------',mock.toString())

const parser = new Parser({mergeAttrs: true, charkey: 'val', async:true});

export function fetchDataInstantProxy(){
  return new Promise((resolve, reject)=> {
    process.nextTick(() => {
      (parser.parseString(mock.toString().trim(), (err, results)=> {
        if (err) reject(err);
        resolve(results);
      }));
    });
  });
}