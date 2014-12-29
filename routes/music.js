var http = require('http');
var cheerio = require('cheerio');
var request = require("request");
var fs = require('fs');
var cton = require("./chordtonote");
var tablink = require("./tablink");
var memoize = require('memoizee');
var util = require('./util');

function getLyricsWithChords(chunk){
	$ = cheerio.load(chunk);
	var rel = $('#cont').find('pre').nextAll().html();
	return rel;
}

var scrape = function(link , callback){
	 request(link, function(error, response, body){
		var dt = getLyricsWithChords(body);
		callback(error, dt);
	});
}

var memoizedScrape = memoize(scrape, {length:1, async: true, maxAge: 10000000, max: 100, primitive: true});

function extractChords(chunk){
	$ = cheerio.load(chunk);
	var chords = [];
	$.root().find('span').each(function(i, elem) {
		chords[i] = $(this).text();
	});
	if(chords.length == 0) return [];
	return chords.getUnique();
}

function extractBody(query, callback){
  tablink.getSiteURL(query, function(url){
	if(url === null) callback(null);
	else{
		memoizedScrape(url, function(err, dt){
			callback(dt);
		});
	   }
  });
}

function extractNotesFromChord(dt){
	var notesArr = [];
	for(var i = 0; i < dt.length; i++){
		if(cton.convert(dt[i])[0] === null) continue;
		var notes = cton.convert(dt[i])[0];
		for (var j =1; j< notes.length; j++){
		   if(notes[j] < notes[j-1]){
			   notes[j] += 12;
		   }
		}
		var obj = {};
		obj[dt[i]] = notes;
		notesArr.push(obj);
	}
	return notesArr;
}

function extractAll(query, callback){
	extractBody(query, function(body){
		var chords = extractChords(body);
		var notes = extractNotesFromChord(chords);
		var all = {chords: chords, notes: notes, body: body};
		callback(all);
	});
}

exports.songReq = function(req, res, next){
	if(req.query.q === undefined){
		res.send("Please enter a url ?q= query");
		return;
	}
	next();
}

exports.handleRoot = function(req, res){
	var query = req.query.q;
	extractAll(query, function(all){
		res.render('showing', all);
	});
}

exports.handleAccompaniment = function(req,res){
	var query = "Nothing Else Matters";
	extractAll(query, function(all){
		res.render('accompaniment', all);
	});
}

exports.getChords = function(req, res){
	var query = req.query.q;
	extractAll(query, function(all){
		res.json(all.chords);
	});
};

exports.getNotes = function(req, res){
	var query = req.query.q;
	extractAll(query, function(all){
		res.json(all.notes);
	});
};

/*
exports.up = function(req, res){
	console.log(req.files);
	fs.rename(req.files.wave.path,"/Users/Phoenix/Documents/Projects/i-vocalet/public/audio/" + req.files.wave.name + ".wav", function(){
		res.end();
	});
}

exports.getAllWavs = function(req, res){
	fs.readdir("/Users/Phoenix/Documents/Projects/i-vocalet/public/audio/", function(err, files){
		if (err) console.log(err);
		if(files[0] == '.DS_Store')
		files.splice(0,1);
		res.json(files);
	});
}
*/