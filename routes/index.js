var music = require('./music');
var ContentHandler = require('./content');
var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app,db){

	// The main page of i.vocalet.com
	//app.get('/showing', music.handleRoot);

	var contentHandler = new ContentHandler(db);

	// Main page
	app.get('/', contentHandler.displayMainMusicPage);

	// New Music
	app.get('/newmusic', contentHandler.handleNewMusic);

	app.get('/musicJSON', contentHandler.handleMusicJSON);

}