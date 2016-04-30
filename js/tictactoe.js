//Global Variables
var painted;
var content;
var winningCombinations;
var turn = 0;
var theCanvas;
var c;
var cxt;
var squaresFilled = 0;
var w;
var y;
var finished = 0;
var difficulte = 2;

//Instanciate Arrays
window.onload = function () {

	painted = new Array();
    content = new Array();
	IA = new Array();
    winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
	
    playAgain();
	
}

//Game methods
function canvasClicked(canvasNumber) {
    theCanvas = "canvas" + canvasNumber;
	canvasNumber--;
    c = document.getElementById(theCanvas);
	canvasSize = c.width;
	canvasPercentage = 0.60;
    cxt = c.getContext("2d");
	var symbol;
	var fini = false;

    if (painted[canvasNumber] == false && finished == 0) {
        if (turn % 2 == 0) {
            cxt.beginPath();
            cxt.moveTo(canvasSize*(1-canvasPercentage)/2, canvasSize*(1-canvasPercentage)/2);
            cxt.lineTo(canvasSize*((1-canvasPercentage)/2+canvasPercentage), canvasSize*((1-canvasPercentage)/2+canvasPercentage));
            cxt.moveTo(canvasSize*((1-canvasPercentage)/2+canvasPercentage), canvasSize*(1-canvasPercentage)/2);
            cxt.lineTo(canvasSize*(1-canvasPercentage)/2, canvasSize*((1-canvasPercentage)/2+canvasPercentage));
			cxt.lineWidth = canvasSize*0.05;
			cxt.strokeStyle = 'darkgrey';
            cxt.stroke();
            cxt.closePath();
            symbol = 'X';
        } else {
			cxt.beginPath();
            cxt.arc(canvasSize/2, canvasSize/2, canvasSize*canvasPercentage/2, 0, Math.PI*2);
			cxt.lineWidth = canvasSize*0.05;
			cxt.strokeStyle = 'darkgrey';
            cxt.stroke();
            cxt.closePath();
            symbol = 'O';
        }

		content[canvasNumber] = symbol;
		
        turn++;
        painted[canvasNumber] = true;
        squaresFilled++;
		if ( squaresFilled == 5 ) {
			$('#playAgain').fadeIn(3000);
		}
        fini = checkForWinners(symbol, false);

        if (fini == false && squaresFilled == 9) {
        	$('#nothing').fadeIn(1000);
        } else if ( symbol == 'X' ) {
			//console.log("L'IA joue...");
			for (var l = 0; l <= 8; l++) {
				IA[l] = 0;
			}
			if ( turn == 1 ) {
				var caseTemp = Math.floor(Math.random() * 8)+1;
				if ( painted[caseTemp] == false ) {
					canvasClicked(caseTemp);
				} else {
					faireJouerIA( 'O', 0 );
				}
			} else {
				faireJouerIA( 'O', 0 );
			}
		}

    } else {
        //alert("Déjà pris !");
    }

}

function faireJouerIA( symbol, nombreTour ) {
	if ( difficulte == 1 ) {
		faireJouerIA_moyen( symbol, nombreTour );
	} else if ( difficulte == 2 ) {
		faireJouerIA_difficile( symbol, nombreTour );
	}
}


function faireJouerIA_moyen( symbol, nombreTour ) {
	
	var meilleurScore = -1000000;
	var caseAJouer = 0;
	var score = 0;
	
	for (var i = 0; i < painted.length; i++ ) {
		if ( content[i] == '' ) {
			content[i] = symbol;
			squaresFilled ++;
			if ( squaresFilled < 9 ) {
				if ( symbol == 'O' ) {
					IA[i] += faireJouerIA_moyen( 'X', nombreTour+1 );
					if ( checkForWinners('O', true) == true ) {
						score += 1*(9-squaresFilled);
					}
				} else {
					IA[i] -= faireJouerIA_moyen( 'O', nombreTour+1 );
					if ( checkForWinners('X', true) == true ) {
						score -= 1*(9-squaresFilled);
					}
				}
			}
			content[i] = '';
			squaresFilled --;
			
		}
	}

	if (nombreTour == 0) {
		for (var i = 0; i < painted.length; i++ ) {
			if ( content[i] == '' && IA[i] > meilleurScore ) {
				meilleurScore = IA[i];
				caseAJouer = i;
			}
		}
		//console.log(meilleurScore);
		canvasClicked(caseAJouer+1);
	} else {
		return score;
	}

}

