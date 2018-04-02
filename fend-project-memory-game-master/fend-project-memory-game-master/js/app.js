
//Start and restart the Game
displayCards();
restartGame();

//Function to be called to display cards
function displayCards(){
	let moveCounter = -1;
	moveCounter = displayMovesCount(moveCounter);
	const deck = document.querySelector('.deck');
	const cardsList = deck.querySelectorAll('.card'); //list that holds all the cards
	const cardsArray = Array.from(cardsList); 	// List to array conversion
	const shuffledArray = shuffle(cardsArray); // Shuffled cards using shuffle method

	resetDeckwithShuffledCards(deck,shuffledArray); //Updating existing deck with shuffled cards

	//Handling click on each card
	respondToClick(deck,shuffledArray);
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
			if(clickCounter === 1)
			{startTime = performance.now();		
			}
			if (card.className === "card"){
				//checks and returns if any other card already open		
				const openCard = deck.querySelector('.card.open.show');
				//open and shows the card onclick		
				card.className = "card open show";
				//If any other card is already open then check for matching and set the status		
				if(openCard !== null){
					//calculateMoves(openCard,card,moveCounter);
					moveCounter = displayMovesCount(moveCounter);
					checkIfMatching(openCard,card);
					const matchedCardsList = deck.querySelectorAll('.card.match');
					if(matchedCardsList !== null && 
							matchedCardsList.length === shuffledArray.length){
						setTimeout(function(){
							displayResultMessage(moveCounter,startTime);
						}, 1000);
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

//Displays result with Game score
function displayResultMessage(moveCounter,startTime){
	const score = calculateFinalScore(moveCounter,startTime);
	displayScore(score);
	updateStarRating(score);
	if(moveCounter <= 12){
		window.alert(`Congratulations! You have won the Game with score ${score}.You have very sharp memory!`);
	}else{
		if(moveCounter > 12 && moveCounter < 16){
			window.alert(`Congratulations! You have won the Game with score ${score}.You have a good memory!`);
		}else
			window.alert(`Congratulations! You have won the Game with score ${score}.`);
	}	
}

//Calculating time taken to complete the game and total number of moves
function calculateFinalScore(moveCounter,startTime){
	var endTime = 0;
	var timeTaken = 0;
	endTime = performance.now();						 
	timeTaken = Math.round((endTime - startTime) / 1000);
	displayTime(timeTaken);
	return precisionRound(500000 / (timeTaken * (moveCounter-8)),-2);
	// return bonus;
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
	return scoreDisplay;
}

//Displays time taken on page
function displayTime(timeTaken){
	//console.log(timeTaken);
	const timeDisplay = document.querySelector('.score-panel .time');
	timeDisplay.innerText = timeTaken;
	return timeTaken;
}

function updateStarRating(score){
	//To remove element for decreasing star 
	const starRatingUl = document.querySelector('.score-panel .stars');
	const starRatingLi = document.querySelectorAll('.score-panel .stars>li');
	//Adding element to increase stars
	var starRating = document.querySelector('.score-panel .stars>li');
	var starITag = document.createElement('i');
	starITag.className = 'fa fa-star';

	//Adding or removing stars and displaying on page
	const docFragment = document.createDocumentFragment();
	if(score >= 4000){
		docFragment.appendChild(starITag);
		starRating = document.querySelector('.score-panel .stars>li');
		starITag = document.createElement('i');
		starITag.className = 'fa fa-star';
		docFragment.appendChild(starITag);
		starRating.appendChild(docFragment);
	}else if(score >= 3000){
		docFragment.appendChild(starITag);
		starRating.appendChild(docFragment);
	}else if(score >= 1000){
		starRatingUl.removeChild(starRatingLi[0]);
	}else{
		starRatingUl.removeChild(starRatingLi[0]);
		starRatingUl.removeChild(starRatingLi[1]);
	}		
}

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
