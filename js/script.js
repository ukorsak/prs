var newGameBtn = document.getElementById('js-newGameButton'),
	continueBtn = document.getElementById('js-continueButton'),
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
    computerResultElem = document.getElementById('js-computerResult'),
    inputName = document.getElementById('js-inputName');

var gameState = 'notStarted',  //started // ended
    player = {
        name: 'imię',
        score: 0
    },
    computer = {
        score: 0
    };    

newGameBtn.addEventListener('click', playerName);
continueBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock','kamień') });
pickPaper.addEventListener('click', function() { playerPick('paper','papier') });
pickScissors.addEventListener('click', function() { playerPick('scissors','nożyczki') });

function setGameElements() {
  	switch(gameState) {
    	case 'started':
            playerPointsElem.style.background = '#777';
            computerPointsElem.style.background = '#777';
        	newGameElem.style.display = 'none';
        	pickElem.style.display = 'block';
        	resultsElem.style.display = 'block';
        	playerPickElem.innerHTML = 'Wybór gracza';
        	computerPickElem.innerHTML = 'Wybór komputera';
        	playerResultElem.innerHTML = 'Wynik gracza';
        	computerResultElem.innerHTML = 'Wynik komputer';
      		break;
    	case 'ended':
        	continueBtn.innerText = 'Jeszcze raz';
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

function playerName() {
	newGameBtn.style.display = 'none';
	inputName.style.display = 'inline';
	continueBtn.style.display = 'inline';
}

function newGame() {
	player.name = document.getElementById('js-inputName').value;
  	if (player.name) {
    	player.score = computer.score = 0;
    	gameState = 'started';
    	setGameElements();

    	playerNameElem.innerHTML = player.name;
    	setGamePoints();
  	}
}

function playerPick(playerPick, playerPickPL) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPickPL;
    computerPickElem.innerHTML = computerPick.pl;

    checkRoundWinner(playerPick, computerPick.en);
    setGamePoints();
    ifWon();
}

function getComputerPick() {
    var possiblePicks = [{en: 'rock', pl: 'kamien'}, {en: 'paper', pl: 'papier'}, {en: 'scissors', pl: 'nożyczki'}];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
  	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

  	var winnerIs = 'player';

    if (playerPick == computerPick) {
    	winnerIs = 'noone'; // remis
        playerPointsElem.style.background = '#777';
        computerPointsElem.style.background = '#777';
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
        playerPointsElem.style.background = '#00FF00';
        computerPointsElem.style.background = '#777';
    } 
    else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Wygrana!";
        computer.score++;
        playerPointsElem.style.background = '#777';
        computerPointsElem.style.background = '#00FF00';
    }
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function ifWon(){
	if (player.score == 10) {
		gameState = "ended";
		playerPointsElem.style.background = '#0000FF';
		computerPointsElem.style.background = '#777';
		alert('Wygrał ' + player.name);
		setGameElements();
	}
	else if (computer.score == 10) {
		gameState = "ended";
		playerPointsElem.style.background = '#777';
		computerPointsElem.style.background = '#0000FF';
		alert('Wygrał komputer');
		setGameElements();
	}
}