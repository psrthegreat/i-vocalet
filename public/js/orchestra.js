var Orchestra = function( ) { 

};

Orchestra.prototype.start = function( ) { 
	
    var musician_piano = new Musician(Synth,'piano', []);
    var cycle_time = musician_piano.arpeggio( );
    // console.log(cycle_time);
    var t1 = window.setInterval(function( ){
      musician_piano.arpeggio( );
    }, cycle_time);


    
    var musician_organ = new Musician(Synth, 'organ', [ ]);
    var t2 = window.setInterval(function( ){
    	musician_organ.triad( );
    }, 3000);

    
    

    
    var musician_acoustic_guitar = new Musician(Synth, 'acoustic', []);
    var t3 = window.setInterval(function( ){
    	musician_acoustic_guitar.bass( );	
    }, 3000);
    
    
};