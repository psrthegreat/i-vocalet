/*http://www.ultimate-guitar.com/search.php?search_type=title&value=american+idiot
 *table class tresults
 * in tbody
 * loop over trows
 * 4th td has to be "chords"
 * in class gray4, class rating, get child class name r_x where x is rating
 * 2nd td a href has link
 */

var routes = require('../routes');
var request = require("request");
var cheerio = require("cheerio");


function getBodyFromLink(link, callback){
    request(link,function(error, response, body){
        if(error) console.log(error);
        callback(body);
    });
}

function getLink(body){
    $ = cheerio.load(body);
    var rows = $('.tresults').find('tr').toArray();
    var bestLink = null;
    var bestLinkRate = -1;
    for(var i = 1; i< rows.length; i++){
        var tds = $(rows[i]).find('td').toArray();
        var link = $(tds).find('a').last().attr('href').trim();
        var ratingwrap = $(tds[tds.length-2]).find('.rating').find('span')['0'];
        if(ratingwrap === undefined) continue;
        var rating = $($.html(ratingwrap))['0']['attribs'].class.substr(2);

        if(rating > bestLinkRate){
            bestLinkRate = rating;
            bestLink = link;
        }
    }
    return bestLink;
}

function getChordSite(link, callback){
    getBodyFromLink(link, function(body){
        callback(getLink(body));
    });
}

function makeLinkFromQuery(query){
    var linkbase = "http://www.ultimate-guitar.com/search.php?search_type=title&value=";
    var queryencode = encodeURIComponent(query);
    var link = linkbase + queryencode + "+chords";
    return link
}

function getBestFromQuery(query, callback){
    var link = makeLinkFromQuery(query);
    getChordSite(link, callback);
}

exports.getSiteURL = getBestFromQuery;

var main = function(){
    // main code
    var query  = process.argv[2];
    if(query == undefined){
        console.log("Specify Link. Using Default");
        return;
    }
    var best = getBestFromQuery(query, function(best){
        console.log(best);
    });
}

if (require.main === module) {
    main();
}
