var newGameBtn = document.getElementById('js-newGameButton'),
	newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');
    pickRock = document.getElementById('js-playerPick_rock'),
    pickPaper = document.getElementById('js-playerPick_paper'),
    pickScissors = document.getElementById('js-playerPick_scissors'),
    playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints'),
    playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };    

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

function setGameElements() {
  	switch(gameState) {
    	case 'started':
        	newGameElem.style.display = 'none';
        	pickElem.style.display = 'block';
        	resultsElem.style.display = 'block';
        	playerPickElem.innerHTML = 'Wybór gracza';
        	computerPickElem.innerHTML = 'Wybór komputera';
        	playerResultElem.innerHTML = 'Wynik gracza';
        	computerResultElem.innerHTML = 'Wynik komputer';
      		break;
    	case 'ended':
        	newGameBtn.innerText = 'Jeszcze raz';
        	newGameElem.style.display = 'block';
        	pickElem.style.display = 'none';
        	break;
    	case 'notStarted':
    	default:
        	newGameElem.style.display = 'block';
        	pickElem.style.display = 'none';
        	resultsElem.style.display = 'none';
  	}
}

function newGame() {
	player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
  	if (player.name) {
    	player.score = computer.score = 0;
    	gameState = 'started';
    	setGameElements();

    	playerNameElem.innerHTML = player.name;
    	setGamePoints();
  	}
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    setGamePoints();
    ifWon();
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
  	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  	var winnerIs = 'player';

    if (playerPick == computerPick) {
    	winnerIs = 'noone'; // remis
    } 
    else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock') ) {
        
        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Wygrana!";
        player.score++;
    } 
    else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
    }
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function ifWon(){
	if (player.score == 10) {
		gameState = "ended";
		alert('Wygrał ' + player.name);
		setGameElements();
	}
	else if (computer.score == 10) {
		gameState = "ended";
		alert('Wygrał komputer');
		setGameElements();
	}
}