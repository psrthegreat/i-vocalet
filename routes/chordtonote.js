// Code From Scott Davies 2008, license by Pony-Complete, LLC. 
var Music = {
    intersect_arrays: function (a, b) { 
	// prototype's intersect is BROKEN: ignores 0 elements because 0 
	// is 'false'
	var result = [];
	b = b.uniq();
	a.uniq().each (function (x) {
		for (var i = 0; i < b.length; ++i) {
		    if (b[i] == x) { 
			result.push(x); break;
		    }
		}
	    });
	return result;
    },
    array_has_element: function(a, e) {
	for (var i = 0; i < a.length; ++i) {
	    if (a[i] == e) { return true; }
        }	
	return false;
    },
    major_scale_semitone_array: [0, 2, 4, 5, 7, 9, 11],
    major_scale_C_notes: ["C", "D", "E", "F", "G", "A", "B"],
    roman_numeral_array: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", 
                          "IX", "X", "XI", "XII"],
    C_chromatic_scale_key_to_use_flats_array: [false, // C
					       true,  // Db,
					       false, // D,
					       true,  // Eb,
					       false, // E,
					       true,  // F,
					       false, // F#,
					       false, // G,
					       true,  // Ab,
					       false, // A,
					       true,  // Bb,
					       false // B,
					       ],
    C_chromatic_scale_to_note_name_array: [
					   ["C", "C", "C"],
					   ["Db", "C#", "C#/Db"],
					   ["D", "D", "D"],
					   ["Eb", "D#", "D#/Eb"],
					   ["E", "E", "E"],
					   ["F", "F", "F"],
					   ["Gb", "F#", "F#/Gb"],
					   ["G", "G", "G"],
					   ["Ab", "G#", "G#/Ab"],
					   ["A", "A", "A"],
					   ["Bb", "A#", "A#/Bb"],
					   ["B", "B", "B"]
					   ], 
    myMod: function (n, m) {  
        // n mod m, but always returning a positive remainder
	if (n >= 0) { return n % m; }
        return (m+n)%m;
    },
    normalizedSemitoneNumber: function (sn) {
	return this.myMod(sn, 12);
    },
    normalizedMajorScaleNumber: function (msn) {
	return this.myMod(msn, 7);
    },
    majorScaleNumberAndOffsetToSemitoneNumber: function (msn, off) {
	var msn = this.normalizedMajorScaleNumber(msn);
        return this.normalizedSemitoneNumber(
          this.major_scale_semitone_array[msn] + off);
    },
    chords: [
	     [ ["maj", "major"], [0, 4, 7], "Major" ],
             [ ["m", "min", "minor"], [0, 3, 7], "Minor" ],
             [ ["7"], [0, 4, 7, 10], "Dominant Seventh" ],
	     [ ["min7", "m7", "minor7"], [0, 3, 7, 10], "Minor Seventh"],
             [ ["maj7", "Major7"], [0, 4, 7, 11], "Major Seventh"],
	     [ ["sus4", "sus"], [0, 5, 7], "Suspended Fourth"],
             [ ["7sus4", "7sus"], [0, 5, 7, 10], "Seventh Suspended Fourth"],
             [ ["6", "maj6", "major6"], [0, 4, 7, 9], "Sixth"],
	     [ ["min6", "m6", "minor6"], [0, 3, 7, 9], "Minor Sixth"],
             [ ["dim", "dim7", "diminished", "o"], [0, 3, 6], 
               "Diminished Seventh"],
	     [ ["aug", "+", "augmented"], [0, 4, 8], "Augmented"],
             [ ["7-5", "7b5"], [0, 4, 6, 10], "Seventh Diminished Fifth"],
             [ ["7+5", "7#5"], [0, 4, 8, 10], "Seventh Augmented Fifth"],
             [ ["m7-5", "m7b5", "0"], [0, 3, 6, 10], "Half Diminished Seventh"],
	     [ ["m/maj7"], [0, 3, 7, 11], "Minor/Major Seventh"], 
	     [ ["maj7+5", "maj7#5"], [0, 4, 8, 11], "Major Seventh Augmented Fifth"],
             [ ["maj7-5", "maj7b5"], [0, 4, 6, 11], "Major Seventh Diminished Fifth"],
	     [ ["9"], [0, 4, 7, 10, 14], "Ninth" ],
	     [ ["m9"], [0, 3, 7, 10, 14], "Minor Ninth"],   
             [ ["maj9"], [0, 4, 7, 11, 14], "Major Ninth"],
	     [ ["7+9", "7#9"], [0, 4, 7, 10, 15], "Seventh Augmented Ninth"],
             [ ["7-9", "7b9"], [0, 4, 7, 10, 13], "Seventh Diminished Ninth"],
	     [ ["7+9-5", "7#9b5"], [0, 4, 6, 10, 15], 
	       "Seventh Augmented Ninth Diminished Fifth"],
             [ ["6/9", "69"], [0, 4, 7, 9, 14], "Sixth/Ninth"],
             [ ["9+5", "9#5"], [0, 4, 8, 10, 14], "Ninth Augmented Fifth"],
             [ ["9-5", "9b5"], [0, 4, 6, 10, 14], "Ninth Diminished Fifth"],
	     [ ["m9-5", "m9b5"], [0, 3, 6, 10, 14], 
               "Minor Ninth Diminished Fifth"],
	     [ ["11"], [0, 4, 7, 10, 14, 17], "Eleventh"],
	     [ ["m11"], [0, 3, 7, 10, 14, 17], "Minor Eleventh"],
             [ ["11-9", "11b9"], [0, 4, 7, 10, 13, 17], 
               "Eleventh Diminished Ninth"],
             [ ["13"], [0, 4, 7, 10, 14, 17, 21], "Thirteenth"],
             [ ["m13"], [0, 3, 7, 10, 14, 17, 21], "Minor Thirteenth"],
             [ ["maj13"], [0, 4, 7, 11, 14, 17, 21], "Major Thirteenth"],
             [ ["add9", "(add9)"], [0, 4, 7, 14], "Major (Add Ninth)" ],
             [ ["madd9", "m(add9)"], [0, 3, 7, 14], "Minor (Add Ninth)"],
             [ ["sus2"], [0, 2, 7], "Suspended Second" ],
	     [ ["5"], [0, 7], "Power Chord" ]
    ],
    scales: [
	     [ ["Major", "Ionian"], [0, 2, 4, 5, 7, 9, 11] ],
	     [ ["natural minor", "Aeolian"], 
	       [0, 2, 3, 5, 7, 8, 10] ],
	     [ ["harmonic minor", "Mohammedan"], [0, 2, 3, 5, 7, 8, 11] ],
	     [ ["melodic minor"], [0, 2, 3, 5, 7, 9, 11] ],
	     [ ["major pentatonic"], [0, 2, 4, 7, 9] ],
	     [ ["minor pentatonic"], [0, 3, 5, 7, 10] ],
             [ ["blues"], [0, 3, 5, 6, 7, 10] ],
             [ ["minor blues"], [0, 2, 3, 5, 6, 7, 8, 10] ],
	     [ ["major blues"], [0, 2, 3, 4, 5, 6, 7, 9, 10] ],
	     [ ["augmented", "whole tone"], [0, 2, 4, 6, 8, 10] ],
	     [ ["diminished"], [0, 2, 3, 5, 6, 8, 9, 11] ],
	     [ ["Phrygian-Dominant", "major Phrygian", "Spanish-flamenco"], 
	       [0, 1, 4, 5, 7, 8, 10] ],
	     [ ["Dorian"], [0, 2, 3, 5, 7, 9, 10] ],
	     [ ["Phrygian"], [0, 1, 3, 5, 7, 8, 10] ],
	     [ ["Lydian"], [0, 2, 4, 6, 7, 9, 11] ],
	     [ ["Mixolydian"], [0, 2, 4, 5, 7, 9, 10] ],
	     [ ["Locrian"], [0, 1, 3, 5, 6, 8, 10] ],
             [ ["jazz melodic minor"], [0, 2, 3, 5, 7, 9, 11] ],
	     [ ["Dorian b2"], [0, 1, 3, 5, 7, 9, 10] ],
	     [ ["Lydian augmented"], [0, 2, 4, 6, 8, 9, 11] ],
	     [ ["Lydian b7", "overture"], [0, 2, 4, 6, 7, 9, 10] ],
	     [ ["Mixolydian b13", "Hindu"], [0, 2, 4, 5, 7, 8, 10] ],
	     [ ["Locrian #2"], [0, 2, 3, 5, 6, 8, 10] ],
	     [ ["super Locrian", "altered"], [0, 1, 3, 4, 6, 8, 10] ],
	     [ ["whole half diminished"], [0, 2, 3, 5, 6, 8, 9, 11] ],
	     [ ["half whole diminished"], [0, 1, 3, 4, 6, 7, 9, 10] ],
	     [ ["enigmatic"], [0, 1, 4, 6, 8, 10, 11] ],
	     [ ["double harmonic", "gypsy", "Byzantine"],
	       [0, 1, 4, 5, 7, 8, 11] ],
	     [ ["Hungarian minor"], [0, 2, 3, 6, 7, 8, 11]],
	     [ ["Persian"], [0, 1, 4, 5, 6, 8, 11] ],
	     [ ["Arabian", "major Locrian"], [0, 2, 4, 5, 6, 8, 10] ],
	     [ ["Japanese"], [0, 1, 5, 7, 8] ],
	     [ ["Egyptian"], [0, 2, 5, 7, 10] ],
	     [ ["Hirajoshi"], [0, 2, 3, 7, 8] ]
             // ,  [ ["chromatic"], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]]
	     
    ],
    sortSemitonesWithGivenRoot: function (arr, root) {
	var m = this;
	return arr.map (function (x) {
		return m.normalizedSemitoneNumber(x-root);}).
            sort( function (a, b) { return a-b; }).
  	    map (function (x) { return m.normalizedSemitoneNumber(x+root); });
    },
    chordSuffixToSemitoneNumbers: function (str, case_insensitive) {
	for (var i = 0; i < this.chords.length; ++i) {
	    var names = this.chords[i][0];
	    for (var j = 0; j < names.length; ++j) {
		var name = names[j];
		if (name == str || 
		    (case_insensitive &&
		     (name.toLowerCase() == str.toLowerCase()))) { 
		    return this.chords[i][1]; 
		}
	    }
        }
	if (!case_insensitive) {
	    return this.chordSuffixToSemitoneNumbers(str, true);
        } else {
	    return null;
	}
    },
    noteOrChordNameToCSemitoneNumberAndSuffix: function (str) {
	var nn = str.slice(0,1).toUpperCase();
	var csn = undefined;
	for (var i = 0; i < this.major_scale_C_notes.length; ++i) {
	    if (nn == this.major_scale_C_notes[i]) {
		csn = this.major_scale_semitone_array[i];
		break;
            }
        }
	if (i >= this.major_scale_C_notes.length) {
	    return null;
	}
	if (str.length == 1) {
	    return [csn, ""];
	}
	for (var i = 1; i < str.length; ++i) {
	    if (str.charAt(i) == '#') { csn++; }
	    else if (str.charAt(i) == 'b') { csn--; }
            else if (str.charAt(i) == '/') {
                ++i; // past '/'
                if (i >= str.length) { return null; }
                var nn2 = str.charAt(i).toUpperCase();
                var csn2 = undefined;
                for (var j = 0; j < this.major_scale_C_notes.length; ++j) {
                    if (nn2 == this.major_scale_C_notes[j]) {
                        csn2 = this.major_scale_semitone_array[j];
                        break;
                    }
		}
                if (j >= this.major_scale_C_notes.length) { return null; }
                ++i; // past natural note name
                for (var j = i; j < str.length; ++j) {
                    if (str.charAt(j) == '#') { csn2++; }
                    else if (str.charAt(j) == 'b') { csn2--; }
                    else break;
                }
                if (csn != csn2) { return null; }
                return [csn, str.slice(j, 100000000)];
            } else {
		return [csn, str.slice(i, 100000000)];
	    }
	}
	return [csn, ""];
    },
    noteOrChordNameToCSemitoneNumberAndSemitoneNumbers: function (str, default_to_notes) {
	var t = this.noteOrChordNameToCSemitoneNumberAndSuffix(str);
	if (!t) { 
	    return null;
	    throw("Unrecognized note or chord name: " + str + ".");
	}
        var note_is_lower_case = (str.charAt(0) == str.charAt(0).toLowerCase());
	if ((default_to_notes || note_is_lower_case) && t[1] == "") {
	    return [t[0], [0]];
	}
	var semitones = this.chordSuffixToSemitoneNumbers(t[1]);
	if (!semitones) {
	    return null;
	    throw("Unrecognized note or chord name: " + str + ".");
        }
	return [t[0], this.chordSuffixToSemitoneNumbers(t[1])];
    },
    noteOrChordNameToCSemitoneNumbers: function (str, default_to_notes) {
	var t = this.noteOrChordNameToCSemitoneNumberAndSemitoneNumbers(str, default_to_notes);
	if (!t) { return t; }
	var m = this;
	var result = t[1].map (function (x) { 
		return Music.normalizedSemitoneNumber(x + t[0]);
	    });
	return result;
    },
    splitNames: function (str) {
	return str.split(/[\s,]+/).filter(function(x){return x;});
    },
    noteOrChordNameToNoteNames: function (str, default_to_notes) {
	var t = this.noteOrChordNameToCSemitoneNumberAndSemitoneNumbers(str, default_to_notes);
	if (!t) { return t; }
	var c_semi = this.normalizedSemitoneNumber(t[0]);
	var m = this;
	return t[1].map (function (x) {
		var x_c_semi = m.normalizedSemitoneNumber(x + c_semi);
		var name = m.C_chromatic_scale_to_note_name_array[
                  x_c_semi][2];
                return name;
	    });
    },
    noteOrChordNamesStringToNoteNames: function (str, default_to_notes) {
	var names = this.splitNames(str);
        var m = this;
	return names.map (function (n) { return m.noteOrChordNameToNoteNames(n, default_to_notes);});
    },
    noteOrChordNamesStringToCSemitoneNumbers: function (str, default_to_notes) {
	var names = this.splitNames(str);
        var m = this;
        var result = names.map (function (n) { return Music.noteOrChordNameToCSemitoneNumbers(n, default_to_notes);});
        return result;
    },
    semitoneSequencesConsistentWithTarget: function (target, sequences, 
                                                     root_c_semitone) {
	target = target.uniq();
	var results = [];
        var m = this;
	sequences.each (function (s) {
                if (root_c_semitone >= 0 && s[1][0] != root_c_semitone) {
		    return;
                }
		var intersection = m.intersect_arrays(target, s[1])
		if (intersection.length == target.length) {
		    results.push(s);
		}
	    });
	return results;
    },
    semitoneSequencesContainedByTarget: function (target, sequences,
						  root_c_semitone) {
	target = target.uniq();
	var results = [];
	var m = this;
	sequences.each (function (s) {
		if (root_c_semitone >= 0 && s[1][0] != root_c_semitone) {
		    return;
		}
		var intersection = m.intersect_arrays(target, s[1])
		if (intersection.length == s[1].length) {
		    results.push(s);
		}
	    });
	return results;
    },
    noteOrChordNamesStringToConsistentScales: function(str, default_to_notes, 
                                                       root_c_semitone) {
	return this.semitoneSequencesConsistentWithTarget(this.noteOrChordNamesStringToCSemitoneNumbers(str, default_to_notes).flatten().uniq(), this.c_semitone_scales, root_c_semitone);
    },
    noteOrChordNamesStringToConsistentScaleNames: function(str, default_to_notes, 
                                                           root_c_semitone) {
	return this.semitoneSequencesConsistentWithTarget(this.noteOrChordNamesStringToCSemitoneNumbers(str, default_to_notes).flatten().uniq(), this.c_semitone_scales, root_c_semitone).map (function (x) { return x[0][0]});
    },
    noteOrChordNamesStringToConsistentChords: function (str, default_to_notes,
							root_c_semitone) {
	return this.semitoneSequencesConsistentWithTarget(this.noteOrChordNamesStringToCSemitoneNumbers(str, default_to_notes).flatten().uniq(), this.c_semitone_chords, root_c_semitone);
    },
    noteOrChordNamesStringToSubsetScales: function(str, default_to_notes, 
						   root_c_semitone) {
	return this.semitoneSequencesContainedByTarget(this.noteOrChordNamesStringToCSemitoneNumbers(str, default_to_notes).flatten().uniq(), this.c_semitone_scales, root_c_semitone);
    },
    noteOrChordNamesStringToSubsetChords: function(str, default_to_notes, 
						   root_c_semitone) {
        return this.semitoneSequencesContainedByTarget(this.noteOrChordNamesStringToCSemitoneNumbers(str, default_to_notes).flatten().uniq(), this.c_semitone_chords, root_c_semitone);
    }
};

