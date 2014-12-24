
var NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var OCTAVES = [2,3,4,5,6];
var DURATION = 2; // in seconds
var WAVEFILES = [ ];

var Ivocalet = function(synth) {
	this.synth = synth;
	this.piano = synth.createInstrument('piano');
};

Ivocalet.prototype.run = function( ) {
	// generateWaveFiles
	this.generateWaveFiles( );
	this.synth.debug( );
	this.playNote( );
};

Ivocalet.prototype.generateWaveFiles = function( ){
	// this.piano.generate('D#', 4, 2);
	// generates a wave file of the form
	// "blob:http%3A//localhost%3A3000/4f8c344a-5d36-4f1c-b953-7a113094425d"
    
    for (var i = 0; i < NOTES.length; i++) {
    	for (var j = 0; j < OCTAVES.length; j++) {
    		var result = this.piano.generate(NOTES[i], OCTAVES[j], DURATION);
    		WAVEFILES.push(result);
    	};
    };
 };

 Ivocalet.prototype.playNote = function( ) { 
 	this.piano.play('D#', 4, 4);
    this.piano.play('F#', 4, 4);
    this.piano.play('G#', 4, 4);
 };