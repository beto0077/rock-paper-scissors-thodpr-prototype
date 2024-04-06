/*const buttons = document.querySelectorAll("button");

const choices = ["Rock", "Paper", "Scissors"];

let rounds = 0;

function getRandomChoice(choices) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function compareChoices(user, computer) {
    let winner;
    if (user == "Rock") {
        if (computer == "Rock") {
            winner = "draw";
        } else if (computer == "Paper") {
            winner = "computer";
        } else {
            winner = "user";
        }
    } else if (user == "Paper") {
        if (computer == "Rock") {
            winner = "user";
        } else if (computer == "Paper") {
            winner = "draw";
        } else {
            winner = "computer";
        }
    } else if (user == "Scissors") {
        if (computer == "Rock") {
            winner = "computer";
        } else if (computer == "Paper") {
            winner = "user";
        } else {
            winner = "draw";
        }
    } else {
        winner = "Error"
    }
    return winner;
}

function singleRound(userChoice) {
    const computerChoice = getRandomChoice(choices);
    console.log(`Computer: ${computerChoice}`);
    console.log(`User: ${userChoice}`);
    let result = document.querySelector("#round-result");
    result.textContent = `Winner: ${compareChoices(userChoice, computerChoice)}`;
    console.log(`Winner: ${compareChoices(userChoice, computerChoice)}`);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const userChoice = button.textContent;
        singleRound(userChoice);
    });
});

function loopGame() {
    for (let index = 1; index < rounds; index++) {
        console.log(index);
    }
    console.log(rounds);
}

function startGame() {
    const startButton = document.getElementById("start");
    const gameDiv = document.getElementById("game");

    startButton.addEventListener("click", function () {
        startButton.style.display = "none";
        gameDiv.style.display = "block";
        rounds = prompt("How many rounds do you want to play?");
        console.log(rounds);
        loopGame();
    });

    
}

document.addEventListener("DOMContentLoaded", startGame);*/

document.addEventListener("DOMContentLoaded", startGame);

const startButton = document.getElementById("start");
const gameDiv = document.getElementById("game");
const roundResult = document.querySelector("#round-result");
const gameStatistics = document.querySelector("#game-statistics");
const gameResult = document.querySelector("#game-result");

const buttons = document.querySelectorAll("button");
const choices = ["rock", "paper", "scissors"];
let totalRounds = 0;
let roundsPlayed = 0;
let userWins = 0;
let computerWins = 0;
let tiedRounds = 0;

function getRandomChoice(choices) {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function compareChoices(user, computer) {
    if (!choices.includes(user) || !choices.includes(computer)) {
        return "Invalid choice";
    }

    if (user === computer) {
        return "tie";
    }

    switch (user) {
        case "rock":
            return computer === "paper" ? "computer" : "user";
        case "paper":
            return computer === "scissors" ? "computer" : "user";
        case "scissors":
            return computer === "rock" ? "computer" : "user";
        default:
            return "Invalid choice";
    }
}

function showResults() {
    gameStatistics.textContent = `Total rounds played: ${totalRounds} / User wins: ${userWins} / Computer wins: ${computerWins} / Tied rounds: ${tiedRounds}`;
    let finalMessage = "";
    if (userWins === computerWins) {
        finalMessage = "The game has ended tied, try again.";
    } else {
        finalMessage = userWins > computerWins ? "Congratulations, you've beaten the computer!<br>" : "You lost, better luck next time.<br>";
    }
    gameResult.innerHTML = `${finalMessage}Game has ended. Please start a new game.`;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function endGame() {
    showResults();
    startButton.style.display = "block";
    gameDiv.style.display = "none";
}

function singleRound(userChoice) {
    const computerChoice = getRandomChoice(choices);
    console.log(`Computer: ${computerChoice}`);
    console.log(`User: ${userChoice}`);
    let roundData = "";
    const winner = compareChoices(userChoice, computerChoice);
    if (winner === "tie") {
        tiedRounds++;
        roundData = `Tie, both chose the same. ${capitalizeFirstLetter(userChoice)} ties with ${capitalizeFirstLetter(computerChoice)}`;
    } else if (winner === "user" || winner === "computer") {
        winner === "user" ? userWins++ : computerWins++;
        roundData = winner === "user" ? `You won this round! ${capitalizeFirstLetter(userChoice)} beats ${capitalizeFirstLetter(computerChoice)}` : `You lose! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(userChoice)}`;
    }
    roundResult.textContent = roundData;
    console.log(`Winner: ${winner}`);
    console.log(roundsPlayed);
    console.log(totalRounds);

    if (roundsPlayed == totalRounds) {
        endGame();
    }
    roundsPlayed++; // Increase roundsPlayed after playing a round

}

function startGame() {

    startButton.addEventListener("click", function () {
        roundResult.textContent = "";
        gameStatistics.textContent = "";
        gameResult.textContent = "";
        startButton.style.display = "none";
        gameDiv.style.display = "block";
        totalRounds = parseInt(prompt("How many rounds do you want to play?"));
        roundsPlayed = 0;
        userWins = 0;
        computerWins = 0;
        tiedRounds = 0;
    });

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            if (roundsPlayed <= totalRounds) { // Check if roundsPlayed is less than totalRounds
                const userChoice = button.textContent.toLowerCase();
                singleRound(userChoice);
            }
        });
    });
}
