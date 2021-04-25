export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export function getNextBestTileForPlayer(current, player) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    let favorablePositions = [];

    try {
        // debugger;
        lines.forEach(line => {
            let score = 0;
            const cell1 = current[line[0]];
            const cell2 = current[line[1]];
            const cell3 = current[line[2]];
            let user = player;
            if ((cell1 === user || cell1 === null) && (cell2 === user || cell2 === null) && (cell3 === user || cell3 === null)) {
                if (cell1 === user) score += 1;
                if (cell2 === user) score += 1;
                if (cell3 === user) score += 1;
                if (score === 3) throw [user + ' WINS!!!'];
                else if (score === 2) {
                    console.info("identified guarenteed winning position for: ", user);
                    if (cell1 === null) favorablePositions.push(['WIN', line[0]]);
                    if (cell2 === null) favorablePositions.push(['WIN', line[1]]);
                    if (cell3 === null) favorablePositions.push(['WIN', line[2]]);
                }
                else if (score === 1) {
                }
                else if (score === 0) {
                }
            }
            else {
            }

        });

        if (favorablePositions.length === 0) throw ["RANDOM"];
        else throw favorablePositions[0];
    }
    catch (msg) {
        return msg;
    }
}