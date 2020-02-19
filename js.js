"use scrict"

// arr = [['X', '', ''], ['O', 'O', ''], ['', '', '']]

const turn = { "O": "O", "X": "X" }
Object.freeze(turn)

const rows_count = 3
let playedCount = 0
let currentPlayer = undefined;
let nextPlayer = undefined;

const straightLines = [
    //rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    //columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    //diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]

];

// init
let arr = new Array(3)
for (var row_counter = 0; row_counter < rows_count; row_counter++) {
    arr[row_counter] = new Array(3) // create columns in each row
}

function getNextStepForUser(user) {

    console.log("identifying next step for:", user);
    let favorablePositions = [];

    try {
        straightLines.forEach(line => {
            score = 0;

            cell1xy = line[0];
            cell2xy = line[1];
            cell3xy = line[2];

            cell1 = arr[cell1xy[0]][cell1xy[1]];
            cell2 = arr[cell2xy[0]][cell2xy[1]];
            cell3 = arr[cell3xy[0]][cell3xy[1]];

            if ((cell1 == user || cell1 == '') && (cell2 == user || cell2 == '') && (cell3 == user || cell3 == '')) {
                if (cell1 == user) score += 1;
                if (cell2 == user) score += 1;
                if (cell3 == user) score += 1;

                if (score == 3) throw [user + ' WINS!!!'];

                else if (score == 2) {

                    console.info("identified guarenteed winning position for: ", user);

                    if (cell1 == '') favorablePositions.push(['WIN', cell1xy]);

                    if (cell2 == '') favorablePositions.push(['WIN', cell2xy]);

                    if (cell3 == '') favorablePositions.push(['WIN', cell3xy]);
                }

                else if (score == 1) {
                }

                else if (score == 0) {
                }
            }
            else {
            }

        });

        if (favorablePositions.length == 0) throw ["RANDOM"];
        else throw favorablePositions[0];
    }
    catch (msg) {
        // console.log(msg);
        return msg;
    }

}

function populateGame(initVal) {
    // populate initial game tiles
    console.log("Initial game tiles populated");
    for (var row_counter = 0; row_counter < rows_count; row_counter++) {
        for (var column_counter = 0; column_counter < rows_count; column_counter++) {
            arr[row_counter][column_counter] = initVal;
        }
    }
}

function initGame() {
    // debugger;
    updateMessage("");
    currentPlayer = turn.X;
    playedCount = 0;
    populateGame("");
    updateTurnInfo();
    updateGameTiles();
    console.clear();
    document.getElementById('playLog').value = '';
}

