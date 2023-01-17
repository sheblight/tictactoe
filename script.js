'use strict';

const gameBoard = (() => {
    let gameActive = true;
    let playerOneTurn = true;
    let marks = new Array(9);
    
    const getMark = _ => playerOneTurn ? "X" : "O";
    const getClassMark =  _ => playerOneTurn ? ".cross" : ".circle";

    const evaluateWinner = _ => {
        const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        const isMatching = (combination,mark) => (marks[combination[0]] == mark) && (marks[combination[1]] == mark) && (marks[combination[2]] == mark);
        let currentPlayerWins = false;

        winCombos.forEach(combination => {
            currentPlayerWins = currentPlayerWins || isMatching(combination, getMark());
        }); 
        return currentPlayerWins;
    }

    const logMessage = function(text) {
        let h1 = document.querySelector("h1");
        h1.textContent = text;
    }

    const playerMark = function() {
        if (!gameActive) return;
        let number = Number(this.dataset.slot);
        
        // Return if slot is already marked
        if (marks[number] != undefined) {
            console.log("Slot already marked.");
            return;
        }
        let revealNode = this.querySelector(getClassMark());
        revealNode.classList.remove("hidden");
        marks[number] = getMark();
        
        // Evaluate winner, tie, or proceed the game
        if (evaluateWinner()) {
            logMessage(`${playerOneTurn ? "P1" : "P2"} wins!`);
            gameActive = false;
        }
        else if (!marks.includes(undefined)) {
            logMessage("It's a tie!");
            gameActive = false;
        }
        else {
            playerOneTurn = !playerOneTurn;
            logMessage(`It's ${playerOneTurn ? "P1" : "P2"}'s turn.`);
        }
    };

    const resetBoard = ()=>{
        const activeMarks = document.querySelectorAll("svg:not(.hidden)");
        activeMarks.forEach(mark => {
            mark.classList.add("hidden");
        });
        marks = new Array(9);
        playerOneTurn = true;
        gameActive = true;
        logMessage(`It's ${playerOneTurn ? "P1" : "P2"}'s turn.`);
    }

    return { playerMark, resetBoard };
})();


const slotNodes = document.querySelectorAll(".slot");
const buttonNode = document.querySelector("button");
slotNodes.forEach(node => {
    node.addEventListener("click", gameBoard.playerMark, true);
});
buttonNode.addEventListener("click", gameBoard.resetBoard, true);