var http = require('http');
var cheerio = require('cheerio');
var request = require("request");

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

exports.scrape = function(link , callback){
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
    $ = cheerio.load(dt);
    var chords = [];
    $.root().find('span').each(function(i, elem) {
        chords[i] = $(this).text();
    });
    return chords.getUnique();
}

exports.getChords = function(req, res, link){
    request(link, function(error, response, body){
        var dt = extractChords(body);
        res.json(dt); 
    });
}
