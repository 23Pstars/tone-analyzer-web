var express = require('express');
var request = require('request');

var app = express();

app.set('view engine', 'ejs');

app.use('/assets/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/assets/js', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/assets/js', express.static(__dirname + '/node_modules/chart.js/dist/'));
app.use('/assets/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts/'));

app.use('/tes.json', express.static(__dirname + '/tes.json'));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/fetch/:site', function(req, res) {
  const options = {
    method: 'GET',
    uri: 'http://api.lrsoft.id/ibm-watson/v1/tone-analyzer',
    qs: {
      site: req.params.site,
      limit: 50
    }
  };
  request(options, function(error, response, body) {
    res.end(body);
  });
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on port " + port);
});