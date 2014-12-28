var http = require('http');
var cheerio = require('cheerio');
var request = require("request");
var fs = require('fs');
var cton = require("./chordtonote");
var tablink = require("./tablink");

Array.prototype.getUnique = function(){
    var u = {}, a = [];
    for(var i = 0, l = this.length; i < l; ++i){
        if(u.hasOwnProperty(this[i])) {
            continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;
    }
    return a;
}

exports.index = function(req, res){
    res.render('index', { title: 'Express' });
};

var scrape = exports.scrape = function(link , callback){
    request(link, function(error, response, body){
        var dt = getLyricsWithChords(body);
        callback(dt);
    });
}

function getLyricsWithChords(chunk){
    $ = cheerio.load(chunk);
    var rel = $('#cont').find('pre').nextAll().html();
    return rel;
}

function extractChords(chunk){
    $ = cheerio.load(chunk);
    var chords = [];
    $.root().find('span').each(function(i, elem) {
        chords[i] = $(this).text();
    });
    if(chords.length == 0) return [];
    return chords.getUnique();
}

function getSongBodyFromQuery(query, callback){
  tablink.getSiteURL(query, function(url){
  	if(url === null) callback(null);
  	else{
        scrape(url, function(dt){
            callback(dt);
        });
       }
  });

}
exports.handleRoot = function(req, res){
    if(req.query.q === undefined){
        res.send("Please enter a url ?q= query");
        return;
    }
    getSongBodyFromQuery(req.query.q, function(body){
        res.render('showing', {data:body});
    });
}


exports.handleAccompaniment = function(req,res){
    getSongBodyFromQuery("Nothing Else Matters", function(body){
        var chords = extractChords(body);
        res.render('accompaniment', {data:body, chords:chords});
    });
}



exports.getChords = function(req, res){
    if(req.query.q === undefined){
        res.send("Please enter a url ?q= query");
        return;
    }
    getSongBodyFromQuery(req.query.q, function(body){
        var dt = extractChords(body);
        res.json(dt);
    });
};

exports.getNotes = function(req, res){
    if(req.query.q === undefined){
        res.send("Please enter a url ?q= query");
        return;
    }
    getSongBodyFromQuery(req.query.q, function(body){
        var dt = extractChords(body);
        var notesArr = [];
        for(var i = 0; i < dt.length; i++){
            var obj = {};
            if(cton.convert(dt[i])[0] !== null){
                var notes = cton.convert(dt[i])[0];
                for (var j =1; j< notes.length; j++){
                   if(notes[j] < notes[j-1]){
                       notes[j] += 12;
                   }
                }

                obj[dt[i]] = notes;
                notesArr.push(obj);
            }
        }
        res.json(notesArr);
    });
};

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