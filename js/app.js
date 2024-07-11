//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.

/* 
Display an empty tic-tac-toe board when the page is initially displayed.
A player can click on the nine cells to make a move.
Every click will alternate between marking an X and O.
Display whose turn it is (X or O).
The cell cannot be played again once occupied with an X or O.
Provide win logic and display a winning message.
Provide logic for a cat’s game (tie), also displaying a message.
Provide a Reset Game button that will clear the contents of the board.
*/


/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

/*---------------------------- Variables (state) ----------------------------*/

let board
let turn
let winner
let tie


/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.querySelector('#message')
const boardSquares = document.querySelector('.board')
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/
const init = () => {
    board = ['','','','','','','','','']
    turn = 'X'
    winner = false
    tie = false
    render()
}

const render = () => {
    updateBoard()
    updateMessage()
}

const updateBoard = () => {
    board.forEach((value) => {
        let idx = board.indexOf(value)
        let square = squareEls[idx]
        square.innerText = board[idx]
    })
}

const updateMessage = () => {
    if (winner === false && tie === false) {
        messageEl.innerText = `${turn} turn`
    } else if (winner === false && tie === true) {
        messageEl.innerText = `It's a tie.`
    } else messageEl.innerText = `${turn} wins!`
}

const handleClick = (event) => {
    let sqrIdx = event.target.id
    if (sqrIdx === "" ||
        board[sqrIdx] === 'X' || 
        board[sqrIdx] === 'O' ||
        winner === true) {
        return
    } else {
        // some other functions
        console.log(board,turn,winner,tie)
        placePiece(sqrIdx)
        console.log(board,turn,winner,tie)
        checkForWinner()
        console.log(board,turn,winner,tie)
        checkForTie()
        console.log(board,turn,winner,tie)
        switchPlayerTurn()
        console.log(board,turn,winner,tie)
        render()
        console.log(board,turn,winner,tie)
    }
}

const placePiece = (index) => {
    board[index] = turn
}

const checkForWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) {
        if (board[winningCombos[i][0]] !== '' &&
            board[winningCombos[i][0]] === board[winningCombos[i][1]] &&
            board[winningCombos[i][0]] === board[winningCombos[i][2]])
            winner = true
    }
}

const isItBlank = () => {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") return true
    }
}

const checkForTie = () => {
    console.log(isItBlank())
    if (winner === true || isItBlank !== true) {
        return
    } else tie = true
    }

const switchPlayerTurn = () => {
    if (winner === true) {
        return
    } else {
        if (turn === 'X') {
            turn = 'O'
        } else turn = 'X'
    }
}

/*----------------------------- Event Listeners -----------------------------*/

boardSquares.addEventListener('click',handleClick)
resetBtnEl.addEventListener('click',init)


init()