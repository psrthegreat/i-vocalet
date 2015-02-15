var MusicsDAO = require('./music').MusicsDAO;


/* The ContentHandler must be constructed with a connected db */

function ContentHandler(db){
	"use strict";

	var musics = new MusicsDAO(db);

	this.displayMainMusicPage = function(req, res, next){
		"use strict";
		var query = "nothing else matters";

		musics.getMusicByQuery(query, function(err, music){
			"use strict"
			if (err) return next(err);

			return res.render('angmusic', music);
		});
	}


	this.handleNewMusic = function(req, res, next){
		"use strict"

		var query = req.query.q;

		musics.insertEntry(query, function(err, music){
			"use strict"

			if(err) return next(err);
			
			return res.render('angmusic', music);
		});
	}

	this.handleMusicJSON = function(req, res, next){
		"use strict";
		
		var query = "nothing else matters";

		musics.getMusicByQuery(query, function(err, music){
			"use strict"

			if (err) return next(err);

			return res.json(music);
		});

	}

	this.handleSearchSongJSON = function(req, res, next){
		"use strict";

		var query = req.query.q;


		musics.insertEntry(query, function(err, music){
			"use strict"

			if(err) return next(err);

			return res.json(music);
		});

	}

	this.handleSearchSong = function(req, res, next){
		"use strict"

		var query = req.query.q;

		musics.insertEntry(query, function(err, music){
			"use strict"

			if(err) return next(err);

			return res.json(music);
		});

	}

}

module.exports = ContentHandler;