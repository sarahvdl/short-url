import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import request from 'request';

/*eslint-disable no-console*/

const port = 3000;
const app = express();
const compiler = webpack(config);

const apiURL = "https://impraise-shorty.herokuapp.com";

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/shorten', function(req, res) {
  let url = apiURL + '/shorten';
  req.pipe(request(url)).pipe(res);
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(port, function(err) {
  if(err) console.log(err);
});
