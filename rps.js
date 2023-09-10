console.log("Welcome to rock paper scissors")

const rock = document.getElementById("ROCK");
const paper = document.getElementById("PAPER");
const scissors = document.getElementById("SCISSORS")

rock.addEventListener("click", selectRock);
paper.addEventListener("click", selectPaper);
scissors.addEventListener("click", selectScissors);

function selectRock()
{
    console.log("User selected rock");
}

function selectPaper()
{
    console.log("User selected paper");
}

function selectScissors()
{
    console.log("User selected scissors");
}