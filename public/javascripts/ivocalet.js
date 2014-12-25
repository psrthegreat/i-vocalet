
var NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
var OCTAVES = [2,3,4,5,6];
var DURATION = 2; // in seconds
var WAVEFILES = [ ];
var PIANO = 'piano';
var ORGAN = 'organ';
var ACOUSTIC_GUITAR = 'acoustic';

var Ivocalet = function(synth) {
	this.synth = synth;
	this.piano = synth.createInstrument(PIANO);
	this.organ = synth.createInstrument(ORGAN);
	this.acoustic_guitar = synth.createInstrument(ACOUSTIC_GUITAR);
};

Ivocalet.prototype.init = function( ) {
	// generateWaveFiles
	this.generateWaveFiles( );
	this.synth.debug( );
	//this.playNote( );
};

Ivocalet.prototype.generateWaveFiles = function( ){
	// this.piano.generate('D#', 4, 2);
	// generates a wave file of the form
	// "blob:http%3A//localhost%3A3000/4f8c344a-5d36-4f1c-b953-7a113094425d"
    
    for (var i = 0; i < NOTES.length; i++) {
    	for (var j = 0; j < OCTAVES.length; j++) {
    		var result_1 = this.piano.generate(NOTES[i], OCTAVES[j], DURATION);
    		WAVEFILES.push(result_1);

    		var result_2 = this.organ.generate(NOTES[i], OCTAVES[j], DURATION);
    		WAVEFILES.push(result_2);

    		var result_3 = this.acoustic_guitar.generate(NOTES[i], OCTAVES[j], DURATION);
    		WAVEFILES.push(result_3);


    	};
    };
 };

 Ivocalet.prototype.playNote = function( ) { 
 	
 	this.piano.play('D#', 4, 4);

    this.piano.play('F#', 4, 4);

    this.piano.play('G#', 4, 4);

    this.organ.play('D#', 4, 4);

    this.organ.play('F#', 4, 4);

    this.organ.play('G#', 4, 4);

    this.acoustic_guitar.play('D#', 4, 4);

    this.acoustic_guitar.play('F#', 4, 4);

    this.acoustic_guitar.play('G#', 4, 4);
	

 };