function updateUserAction(element) {

    console.log("SESSION STARTS -------------------------------");

    if (playedCount == 99) {
        // game is already completed.
        if (window.confirm("Replay Game?")) initGame();
        return false;
    }

    // debugger;
    // console.log("Updating user action for: ", currentPlayer);
    nextPlayer = changeTurn(currentPlayer);
    // check if we are at draw.
    if (playedCount == 9) {
        console.warn("DRAW");
        updateMessage('<span class="info">GAME DRAW</span>');
        return false;
    }

    // check if wrong click
    if (element.innerHTML != "") {
        console.error('WRONG CLICK');
        updateMessage("<span class='error'> You can't click here.</span>");
        return false;
    }

    // it's a valid click.. lets proceed
    // updateMessage("<br>" + currentPlayer + " clicked " + element.id + ", seq: " + playedCount);
    updateGameArray(element.id, currentPlayer); // update Game Array
    updateGameTiles(); // updating game tiles in screen.

    if (playedCount == 9) {
        console.warn("DRAW");
        updateMessage('<span class="info">GAME DRAW</span>');
        return false;
    }

    if (playedCount == 99) {
        return 'some one has won :)';
    }

    // this is computer's game and computer is now next player.
    // identify next action for computer.
    nextAction = getNextStepForUser(nextPlayer); //computer
    if (typeof (nextAction) == 'object' && nextAction[0] == 'WIN') {
        // console.info("next action is: ", nextAction[0], nextAction[1]);
        let tileCoordinates = nextAction[1];
        element = document.getElementById(tileCoordinates[0] + '' + tileCoordinates[1]);
        console.warn("Guranteed WIN at: " + element.id, "for: ", nextPlayer);
        updateGameArray(element.id, nextPlayer);
        updateGameTiles();
        updateMessage('<span class="success">' + nextPlayer + ' WINS!!! </span>');
        // no need to change the turn back as game has ended.
    }
    else {
        // bot need to guess user's next position..and try to spoil if user has a winning chance.
        // bot uses the same logic to identify if currentPlayer's (user's) has a winning position
        let nextAction = getNextStepForUser(currentPlayer); //user
        if (typeof (nextAction) == 'object' && nextAction[0] == 'WIN') {
            // console.log("next action is: ", nextAction[0], nextAction[1]);
            // prevent user from winning
            let tileCoordinates = nextAction[1];
            element = document.getElementById(tileCoordinates[0] + '' + tileCoordinates[1]);
            console.warn("Preventing LOSS at: " + element.id);
            updateGameArray(element.id, nextPlayer);
            updateGameTiles();
        } else {
            // we are not able to find a winning or prevent win step.. so let computer pick a position to play.
            let loopCounter = 0;
            if (document.getElementById('debug').checked) {
                let xy = window.prompt("Enter xy");
                x = xy.split('')[0];
                y = xy.split('')[1];
                element = document.getElementById(x + '' + y);
                console.error("DEBUG...", x, y, element.id.innerHTML, playedCount);
            } else {
                do {
                    x = Math.floor(Math.random() * 3);
                    y = Math.floor(Math.random() * 3);
                    element = document.getElementById(x + '' + y);
                    console.info("thinking...", x, y, element.id.innerHTML, playedCount);
                    loopCounter += 1;

                    if ((element.innerHTML == '' || element.innerHTML == undefined) || playedCount >= 8) {
                        break;
                    }

                    if (loopCounter >= 100) break;

                }
                while (true);
                //stop if you found any empty cell or reached end of game
                console.warn("Positioning RANDOMLY at: " + element.id, nextPlayer);
            }
            updateGameArray(element.id, nextPlayer);
            updateGameTiles();
        }

    }
    console.log("SESSION ENDS ---------------------------------------");
}

function updateGameArray(elementId, playerId) {

    if (document.getElementById(elementId).innerHTML != "") {
        console.error('WRONG CLICK', playedCount);
        updateMessage("<span class='error'> You can't click here.</span>");
        return false;
    }

    // udpating the game array
    // console.log("updating game array", elementId);
    playedRow = elementId.split('')[0];
    playedColumn = elementId.split('')[1];
    arr[playedRow][playedColumn] = playerId;
    playedCount += 1;
    document.getElementById('playLog').style.height = 'auto';
    document.getElementById('playLog').style.width = '100%';
    document.getElementById('playLog').style.height = (document.getElementById('playLog').scrollHeight + 1) + 'px';
    document.getElementById('playLog').value += ('\n' + 'Player:' + playerId + ', Played at: ' + elementId + ', seq: ' + playedCount);


    if (playedCount == 9) {
        console.info("game is draw");
        return false;
    }

    let decision = getNextStepForUser(currentPlayer);
    // console.error(decision[0]);

    if (typeof (decision) == 'object' && decision[0].includes('WINS')) {
        updateMessage('<span class="success">' + currentPlayer + ' WINS!!! </span>');
        console.warn('Game won by ', currentPlayer);
        playedCount = 99;
    }

}

function updateGameTiles() {
    // Updates the Game tiles with values from Array.
    // console.log("Updating game tiles on screen");
    for (var row_counter = 0; row_counter < rows_count; row_counter++) {
        for (var column_counter = 0; column_counter < rows_count; column_counter++) {
            document.getElementById(row_counter + '' + column_counter).innerText = arr[row_counter][column_counter];
        }
    }
}

function updateTurnInfo() {
    // Updates turn info to the screen.
    // console.log("updating turn info on screen");
    document.getElementById('turnInfo').innerHTML = "To play: " + currentPlayer;
}

function changeTurn(currentTurn) {
    // changes turn from given turn.
    if (currentTurn == turn.O) {
        return turn.X
    } else {
        return turn.O
    }
}

function updateMessage(msg) {
    // updates res element with given message.
    document.getElementById('res').innerHTML = msg;
}