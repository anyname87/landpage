
var express = require('express')
var home = require('./routes/index')
var engine = require('ejs-locals');
//var admin = require('./routes/admin')
//var blog = require('./routes/blog')

var app = express();
app.use(express.logger());

// Устанавливает модулья для layout
app.engine('ejs', engine);
// Configuration

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', home.index);
app.get('/catalog', home.catalog);
/*
app.get('/blog', blog.index);
app.get('/blog/:id', blog.post);
app.get('/admin', admin.index);
app.get('/admin/posts', admin.posts);
app.get('/admin/posts/:id', admin.post);
app.post('/admin/posts/:id', admin.postSave);
*/
app.listen(process.env.PORT||3000);
console.log("Express server listening on port %d in %s mode", "25294", app.settings.env);
