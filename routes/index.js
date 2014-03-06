var http = require('http');
var cheerio = require('cheerio');
var request = require("request");
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
    return chords.getUnique();
}

function getSongBodyFromQuery(query, callback){
  tablink.getSiteURL(query, function(url){
        scrape(url, function(dt){
            callback(dt);
        });
  });
}

exports.handleRoot = function(req, res){
    if(req.query.q === undefined){
        res.send("Please enter a url ?q= query");
        return;
    }
    getSongBodyFromQuery(req.query.q, function(body){
        res.render('index', {data:body});
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
            obj[dt[i]] = cton.convert(dt[i]); 
            notesArr.push(obj);
        }
        res.json(notesArr); 
    });
};
