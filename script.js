// script.js

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;

function handleCellClick(index) {
    if (gameActive && board[index] === '') {
        board[index] = currentPlayer;
        updateBoard();
        checkWinner();
        togglePlayer();
    }
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            displayWinner(board[a]);
            updateScore(board[a]);
            gameActive = false;
            return;
        }
    }

    if (!board.includes('')) {
        displayDraw();
        gameActive = false;
    }
}

function displayWinner(player) {
    const message = document.getElementById('message');
    message.textContent = `${player} wins!`;
    message.style.display = 'block';
}

function displayDraw() {
    const message = document.getElementById('message');
    message.textContent = 'It\'s a draw!';
    message.style.display = 'block';
}

function updateScore(player) {
    if (player === 'X') {
        playerXScore++;
        document.getElementById('playerXScore').textContent = `Player X: ${playerXScore}`;
    } else {
        playerOScore++;
        document.getElementById('playerOScore').textContent = `Player O: ${playerOScore}`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('message').style.display = 'none';
    updateBoard();
}
