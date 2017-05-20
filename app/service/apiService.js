'use strict';

import request from 'superagent';
import {Parser} from 'xml2js';
import moment from 'moment';

const parser = new Parser({mergeAttrs: true, charkey: 'val'});

var days = null;
function fetchData(start, end, int, skip, url){
  days = skip;
  const endPoint = url || 'http://www.zacharycrumbo.com/widgets/solar-vanilla/solar-xml.php';
  return new Promise( (resolve, reject) => {
    request.post(endPoint)
    .set('Accept', 'application/json')
    .set('Content-type', 'application/x-www-form-urlencoded')
    .send({
      start,
      end,
      interval: int || 'd',
      skip: skip || 363,
    }).end ((err, res) => {
      if (err) reject('server error');
      parser.parseString(res.text, (err, results) => {
        if (err) reject('xml parse error');
        resolve(results.group.data[0]);
      });
    });
  });
}

function processResultsPie(resObj){
  let procObj = {};
  resObj.r[0].c.forEach((el, index) => {
    let name = resObj.cname[index].val.replace(/[D\s]/g, '_').replace(/[!@|]/g, '').toLowerCase();

    procObj[name]=(el - resObj.r[resObj.r.length-1].c[index])/3600000;
  });
  return procObj;
}

function processResultsLine(resObj){
  let procObj = {};
  resObj.r[0].c.forEach((el, index) => {
    let name = resObj.cname[index].val.replace(/[D\s]/g, '_').replace(/[!@|]/g, '').toLowerCase();

    procObj[name]=resObj.r.map((row, i, array) => {
      if(array[i-1]) return {date:moment().subtract(days*i, 'day').format('MM D YY'), kwh:( array[i-1].c[index]- row.c[index])/3600000};
    });
  });
  return procObj;
}

export {fetchData, processResultsPie, processResultsLine};