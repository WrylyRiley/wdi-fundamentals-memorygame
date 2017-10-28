

console.log("Up and running!");
var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}];

var scoreBoard = document.getElementById('score');
var score = 0;
var cardsInPlay = [];

function checkForMatch(){
	var itemOne = '[data-id="' + cardsInPlay[0].ID + '"]';
	var itemTwo = '[data-id="' + cardsInPlay[1].ID + '"]';
	if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
		alert("You found a match!");
		score += 2;
		scoreBoard.innerHTML=("Current Score = " + score);
	} else {
		alert("Sorry, try again!");
		document.querySelector(itemOne).setAttribute('src','images/back.png');
		document.querySelector(itemTwo).setAttribute('src','images/back.png');
		document.querySelector(itemOne).addEventListener("click", flipCard);
		document.querySelector(itemTwo).addEventListener("click", flipCard);
	}
	if (score === cards.length){
		alert("You won!");
	}
	cardsInPlay.pop();
	cardsInPlay.pop();
}


function flipCard() {
	this.removeEventListener("click", flipCard);
	var cardId = this.getAttribute('data-id');
	console.log(cards[cardId].rank + " of " + cards[cardId].suit + " was flipped");
	cardsInPlay.push({
		rank: cards[cardId].rank,
		ID: cardId
		});
	this.setAttribute('src', cards[cardId].cardImage);
	if (cardsInPlay.length === 2){
		checkForMatch();
	}
}

function createBoard() {
	for (var i = 0; i < cards.length; i++){
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src','images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.setAttribute('class', 'boardCard');
		cardElement.addEventListener('click', flipCard);
		document.getElementById('gameboard').appendChild(cardElement);
		document.getElementById('resetButton').addEventListener('click', resetBoard);
	} 
}

function resetBoard(){
	score = 0;
	scoreBoard.innerHTML=("Current Score = " + score);
	cardsInPlay = [];
	var myNode = document.getElementById("gameboard");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
	createBoard();

}

createBoard();