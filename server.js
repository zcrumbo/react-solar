'use strict';

const express = require('express');
const moment = require('moment');
const cors = require('cors');
const Router = express.Router;
const jsonParser = require('body-parser').json();
const rp = require('request-promise');
const app = express();
const PORT = process.env.PORT || 8080;

const proxyRouter = Router();

app.use(express.static(`${__dirname}/build`));
app.use(cors());
app.use(proxyRouter);

app.listen(PORT, () => {
  console.log('server up: ',PORT);

});

proxyRouter.post('/api/proxy/saved', jsonParser, (req, res, next)=>{
  const start = req.body.start || moment().subtract(1, 'day').unix();
  const end = req.body.end || moment().unix();
  const interval = req.body.interval || 'm';
  const skip = req.body.skip || 9;
  const url = `http://egauge16844.egaug.es/57A4C/cgi-bin/egauge-show?&t=${start}&f=${end}&s=${skip}&${interval}`;

  rp(url)
  .then(pRes => {
    res.send(pRes);
  })
  .catch(next);
});

proxyRouter.post('/api/proxy/instant', (req, res, next) => {
  rp('http://egauge16844.egaug.es/57A4C/cgi-bin/egauge?tot&inst')
  .then( pRes => {
    console.log(pRes)
    res.send(pRes);
  })
  .catch(next);
});