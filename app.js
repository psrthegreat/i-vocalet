var express = require('express');
var music = require('./routes/music');
var ivocaletAcc = require('./routes/ivocaletAcc.js');
var tablink = require('./routes/tablink');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var MongoClient = require('mongodb').MongoClient;

var app = express();

MongoClient.connect('mongodb://localhost:27017/dbivocalet', function(err,db) {

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	
	app.use(express.cookieParser());
	app.use(express.bodyParser());

	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());       // to support JSON-encoded bodies
	app.use(express.urlencoded()); // to support URL-encoded bodies
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));

	// Application routes
	routes(app,db);

	app.listen(3000);
	console.log('Express server listening on port 3000');

	// development only
	//if ('development' == app.get('env')) {
	//  app.use(express.errorHandler());
	//}

	// routes that needs to be cleaned.
	/*
	app.get('/making', function(req,res){
	    res.render('making');
	});
	app.get('/accompaniment', music.handleAccompaniment); // to make an online query for a song
	app.get('/showing', music.handleRoot);
	app.get('/c', music.songReq, music.getChords);
	app.get('/n', music.songReq, music.getNotes);
	app.get('/cnl', music.getChordsNotesLyrics);
	app.get('/dbinsert', music.handleAll);

	app.get('/', function(req,res){
		res.redirect('/accompaniment');
	});
	*/

	/*
	app.get('/', function(req,res){
		res.redirect('/ivocaletAcc');
	});


	app.get('/ivocaletAcc', function(req,res){
		music.init("Nothing Else Matters",function(all){
		res.render('ivocaletAcc',all);	
		});
		
	})


	//app.use('/ivocaletAcc', ivocaletAcc);

	app.get('*', function(req, res){
	 res.status(404).send('404');
	});


	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});

	//module.exports = app;
	*/

});
