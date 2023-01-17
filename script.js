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

    const playerMark = function() {
        if (!gameActive) return;
        let number = Number(this.dataset.slot);
        
        if (marks[number] == undefined) {
            let revealNode = this.querySelector(getClassMark());
            revealNode.classList.remove("hidden");
            marks[number] = getMark();
            console.log(`Slot marked: ${number}`);
            if (evaluateWinner()) {
                console.log(`${playerOneTurn ? "P1" : "P2"} wins!`);
                gameActive = false;
            }
            else if (!marks.includes(undefined)) {
                console.log("It's a tie!");
                gameActive = false;
            }
            playerOneTurn = !playerOneTurn;
        }
        else {
            console.log("Slot already marked.");
        }
    };

    return { playerMark };
})();


const slotNodes = document.querySelectorAll(".slot");
slotNodes.forEach(node => {
    node.addEventListener("click", gameBoard.playerMark, true);
});