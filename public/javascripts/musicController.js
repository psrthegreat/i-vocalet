var musicApp = angular.module('musicApp',[]);

musicApp.controller('musicJSONController', ['$scope','$http','$sce', function ($scope, $http, $sce){
	
	$http.get("http://localhost:3000/musicJSON").success(function(response){
		$scope.chords = response.chords;
		$scope.notes = response.notes;
		$scope.body = response.body;
		$scope.query = response.query;
		$scope.NOTES = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
		$scope.explicitlyTrustedHtml = $sce.trustAsHtml(String($scope.body));
		$scope.searchForm = {};
		$scope.searchForm.title = "Nothing Else Matters";

		$scope.searchForm.submitTheForm = function(){
			console.log("--> Submitting searchForm");
		}

		$scope.playChord = function(chord){
			console.log(chord);

			$scope.notes.forEach(function(noteObject){
				for (var key in noteObject){
					if (key == chord) {
						var notesIndex = noteObject[key];
						notesIndex.forEach(function(noteIndex){
							var note = $scope.NOTES[noteIndex%12];
							Synth.play('piano',note,4,2);
						});
						return;
					}
				}
			});
		}
	});

	
}]);





