console.log("Welcome to rock paper scissors")


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
        this.state = select;
        COM.pcSelection = select;
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
        this.selection = Math.floor(Math.random() * 3);
        this.pcState = select;
    },
    lastResult : GameResults.Error
};

// Get the document elements and set the click events
const rock = document.getElementById("ROCK");
const paper = document.getElementById("PAPER");
const scissors = document.getElementById("SCISSORS")

rock.addEventListener("click", selectRock);
paper.addEventListener("click", selectPaper);
scissors.addEventListener("click", selectScissors);

function selectRock()
{
    console.log("User selected rock");
    PC.selection = RPS.Rock;
}

function selectPaper()
{
    console.log("User selected paper");
    PC.selection = RPS.Paper;
}

function selectScissors()
{
    console.log("User selected scissors");
    PC.selection = RPS.Scissors;

}

// Check for a winner
function checkWinner(pcSelection, comSelection)
{
    if((pcSelection == RPS.Undefined) || (comSelection == RPS.Undefined))
    {
        console.debug("Error: Selections not initialized");
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

function runGame()
{
    let result = checkWinner(PC.selection, COM.selection);

    COM.lastResult = result;

    switch (result) 
    {
        case GameResults.Error : console.log("Game experienced an error"); break;
        case GameResults.Tie : console.log("Game Resulted in a tie"); break;
        case GameResults.PCWin : console.log("Player won this round. Good Job!"); break;
        case GameResults.ComWin : console.log("The computer won this round. Try again"); break;
        default : console.log("You should not reach this point... " + result);
    }
}