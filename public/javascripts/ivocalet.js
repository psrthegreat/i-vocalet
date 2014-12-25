var NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var OCTAVES = [2,3,4,5,6];
var DURATION = 2; // in seconds
var WAVEFILES = [ ];
var instruments = ['piano', 'organ', 'acoustic'];

var Ivocalet = function(synth) {
	this.synth = synth;
	this.instruments = [];
};

Ivocalet.prototype.createInstruments = function( ) {
	for(var i = 0; i < instruments.length; i++){
	   this.instruments.push(this.synth.createInstrument(instruments[i]));
	}
};

Ivocalet.prototype.init = function( ) {
	this.createInstruments();
	this.generateWaveFiles( ); // generateWaveFiles
	this.synth.debug( );
};

/* 
 * generates wave files of the form
 * "blob:http%3A//localhost%3A3000/4f8c344a-5d36-4f1c-b953-7a113094425d"  
 */
Ivocalet.prototype.generateWaveFiles = function( ){
	for(var ins = 0; ins < instruments.length; ins++){
		for (var i = 0; i < NOTES.length; i++) {
			for (var j = 0; j < OCTAVES.length; j++) {
				WAVEFILES.push(this.instruments[ins].generate(NOTES[i], OCTAVES[j], DURATION));
			}
		}
	}
 };

 Ivocalet.prototype.test = function( ) { 
	for(var i = 0; i < instruments.length; i++){
		this.instruments[i].play('D', 4, 4);
		this.instruments[i].play('F', 4, 4);
		this.instruments[i].play('A', 4, 4);	
	}
 };