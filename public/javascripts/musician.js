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