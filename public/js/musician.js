//
var Musician = function(synth,instrument, notes) {
 	this.synth = synth;
 	this.instrument = synth.createInstrument(instrument);
 	this.notes = notes;
 	this.arpeggio_notes = ["C","E","G","C","G","E","C"];
 	this.triad_notes = ["G", "E", "C"];
 	this.bass_note = "C";
 	this.arpeggio_tempo = 0;
 	this.triad_tempo = 0;
 	this.bass_tempo = 0;
 	TIME = 1000; // delay time in seconds
 };



Musician.prototype.arpeggio = function( ) {
	var results= [ ]; //redundant
	var that = this;
	for (var count = 0; count < this.arpeggio_notes.length; count++) {
		var seconds = (count+1) * 1000;
		var result = window.setTimeout(function(count){
			//console.log(count);
			//console.log(that.arpeggio_notes[count]);
			$("#arpeggio").html(that.arpeggio_notes[count]);
			that.instrument.play(that.arpeggio_notes[count],4,2);
		}, seconds, count);
		
		results.push(result);	
	};
	
	return seconds; 	//redundant return. 

 };

 Musician.prototype.triad = function( ) { 
 	for (var count=0; count < this.triad_notes.length; count++){
 		//console.log(this.triad_notes[count]);
 		$("#triad").html(this.triad_notes);
 		this.instrument.play(this.triad_notes[count],4,2);
 	};
 };

 Musician.prototype.bass = function( ){ 
 	$("#bass").html(this.bass_note);
 	this.instrument.play(this.bass_note, 4, 2);
 };

 Musician.prototype.setArpeggioTempo = function( ){
 	this.arpeggio_tempo = this.arpeggio_notes.length * TIME;
 };

 Musician.prototype.setTriadTempo = function(tempo){
 	this.triad_tempo = tempo * TIME;
 };

 Musician.prototype.setBassTempo = function(tempo){ 
 	this.bass_tempo = tempo * TIME;
 };






 
 
