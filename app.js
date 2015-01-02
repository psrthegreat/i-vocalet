var express = require('express');
var music = require('./routes/music');
var tablink = require('./routes/tablink');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/making', function(req,res){
    res.render('making');
});
app.get('/accompaniment', music.handleAccompaniment); // to make an online query for a song
app.get('/showing', music.handleRoot);
app.get('/c', music.songReq, music.getChords);
app.get('/n', music.songReq, music.getNotes);

/*
app.post('/m', routes.up);
app.get('/a', routes.getAllWavs);
*/

app.get('/', function(req,res){
	res.redirect('/accompaniment');
});

app.get('*', function(req, res){
 res.status(404).send('404');
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
