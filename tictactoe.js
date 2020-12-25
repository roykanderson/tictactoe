var view = {
    // takes in a spot and letter as strings to display an X or O
    displayLetter: function(spot, letter) {
        var spot = document.getElementById(spot);
        spot.firstElementChild.innerHTML = letter;
    },

    // takes in a message as a string and displays it in the message area
    displayMessage: function(message) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = message;
    }
}

var model = {
    // stores the size of the board
    boardSize: 3,

    // stores the state of all the spots on the board
    spots: [ ["", "", ""], ["", "", ""], ["", "", ""] ],

    // bool storing whether game is over or not
    gameOver: false,

    letters: [ "X", "O" ],

    currentLetter: "X",

    // takes in a spot as string and tries to place a letter, if no letter is already in the spot
    placeLetter: function(spot, letter) {
        this.spots[spot.charAt(0)][spot.charAt(1)] = letter;
        console.log(this.spots);
        view.displayLetter(spot, letter);
    }
}

var controller = {
    // takes in a spot and letter, places letter if valid, reports winner if game over
    processPlacement: function(spot, letter) {
        console.log("hello");
        if (!model.gameOver) {
            if (this.checkValidPlacement(spot)) {
                console.log("ba");
                model.placeLetter(spot, letter);
                if (this.checkWin(letter)) {
                    console.log("why isn't this showing up");
                    view.displayMessage("Game over! " + letter + " won.");
                } else if (this.checkWin(letter) === null) {
                    view.displayMessage("Game over! Nobody won.")
                } else {
                switchCurrentLetter(letter);
                }
            } else {
            view.displayMessage("Invalid placement. Try again, " + letter + ".");
            }
        }
    },

    // takes in a spot, checks if spot already has letter or not
    checkValidPlacement: function(spot) {
        var cell = model.spots[spot.charAt(0)][spot.charAt(1)];
        if (!cell) { // if cell is an empty string
            console.log("valid place");
            return true;
        }
        console.log("invalid place");
        return false;
    },

    // takes in a letter, returns if that letter has won, null if board full with no winner, false otherwise
    checkWin: function(letter) {
        model.gameOver = true;
        console.log("in checkwin");
        if (this.checkDiagLeftWin(letter)) {
            console.log("diag left win");
            return true;
        } else if (this.checkDiagRightWin(letter)) {
            return true;
        }
        for (var i = 0; i < model.boardSize; i++) {
            for (var j = 0; j < model.boardSize; j++) {
                if(model.spots[i][j] === letter) {
                    if (this.checkHorizontalWin(letter, i)) {
                        return true;
                    } else if (this.checkVerticalWin(letter, j)) {
                        return true;
                    }
                }
            }
        }
        if (this.checkBoardFull()) {
            return null;
        }
        console.log("no win");
        model.gameOver = false;
        return false;
    },

    checkBoardFull: function() {
        for (var i = 0; i < model.boardSize; i++) {
            for (var j = 0; j < model.boardSize; j++) {
                if (!model.spots[i][j]) { // if the spot we're looking at is an empty string
                    return false;
                }
            }
        }
        model.gameOver = true;
        return true;
    },

    checkHorizontalWin: function(letter, i) {
        var count = 0;
        for (var k = 0; k < model.boardSize; k++) { // check horizontal win
            if (model.spots[i][k] === letter) {
                count++;
            }
        }
        if (count === model.boardSize) {
            return true;
        }
        return false;
    },

    checkVerticalWin: function(letter, j) {
        var count = 0;
        for (var k = 0; k < model.boardSize; k++) {
            if (model.spots[k][j] === letter) {
                count++;
            }
        }
        if (count === model.boardSize) {
            return true;
        }
        return false;
    },

    checkDiagLeftWin: function(letter) {
        var count = 0;
        var i = 0;
        var j = 0;
        for (var k = 0; k < model.boardSize; k++) {
            if (model.spots[i][j] === letter) {
                count++;
            }
            i++;
            j++;
        }
        if (count === model.boardSize) {
            return true;
        }
        return false;
    },

    checkDiagRightWin: function(letter) {
        var count = 0;
        var i = 0;
        var j = model.boardSize - 1;
        for (var k = 0; k < model.boardSize; k++) {
            if (model.spots[i][j] === letter) {
                count++;
            }
            i++;
            j--;
        }
        if (count === model.boardSize) {
            return true;
        }
        return false;
    }
}

function addClickEvents() {
    var cells = document.getElementsByClassName("spot");
    for(var i = 0; i < Math.pow(model.boardSize, 2); i++) {
        cells[i].onclick = handleSpotClick;
    }
}

// function switchOnclickLetter(letter) {
//     model.currentLetter = switchCurrentLetter(letter);
//     view.displayMessage(letter + "'s turn");
// }

function randXO() {
    var rand = Math.floor(Math.random() * 2);
    return rand;
}

function switchCurrentLetter(letter) {
    if (letter === model.letters[0]) {
        model.currentLetter = model.letters[1];
    } else if (letter === model.letters[1]) {
        model.currentLetter = model.letters[0];
    }
    view.displayMessage(model.currentLetter + "'s turn.");
}

function handleSpotClick(e) {
    console.log(e.target.id);
    var spot = e.target.id;
    controller.processPlacement(spot, model.currentLetter);
}

function init() {
    model.currentLetter = model.letters[randXO()];
    addClickEvents();
}

window.onload = init;