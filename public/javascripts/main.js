var ivocalet = new Ivocalet(Synth);
ivocalet.init( );
var orchestra = new Orchestra( );
//orchestra.start(200);
var m1 = new Musician('piano', [0,1,2], orchestra);
orchestra.addMusician(m1);

var newObj = {};
for(var i = 0; i < notes.length; i++){
	var noteObj = notes[i];
	var note = Object.keys(noteObj)[0];
	var baseOctave = 4;
	newObj[note] = noteObj[note].map(function(elem){
		var octave = baseOctave + Math.floor(elem/12);
		return NOTES[elem%12] + octave;
	});
}

$('.chord').click(function(){
	var chordName = $(this).text();
	var notesInChord = newObj[chordName];
	orchestra.changeState(notesInChord);
	//orchestra.stop();
	orchestra.start(60);
});
	

/*
    var all_notes = [[["C4"], ["E4"], ["G4"], ["C5"], ["G4"], ["E4"]],[["C3","E3", "G3"], [], [], [], [], []]];
    
    var m2 = new Musician('piano', all_notes[1]);
*/