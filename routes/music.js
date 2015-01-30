var http = require('http');
var cheerio = require('cheerio');
var request = require("request");
var fs = require('fs');
var cton = require("./chordtonote");
var tablink = require("./tablink");
var memoize = require('memoizee');
var util = require('./util');


function MusicsDAO(db){
	/*  If this constructor is called without the "new" operator, "this" points
		to the global object. Log a warning and call it correctly.
	*/
	if (false === (this instanceof MusicsDAO)) {
		console.log("Warning: MusicDAO constructor called without 'new' operator");
		return new MusicsDAO(db);
	}

	var musics = db.collection("musics");
	

	this.insertEntry = function(query, callback){
		"use strict"

		if(query == undefined){
			query = "nothing else matters";
		}

		extractAndInsertEntry(query, function(all){			
			if (all) {
				console.log("New music Inserted Successfully");
				return callback(null, all);
			}
			return callback(err, null);		
		});
	}

	this.getMusicByQuery = function(query, callback){
		"use strict"
		musics.findOne({"query" : query}, function(err, music){
			"use strict"

			if (err) return callback(err, null);

			callback(err, music);

		});
	}

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

	function extractAndInsertEntry(query, callback){
		extractBody(query, function(body){
			var chords = extractChords(body);
			var notes = extractNotesFromChord(chords);
			var music = {chords: chords, notes: notes, body: body, query: query};

			//Now insert the music
			musics.insert(music, function(err, inserted){
				"use strict"
				if (!err){
					console.log("Inserted new music " + JSON.stringify(inserted));
					return callback(music);
				}
				return callback(err);
			});
		});
	}

}

module.exports.MusicsDAO = MusicsDAO;



/*
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

var MongoClient = require('mongodb').MongoClient;
function extractAll(query, callback){
	extractBody(query, function(body){
		var chords = extractChords(body);
		var notes = extractNotesFromChord(chords);
		var all = {chords: chords, notes: notes, body: body, query: query};
		MongoClient.connect('mongodb://localhost:27017/dbivocalet',function(err,db){
			db.collection('ivocalets').insert(all, function(err, inserted){
				if(err) throw err;
				console.dir("Successfully inserted: " + JSON.stringify(inserted));
				return db.close;
			});
		});
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
	var query = "Nothing Else Matters";
	extractAll(query, function(all){
		res.render('showing', all);
	});
}


exports.handleAccompaniment = function(req,res){
	var query = req.query.q;
	if(query == undefined){
		query = "nothing else matters";
	}
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

exports.getChordsNotesLyrics = function(req,res){
	extractAll("Nothing Else Matters", function(all){
		res.json(all);
	});
};

exports.init = function(query, callback){
	extractAll(query, function(all){
		callback(all);
	});
}

*/


