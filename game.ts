
//this is an array of arrays
const game = {
    board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    currentPlayer: 'x',
    winState: ''
}

//have to be able to place "x" or "o" in open spots 
//name the position to place the "x" or "o"

function placePiece(b: typeof game.board, spot: { row: number, column: number }, p: string) {

    if (game.winState) throw Error("game is over!")
    //get the spot 
    const openSpot = b[spot.row][spot.column]
    //make sure spot is available on the game.board
    if (openSpot === "") {
        b[spot.row][spot.column] = p
        game.currentPlayer = (p === "o") ? "x" : "o"
    }
    console.log(b)

}


const whateverIWant = { row: 2, column: 1 }
//place the game.currentPlayer in the spot 
placePiece(game.board, whateverIWant, game.currentPlayer)
checkWinState()
placePiece(game.board, { row: 0, column: 0 }, game.currentPlayer)
checkWinState()
placePiece(game.board, { row: 2, column: 2 }, game.currentPlayer)
checkWinState()
placePiece(game.board, { row: 0, column: 1 }, game.currentPlayer)
checkWinState()
placePiece(game.board, { row: 1, column: 1 }, game.currentPlayer)
checkWinState()
placePiece(game.board, { row: 0, column: 2 }, game.currentPlayer)
checkWinState()
console.log(checkWinState())


//determine if there is a winner
//return the winner 
function checkWinStateForOnePlayer(b: typeof game.board, p: string) {

    for (let i = 0; i < 3; i++) {
        //check rows
        if (b[0][i] === p && b[1][i] === p && b[2][i] === p) {
            // modify game.winState
            game.winState = `${p} is the winner`;
            return game.winState;
        }
        //check columns
        if (b[i][0] === p && b[i][1] === p && b[i][2] === p) {
            // modify game.winState
            game.winState = `${p} is the winner`;
            return game.winState;
        }
        //check diagonals
        if ((b[0][0] === p && b[1][1] === p && b[2][2] === p) || (b[0][2] === p && b[1][1] === p && b[2][0] === p)) {
            // modify game.winState
            game.winState = `${p} is the winner`;
            return game.winState;
        }
    }
    console.log(game.currentPlayer + "'s turn")
}

function checkWinState() {
    return checkWinStateForOnePlayer(game.board, "x") || checkWinStateForOnePlayer(game.board, "o")
}





