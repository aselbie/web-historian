var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
  console.log('readListofUrls');
  fs.readFile(exports.paths.list, function(err, data){
    console.log((data + '').split('\n'));
    cb((data + '').split('\n'));
  })
};

exports.isUrlInList = function(url, urls, cb){
  console.log('isUrlInList');
  var found = false;
  if (urls.indexOf(url) !== -1) {
    found = true;
  }
  cb(found);
};

exports.addUrlToList = function(url){
  console.log('addUrlToList');
  exports.readListOfUrls(function(urls){
    urls.push(url);
    console.log('Trying to write to file: ', urls);
    fs.writeFile(exports.paths.list, urls.join('\n'));
  })
};

exports.isURLArchived = function(url, cb){
  fs.readFile(path.join(exports.paths.archivedSites, url), function(err, data){
    cb(err);
  })
};

exports.downloadUrls = function(){
};