function faireJouerIA_difficile( symbol, nombreTour ) {
	
	var meilleurScore = -1000000;
	var caseAJouer = -1;
	var score = 0;
	
	if ( nombreTour == 0 ) {
		for (var i = 0; i < painted.length; i++ ) {
			if ( caseAJouer == -1 && content[i] == '' ) {
				content[i] = 'O';
				if ( checkForWinners('O', true) == true ) {
					caseAJouer = i;
				}
				content[i] = '';
			}
		}
		if ( caseAJouer != -1 ) {
			canvasClicked(caseAJouer+1);
			return;
		}
	
		for (var i = 0; i < painted.length; i++ ) {
			if ( caseAJouer == -1 && content[i] == '' ) {
				content[i] = 'X';
				if ( checkForWinners('X', true) == true ) {
					caseAJouer = i;
				}
				content[i] = '';
			}
		}
		if ( caseAJouer != -1 ) {
			canvasClicked(caseAJouer+1);
			return;
		}
	} else {
		for (var i = 0; i < painted.length; i++ ) {
			if ( content[i] == '' ) {
				content[i] = symbol;
				squaresFilled ++;
				if ( squaresFilled < 9 ) {
					if ( symbol == 'O' ) {
						IA[i] += faireJouerIA_difficile( 'X', nombreTour+1 );
						if ( checkForWinners('O', true) == true ) {
							score += 1*(9-squaresFilled);
						}
					} else {
						IA[i] -= faireJouerIA_difficile( 'O', nombreTour+1 );
						if ( checkForWinners('X', true) == true ) {
							score -= 1*(9-squaresFilled);
						}
					}
				}
				content[i] = '';
				squaresFilled --;
				
			}
		}
	}

	if (nombreTour == 0) {
		for (var i = 0; i < painted.length; i++ ) {
			if ( content[i] == '' && IA[i] > meilleurScore ) {
				meilleurScore = IA[i];
				caseAJouer = i;
			}
		}
		//console.log(meilleurScore);
		canvasClicked(caseAJouer+1);
	} else {
		return score;
	}

}



function checkForWinners(symbol, testIA) {
	for (var a = 0; a < winningCombinations.length; a++) {
        if ( content[winningCombinations[a][0]] == symbol && content[winningCombinations[a][1]] == symbol && content[winningCombinations[a][2]] == symbol ) {
			//console.log("Gagnant trouvé : "+ symbol);
			if ( testIA == false ) {
				afficherFinMatch( symbol );
				return true;
			} else {
				return true;
			}
        }
    }
	return false;
}

function afficherFinMatch(symbol) {
	if ( symbol == 'X' ) {
		$('#winner').fadeIn(1000);
	} else {
		$('#looser').fadeIn(1000);
	}
	finished = 1;
}

function playAgain() {
	turn = 0;
	squaresFilled = 0;
	finished = 0;
	
	$('#winner').fadeOut(1000);
	$('#looser').fadeOut(1000);
	$('#nothing').fadeOut(1000);
	$('#playAgain').fadeOut(1000);
	
	console.log("Reset !");
	for (var i = 1; i <= painted.length; i++ ) {
		theCanvas = "canvas" + i ;
		c = document.getElementById(theCanvas);
		canvasSize = c.width;
		cxt = c.getContext("2d");
		cxt.clearRect(0, 0, canvasSize, canvasSize);
	}
	
	for (var l = 0; l <= 8; l++) {
        painted[l] = false;
        content[l] = '';
		IA[l] = 0;
    }
	
	if ( Math.random() < 0.5 ) {
		turn ++;
		canvasClicked(Math.floor(Math.random() * 8)+1);
	}
}
