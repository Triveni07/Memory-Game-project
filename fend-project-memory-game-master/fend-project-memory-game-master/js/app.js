
//Creates cards and stars html and adds to document
createHtml();

//Starts and restarts the Game
const startButton = document.querySelector('.play');
startButton.addEventListener('click', startGame, {once: true});

restartGame();

//Global variable declaration to stop the timer
var intervalID;

//Function to be called to display cards
function startGame(){
	//Timer starts once html is ready and game starts
	updateTimer();
	const deck = document.querySelector('.deck');
	const cardsList = deck.querySelectorAll('.card'); //list that holds all the cards
	const cardsArray = Array.from(cardsList);     // List to array conversion
	const shuffledArray = shuffle(cardsArray); // Shuffled cards using shuffle method

	let moveCounter = -1;
	moveCounter = displayMovesCount(moveCounter);
	resetDeckwithShuffledCards(deck,shuffledArray); //Updating existing deck with shuffled cards

	//Handling click on each card
	respondToClick(deck,shuffledArray);
}

//Function that creates all cards and stars html dynamically and return the same
function createHtml(){	
	//Creates stars html part on web page
	const starsTag = document.querySelector('.stars');
	for(let i = 1; i <= 3; i++){
		const liTag = document.createElement('li');
		const iTag = document.createElement('i');
		iTag.className = 'fa fa-star';
		liTag.appendChild(iTag);
		starsTag.appendChild(liTag);
	}

	//Creates cards html on the web page
	const ulTag = document.querySelector('.deck');
	//Array holding cards classnames
	const cardClassNamesArray = ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o', 'fa fa-paper-plane-o',
		'fa fa-anchor', 'fa fa-anchor','fa fa-bolt','fa fa-bolt', 
		'fa fa-cube','fa fa-cube', 'fa fa-leaf','fa fa-leaf', 
		'fa fa-bicycle','fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];
	//Loop to create, set classname accordingly and append html fragments to deck
	for(let i = 0; i < cardClassNamesArray.length; i++){
		const liTag = document.createElement('li');
		liTag.className = 'card';	
		const iTag = document.createElement('i');
		iTag.className = cardClassNamesArray[i];
		liTag.appendChild(iTag);
		ulTag.appendChild(liTag);
	}
}

/*
 * This function updates time in seconds and minutes after the interval set 
 * i.e. every second seconds gets updated and after 60 secs minute gets updated
 */
function updateTimer(){
	let minutes = 0;
	let seconds = 0;
	intervalID  = setInterval(function(){
		seconds += 1;
		if (seconds === 60){
			seconds = 0;
			minutes += 1;
		}
		displayTimer(minutes,seconds);
	}, 1000);
	return intervalID ;
}

//Stops the timer and returns timer reading
function stopTheTimer(intervalID ){
	clearInterval(intervalID );
	const timerSlot = document.querySelector('.score-panel .timer');
	const totalTimerReading = timerSlot.innerText;	
	return totalTimerReading;				
}

//Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function resetDeckwithShuffledCards(deck,shuffledArray){
	const fragment = document.createDocumentFragment();
	for(let i = 0; i < shuffledArray.length; i++){
		fragment.appendChild(shuffledArray[i]);
	}	
	return deck.appendChild(fragment);
}

function respondToClick(deck,shuffledArray){
	let moveCounter = 0;
	let clickCounter = 0;
	var startTime = 0;

	for(const card of shuffledArray){
		card.addEventListener('click', function (event){
			clickCounter++;			
			if(clickCounter === 1) {
				startTime = performance.now();		
			}
			if (card.className === "card"){
				//checks and returns if any other card is already open		
				const openCard = deck.querySelector('.card.open.show');
				//open and shows the card onclick		
				card.className = "card open show";
				//If any other card is already open then check for matching and set the status		
				if(openCard !== null){
					//calculateMoves(openCard,card,moveCounter);
					moveCounter = displayMovesCount(moveCounter);
					updateStarRating(moveCounter);
					checkIfMatching(openCard,card);
					const matchedCardsList = deck.querySelectorAll('.card.match');
					if(matchedCardsList !== null && 
							matchedCardsList.length === shuffledArray.length){				
						setTimeout(function(){
							const timerString = stopTheTimer(intervalID );
							displayResultMessage(moveCounter,startTime, timerString);
						}, 100);
					}
				} 
			}
		});
	}
}

function checkIfMatching(openCard,card) {
	//If matches found set the status to match
	if(openCard.firstElementChild.className === card.firstElementChild.className) {
		setMatched(openCard,card);
		//Not matched show unmatched and close the card after some time
	} else {
		setUnmatched(openCard,card);
	}
}

function setMatched(openCard,card) {
	card.className = 'card match';
	openCard.className = 'card match';	
}

function setUnmatched(openCard,card) {
	card.className = 'card unmatch';
	openCard.className = 'card unmatch';
	setTimeout(function(){
		card.className = 'card';
		openCard.className = 'card';
	}, 700);
}


function calculateTotalTimeTaken(startTime){
	var endTime = 0;
	var timeTaken = 0;
	endTime = performance.now();						 
	timeTaken = Math.round((endTime - startTime) / 1000);
	return timeTaken;
}
//Calculating time taken to complete the game and total number of moves
function calculateFinalScore(moveCounter,startTime){
	const totalTime = calculateTotalTimeTaken(startTime);
	const finalScore =  precisionRound(500000 / (totalTime * (moveCounter-8)),-2);
	return finalScore;
}

//Displays result with Game score
function displayResultMessage(moveCounter, startTime, timerString){
	const score = calculateFinalScore(moveCounter, startTime);
	displayScore(score);
	const stars = document.querySelectorAll('.score-panel .stars>li');
	window.alert(`Congratulations! You have won the Game in ${timerString} time with score ${score} and ${stars.length} stars`);
	window.alert(`Do you want to play again? Click restart...`);
	//window.location.reload(true);
}

//Calculates and displays moves count on web page and returns moveCounter 
function displayMovesCount(moveCounter){
	const movesCount = document.querySelector('.score-panel .moves');
	movesCount.innerText = ++moveCounter;
	return moveCounter;
}

//Displays final score on page
function displayScore(finalScore){
	const scoreDisplay = document.querySelector('.score-panel .score');
	scoreDisplay.innerText = finalScore;
	return finalScore;
}

//Function to display timer in min:sec format
function displayTimer(minutes,seconds){
	const timerSlot = document.querySelector('.score-panel .timer');
	var min = '00';
	var sec = '00';
	if (seconds < 10)
		sec = '0' + seconds;
	else
		sec = seconds;
	if (minutes < 10)
		min = '0' + minutes;
	else
		min = minutes;

	timerSlot.innerText = min + ':' + sec;
}

//Updates star rating while playing the game
function updateStarRating(moveCounter){
	//To remove element for decreasing star 
	const starRatingUl = document.querySelector('.score-panel .stars');
	const starRatingLi = document.querySelectorAll('.score-panel .stars>li');

	//Removing stars and displaying on page on condition
	if(moveCounter === 15){
		starRatingUl.removeChild(starRatingLi[0]);
	}else if(moveCounter === 20){
		starRatingUl.removeChild(starRatingLi[0]);
	}
}

//Rounds upto given power and returns number
function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);
	return Math.round(number * factor) / factor;
}

//Restarts the Game
function restartGame(){
	const restart = document.querySelector('.score-panel .restart');
	const repeat = restart.querySelector('.fa');
	repeat.addEventListener('click', function(){
		// Reload the current page, without using the cache
		window.alert(`Do you want to restart the Game?`);
		window.location.reload(true);
	});
}
