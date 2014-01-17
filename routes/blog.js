
var models = require("../models");
var persist = require("persist");
require("persist/extensions/jqgrid");

/*
 * GET all blogs as json.
 */
exports.index = function(req, res, next){
  persist.connect(function(err, conn) {
    if(err) { next(err); return; }

    conn.chain({
      blogs: models.Blog.include(["category"]).all
    }, function(err, results) {
      if(err) { next(err); return; }
      res.render('blog/index', {
        title: 'Blog contents',
        posts: results.blogs
      });
    });
  });
};

exports.post = function(req, res, next){
  var id = req.params.id;
  if(!id) { throw new Error("'id' is required."); }

  persist.connect(function(err, conn) {
    if(err) { next(err); return; }

    var queries = {
        blog: models.Blog.getById(id)
    };

    conn.chain(queries, function(err, results) {
      if(err) { next(err); return; }

      var post = results.blog;

      res.render('blog/post', {
        title: post.title,
        post: post,
        categories: results.categories
      });
    });
  });
};
