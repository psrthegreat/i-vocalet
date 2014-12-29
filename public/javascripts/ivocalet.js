var NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

var Ivocalet = function(synth) {
	this.synth = synth;
	this.instruments = [];
	this.octaves = [4,5];
	this.wavs = [];
	this.instrumentString = ['piano', 'organ', 'acoustic'];
};

Ivocalet.prototype.createInstruments = function( ) {
	for(var i = 0; i < this.instrumentString.length; i++){
	   this.instruments.push(this.synth.createInstrument(this.instrumentString[i]));
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
	for(var ins = 0; ins < this.instrumentString.length; ins++){
		for (var i = 0; i < NOTES.length; i++) {
			for (var j = 0; j < this.octaves.length; j++) {
				this.wavs.push(this.instruments[ins].generate(NOTES[i], this.octaves[j], 2));
			}
		}
	}
 };

 Ivocalet.prototype.test = function( ) { 
	for(var i = 0; i < this.instrumentString.length; i++){
		this.instruments[i].play('D', 4, 4);
		this.instruments[i].play('F', 4, 4);
		this.instruments[i].play('A', 4, 4);	
	}
 };