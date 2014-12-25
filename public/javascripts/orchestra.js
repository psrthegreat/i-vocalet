var Musician = function(instrument, notes) {
    this.instrument = Synth.createInstrument(instrument);
    this.notes = notes;
};

Musician.prototype.play = function(time){
    var modtime =  time%this.notes.length;
    for(var i = 0; i < this.notes[modtime].length; i++){
        this.instrument.play(this.notes[modtime][i][0], this.notes[modtime][i][1], 2);  
    }
};

var Orchestra = function() { 
	this.timeCount = 0;
    this.musicians = []; // add a type to the musicians
    this.performance = null;
    this.init();
   
};

function play(that){
    for(var i = 0; i < that.musicians.length; i++){
        that.musicians[i].play(that.timeCount);
    }
    that.timeCount++;
}

Orchestra.prototype.init = function( ) {
    var all_notes = [[["C4"], ["E4"], ["G4"], ["C5"], ["G4"], ["E4"]],[["C3","E3", "G3"], [], [], [], [], []]];
    var m1 = new Musician('piano', all_notes[0]);
    var m2 = new Musician('piano', all_notes[1]);
    this.musicians.push(m1);
    this.musicians.push(m2);
};


Orchestra.prototype.start = function(tempo) {
    var timeRep =1000 * (60/tempo);
    this.performance = window.setInterval(play, timeRep, this);
};

Orchestra.prototype.stop = function( ) {
    window.clearInterval(that.performance);
};