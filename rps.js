console.log("Welcome to rock paper scissors")

// Get the document elements and set the click events
const rock = document.getElementById("ROCK");
const paper = document.getElementById("PAPER");
const scissors = document.getElementById("SCISSORS");
const pcSelect = document.getElementById("PCSelection");
const comSelect = document.getElementById("COMSelection");
const textResult = document.getElementById("textResults");
const textScore = document.getElementById("SCORE");
const scoreBar = document.getElementById("ScoreBar");

const iconRock = "assets/coal.png"
const iconPaper = "assets/ancient-scroll.png"
const iconScissors = "assets/scissors_inverted.png"

rock.addEventListener("click", selectRock);
paper.addEventListener("click", selectPaper);
scissors.addEventListener("click", selectScissors);

function selectRock()
{
    PC.selection = RPS.Rock;
}

function selectPaper()
{
    PC.selection = RPS.Paper;
}

function selectScissors()
{
    PC.selection = RPS.Scissors;

}

let pcScore = 0;
let comScore = 0;
updateScore();

function runGame()
{
    let result = checkWinner(PC.selection, COM.selection);

    COM.lastResult = result;

    switch (result) 
    {
        case GameResults.Error : 
            console.log("[Result] Game experienced an error"); 
            textResult.innerHTML = "Error";
            break;
        case GameResults.Tie : 
            console.log("[Result] Game Resulted in a tie"); 
            textResult.innerHTML = "Tie";
            break;
        case GameResults.PCWin : 
            console.log("[Result] Player won this round. Good Job!"); 
            textResult.innerHTML = "You win!!!";
            pcScore++;
            break;
        case GameResults.ComWin : 
            console.log("[Result] The computer won this round. Try again"); 
            textResult.innerHTML = "You Lose. Try Again."
            comScore++;
            break;
        default : 
            console.log("[Result] You should not reach this point... " + result);
    }
    setWinEffects(result);
    updateScore();
}

function setWinEffects(result)
{
    pcSelect.style.backgroundColor = "inherit";
    pcSelect.style.boxShadow = "none";
    comSelect.style.backgroundColor = "inherit";
    comSelect.style.boxShadow = "none";

    switch(result)
    {
        case GameResults.PCWin :
            pcSelect.style.backgroundColor = "gold";
            pcSelect.style.boxShadow = "0px 0px 20px gold"
            break;
        case GameResults.ComWin : 
            comSelect.style.backgroundColor = "gold";
            comSelect.style.boxShadow = "0px 0px 20px gold"
            break;
    }
}

function setImage(img, selection)
{
    switch (selection)
    {
        case RPS.Rock : 
            img.children[0].src = iconRock;
            break;
        case RPS.Paper :
            img.children[0].src = iconPaper;
            break;
        case RPS.Scissors :
            img.children[0].src = iconScissors;
            break;
    }
}

function updateScore()
{
    if ((pcScore + comScore) == 0)
    {
        scoreBar.style.backgroundColor = "purple";
        scoreBar.style.width = "100%";
    }
    else
    {
        scoreBar.style.backgroundColor = "blue";
        scoreBar.style.width = ((100 * pcScore) / (pcScore + comScore)) + "%";
    }

    textScore.innerHTML = pcScore + " : " + comScore;
}

// Game Types and functions
// Selection Enums
const RPS = {
    Undefined : -1,
    Rock : 0,
    Paper : 1,
    Scissors : 2
};

const GameResults = 
{
    Error : -1,
    Tie : 0,
    PCWin : 1,
    ComWin : 2
};

// Selection variables
const PC = {
    state : RPS.Undefined,
    set selection(select)
    {
        console.log("[PC]: " + select)
        this.state = select;
        COM.pcSelection = select;
        setImage(pcSelect, select);
        runGame();
    },
    get selection() { return this.state; }
};

const COM = {
    state : RPS.Undefined,
    set selection(select)
    {
        this.state = select;
    },
    get selection() { return this.state; },

    pcState : RPS.Undefined,

    set pcSelection(select) {
        // Computer making a selection triggers off of player making a descision
        // Could change this so that the computer makes a descision after each game result
        this.makeSelection();
        setImage(comSelect, this.selection);
        this.pcState = select;
    },

    makeSelection()
    {
        // Random Selection
        this.selection = Math.floor(Math.random() * 3);

        console.log("[COM]: " + this.selection);
    },

    lastResult : GameResults.Error
};

// Check for a winner
function checkWinner(pcSelection, comSelection)
{
    if((pcSelection == RPS.Undefined) || (comSelection == RPS.Undefined))
    {
        console.log("[Error] Selections not initialized");
        return GameResults.Error;
    }
    else if (pcSelection == comSelection)
    {
        return GameResults.Tie;
    }
    else
    {
        switch(pcSelection)
        {
            case RPS.Rock :
                if (comSelection == RPS.Scissors) { return GameResults.PCWin; }
                break;
            case RPS.Paper :
                if (comSelection == RPS.Rock) { return GameResults.PCWin; }
                break;
            case RPS.Scissors :
                if (comSelection == RPS.Paper) { return GameResults.PCWin; }
        }

        return GameResults.ComWin;
    }
}