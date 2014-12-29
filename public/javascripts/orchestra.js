var Musician = function(instrument, style, orchestra) {
	this.instrument = Synth.createInstrument(instrument);
	this.style = style;
};

Musician.prototype.getToPlay = function(time, state){
	//uses state and style
	var modtime =  time%this.style.length;
	var styleAtTime = this.style[modtime];
	var toPlay = [state[styleAtTime]];
	return toPlay;
}

Musician.prototype.play = function(time, state){
	var toPlay = this.getToPlay(time, state);
	for(var i = 0; i < toPlay.length ; i++){
		var singleNoteWOctave = toPlay[i];
		var noteString = singleNoteWOctave.substring(0, singleNoteWOctave.length -1 );
		var octave = singleNoteWOctave.substring(singleNoteWOctave.length -1 , singleNoteWOctave.length);
		console.log(noteString + " " + octave);
		this.instrument.play(noteString, octave, 2); 
	}
};

var Orchestra = function() { 
	this.timeCount = 0;
	this.musicians = []; // add a type to the musicians
	this.performance = null;
};

function play(that, state){
	for(var i = 0; i < that.musicians.length; i++){
		that.musicians[i].play(that.timeCount, state);
	}
	that.timeCount++;
}

Orchestra.prototype.addMusician = function(musician){
	this.musicians.push(musician);
}

Orchestra.prototype.start = function(state, tempo) {
	console.log(state);
	this.timeCount = 0;
	var timeRep =1000 * (60/tempo);
	this.performance = window.setInterval(play, timeRep, this, state);
};

Orchestra.prototype.stop = function( ) {
	window.clearInterval(this.performance);
};