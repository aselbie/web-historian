var path = require('path');
var archive = require('../helpers/archive-helpers');
var parse = require('url').parse;
var httpHelpers = require('./http-helpers.js');
var qs = require('querystring');
// require more modules/folders here!
var actions = {
  'GET': function(req, res){
    var pathName = parse(req.url).pathname;
    if (pathName === '/'){
      pathName = '/index.html';
    }
    httpHelpers.serveAssets(res, pathName, function(res){
      httpHelpers.send(res);
    });
  },
  'POST': function(req, res){
    var pathName = parse(req.url, true);
    var body = '';
    req.on('data', function(chunk){
      body += chunk;
    })
    req.on('end', function(){
      var postData = qs.parse(body);
      // AsyncWorkerTask(postData);
      httpHelpers.serveAssets(res, postData.url, function(res){
        httpHelpers.serveLoading(res);
      });
    })
    // httpHelpers.serveAssets(res, pathName, function(res){
    //   ;
    // });
  }
}

exports.handleRequest = function (req, res) {
  if (actions[req.method]){
    actions[req.method](req, res);
  }
};