Music.c_semitone_chords = [];
Music.chords.forEach (function (c) {
	for (var i = 0; i < 12; ++i) {
	    var rootname = Music.C_chromatic_scale_to_note_name_array[i][0];
            chord_names = c[0]
	    var semitones = c[1].map (function (s) {
		    return Music.normalizedSemitoneNumber(i + s);
		});
	    Music.c_semitone_chords.push([chord_names, semitones, c[1], c[2]]);
	}
    });

var i = 0;
Music.c_semitone_chords.forEach (function (c) {
	c[4] = i++;
    });

Music.c_semitone_scales = [];
Music.scales.forEach (function (scale) {
	for (var i = 0; i < 12; ++i) {
	    var use_flats = Music.C_chromatic_scale_key_to_use_flats_array[i];
	    var rootname = Music.C_chromatic_scale_to_note_name_array[i][2];
	    scale_names = scale[0]
	    var semitones = scale[1].map (function(s) {
		    return Music.normalizedSemitoneNumber(i + s);
		});
	    Music.c_semitone_scales.push([scale_names, semitones, scale[1]]);
	}
    });

var i = 0;
Music.c_semitone_scales.forEach (function(c) {
	c[3] = i++;
    });

exports.convert = function(query){
    if(query.length === 1){
        query += "maj";
    }
    if(query.length === 2){
        if(query[1] === "#" || query[1] === "b") query +="maj";
    }
    var notes = Music.noteOrChordNamesStringToCSemitoneNumbers(query, true);
    return notes;
}

exports.getLatinBase = function(query){
	return C_chromatic_scale_to_note_name_array[query][0];
}
