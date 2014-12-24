var Orchestra = function( ) { 
	this.t1 = 0;
	this.t2 = 0;
	this.t3 = 0;
};

Orchestra.prototype.start = function( ) { 
	
    var musician_piano = new Musician(Synth,'piano', []);
    musician_piano.setArpeggioTempo();   
    this.t1 = window.setInterval(function( ){
      musician_piano.arpeggio();
    },musician_piano.arpeggio_tempo);
	

    
    var musician_organ = new Musician(Synth, 'organ', [ ]);
    musician_organ.setTriadTempo(3);
    //console.log(musician_organ.triad_tempo);
    
    this.t2 = window.setInterval(function( ){
    	musician_organ.triad( );
    }, musician_organ.triad_tempo);
	

    
    var musician_acoustic_guitar = new Musician(Synth, 'acoustic', []);
    //console.log(musician_acoustic_guitar.bass_tempo);
    musician_acoustic_guitar.setBassTempo(3);
    this.t3 = window.setInterval(function( ){
    	musician_acoustic_guitar.bass( );	
    }, musician_acoustic_guitar.bass_tempo);
    
    
};

Orchestra.prototype.stop = function( ) {
	var that = this;
	window.clearInterval(that.t1);
	window.clearInterval(that.t2);
	window.clearInterval(that.t3);

};