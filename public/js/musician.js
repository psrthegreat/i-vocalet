//
var Musician = function(synth,instrument, notes) {
 	this.synth = synth;
 	this.instrument = synth.createInstrument(instrument);
 	this.notes = notes;
 	this.arpeggio_notes = ["C","E","G","C","G","E","C"];
 	this.triad_notes = ["G", "E", "C"];
 	this.bass_note = "C";
 };



Musician.prototype.arpeggio = function( ) {
	var results= [ ];
	var that = this;
	for (var count = 0; count < this.arpeggio_notes.length; count++) {
		var seconds = (count+1) * 1000;
		var result = window.setTimeout(function(count){
			console.log(count);
			console.log(that.arpeggio_notes[count]);
			that.instrument.play(that.arpeggio_notes[count],4,2);
		}, seconds, count);
		
		results.push(result);	
	};
	
	return seconds; 	

 };

 Musician.prototype.triad = function( ) { 
 	for (var count=0; count < this.triad_notes.length; count++){
 		this.instrument.play(this.triad_notes[count],4,2);
 	};
 };

 Musician.prototype.bass = function( ){ 
 	this.instrument.play(this.bass_note, 4, 2);
 };






 
 
