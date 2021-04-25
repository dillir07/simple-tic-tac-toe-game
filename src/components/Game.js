import React, { useState } from 'react';
import { calculateWinner, getNextBestTileForPlayer } from "../helper";
import './gamestyle.css'
import Board from './Board';

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(history[stepNumber]);
    let player = 'X';
    // let player = isXNext ? "X" : "O";



    const handleUserClick = (i) => {
        /**
         * * basically handles histroy/timeline
         */
        player = 'X';
        let historyPoint = history.slice(0, stepNumber + 1);
        let current = historyPoint[stepNumber];
        let squares = [...current];
        // return if game is won or square is already filled.
        // sqaures are initialized with null
        if (winner || squares[i]) return;

        squares[i] = player; //apllied X move here
        // setIsXNext(!isXNext); // player becomes O

        // Handling O's turn -----------------------------------------
        player = "O";
        console.log("playing", player);
        let nextStepInfo = getNextBestTileForPlayer(squares, 'O');

        let OsMove = undefined;
        if (Array.isArray(nextStepInfo) && nextStepInfo[0] === 'WIN') {
            OsMove = nextStepInfo[1];
        } else if (nextStepInfo[0] === 'RANDOM') {
            nextStepInfo = getNextBestTileForPlayer(squares, 'X');
            if (Array.isArray(nextStepInfo) && nextStepInfo[0] === 'WIN') {
                OsMove = nextStepInfo[1];
            } else if (nextStepInfo[0] === 'RANDOM') {
                OsMove = squares.indexOf(null);
            }
        }
        console.log(nextStepInfo, "OsMove calculated:", OsMove);
        // return if game is won or square is already filled.
        // sqaures are initialized with null
        if (winner) return;
        console.log('O move to be applied into squares');
        squares[OsMove] = player; //filling with O
        console.log('O move into squares');
        setHistory([...historyPoint, squares]);
        setStepNumber(historyPoint.length);
        console.log(OsMove, squares);
        // setIsXNext(!isXNext); // player becomes X again
        player = 'X';
        console.log(stepNumber);
        // O's trun ends here ----------------------------------------

    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setIsXNext(step % 2 === 0);
    };

    const renderMoves = () =>
        history.map((_step, move) => {
            const destination = move ? `Go to move #${move}` : "Go to Start";
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            );
        });

    return (
        <>
            <header>Tic Tac Toe</header>
            <div>
                <main>
                    <Board squares={history[stepNumber]} onClick={handleUserClick}> </Board>
                </main>
                <aside>
                    <h3>Timeline:</h3>
                    <nav>{renderMoves()}</nav>
                    <h3 id="res">{winner ? `winner: ${winner}` : stepNumber >= 4 ? 'DRAW' : `next player:${player}`}</h3>
                </aside>
            </div>
            {/* <footer>Footer</footer> */}
        </>
    );
}

export default Game;