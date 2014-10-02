var archive = require('../helpers/archive-helpers.js');
var _ = require('underscore');

archive.readListOfUrls(function(urls){
  _.each(urls, function(url){
    archive.isURLArchived(url, function(err){
      if (err){
        archive.downloadUrl(url);
      }
    })
  })
})
