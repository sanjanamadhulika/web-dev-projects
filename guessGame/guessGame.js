//create sceretNumber
var sceretNumber = 6;

//ask use to guess the number
var stringGuess = prompt("Guess a number");
var guess = Number(stringGuess);

//check if guess is right
if(guess === sceretNumber){
	alert("YOU GUESSED IT RIGHT");
}
//check if guess is higher
else if(guess > sceretNumber){
	alert("Too high. Guess it again!");
}
//check if guess is lower
else{
	alert("Too low. Guess it again");
}