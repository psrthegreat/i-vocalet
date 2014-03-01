var http = require('http');
var cheerio = require('cheerio');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

function scrape(host, link, callback){
    var options = {
        host: host,
        port: 80,
        path: link 
    };

    http.get(options, function(resp) {
        console.log("Got response: " + resp.statusCode);
        resp.setEncoding('utf8');
        var data = "";

        resp.on('data', function (chunk) {
            data += chunk;
        });

        resp.on('end', function(){
            data = handleChunk(data);
            callback(data);
            return data;
        })
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
}
exports.scrape = function(req, res){
    var host = "tabs.ultimate-guitar.com";
    var link = "http://tabs.ultimate-guitar.com/j/jeff_buckley/hallelujah_ver2_crd.htm";
    scrape(host, link, function(dt){
        res.render('index', {data: dt});
    });
}

function handleChunk(chunk){
    $ = cheerio.load(chunk);
    var rel = $('#cont').find('pre').nextAll().html();
    return rel;
}

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

exports.getChords = function(req, res){
    var host = "tabs.ultimate-guitar.com";
    var link = "http://tabs.ultimate-guitar.com/j/jeff_buckley/hallelujah_ver2_crd.htm";
    scrape(host, link, function(dt){
        $ = cheerio.load(dt);
        var chords = [];
        $.root().find('span').each(function(i, elem) {
              chords[i] = $(this).text();
        });
        console.log(chords);
        res.json(chords.getUnique());
    });
}
