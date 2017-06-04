'use strict';
import {Parser} from 'xml2js';
import mock from './mockInstantResponse.xml';

const parser = new Parser({mergeAttrs: true, charkey: 'val', async:true});

export function fetchDataInstantProxy(){
  return new Promise((resolve, reject)=> {
    process.nextTick(() => {
      (parser.parseString(mock, (err, results)=> {
        if (err) reject(err);
        resolve(results);
      }));
    });
  });
}