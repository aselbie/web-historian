var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.send = send = function(res, body, code){
  code = code || 200;
  res.writeHead(code, headers);
  res.end(body);
}

exports.serveLoading = serveLoading = function(res){
  console.log('Trying to serve: ', path.join(__dirname, 'public', '/loading.html'));
  fs.readFile(path.join(__dirname, 'public', '/loading.html'), function(err, data){
    if (err){
      send(res, null, 404);
    } else {
      headers.location = '/loading.html';
      send(res, data, 302);
    }
  })
}

exports.serveSite = serveSite = function(res, asset, callback){
  fs.readFile(path.join(__dirname, '../archives/sites', asset), function(err, data){
    if (err){
      callback(res);
    } else {
      send(res, data);
    }
  })
}

exports.servePublic = servePublic = function(res, asset, callback){
  console.log('Trying to serve: ', path.join(__dirname, 'public', asset));
  fs.readFile(path.join(__dirname, 'public', asset), function(err, data){
    if (err){
      serveSite(res, asset, callback);
    } else {
      send(res, data);
    }
  })
}


exports.serveAssets = function(res, asset, callback) {
  servePublic(res, asset, callback);
};



// As you progress, keep thinking about what helper functions you can put here!
