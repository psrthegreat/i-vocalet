var routes = require('../routes');
var request = require("request");
var cheerio = require("cheerio");


var link = "http://www.cs.cmu.edu/~scottd/chords_and_scales/music.html?q=C7&hide_instructions=0&root=0&accidentals=1";


request(link, function(error, response, body){
   console.log(body);
$ = cheerio.load(body);
console.log($.html($("script")));

});
