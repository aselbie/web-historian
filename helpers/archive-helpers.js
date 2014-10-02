var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb){
  fs.readFile(exports.paths.list, function(err, data){
    var urls = (data + '').split('\n');
    if (urls[urls.length-1] === '') {
      urls.pop();
    }
    cb(urls);
  })
};

exports.isUrlInList = function(url, urls, cb){
  var found = false;
  if (urls.indexOf(url) !== -1) {
    found = true;
  }
  cb(found);
};

exports.addUrlToList = function(url){
  exports.readListOfUrls(function(urls){
    urls.push(url);
    fs.writeFile(exports.paths.list, urls.join('\n') + '\n');
  })
};

exports.isURLArchived = function(url, cb){
  fs.readFile(path.join(exports.paths.archivedSites, url), function(err, data){
    cb(err);
  })
};

exports.downloadUrl = function(url){
  http.get(url, path.join(exports.paths.archivedSites, url));
};
