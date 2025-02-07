const images = [
    './TICTACTOE2.png',
    './TICTACTOE3.png',
    './TICTACTOE4.png'
];

function display(sectionId) {
    document.getElementById('sectionWelcome').style.display = 'none';
    document.getElementById('sectionLoader').style.display='none';
    document.getElementById('sectionHome').style.display = 'none';
    document.getElementById('sectionGame').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === 'sectionLoader') {
        startImageLoader();
    }
}

let currentIndex = 0;
let interval;
const totalCycles = 1; // Define how many times you want to complete the cycle
let cycleCount = 0;

function loadImage() {
    const imageElement = document.getElementById('dynamic-image');
    imageElement.src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;

    if (currentIndex === 0) { // When a full cycle is completed
        cycleCount++;
        if (cycleCount === totalCycles) {
            clearInterval(interval); // Stop the interval
            setTimeout(() => display('sectionHome'), 2000); // Navigate to Home section after displaying the last image for 2 seconds
        }
    }
}

function startImageLoader() {
    loadImage(); // Load the first image immediately
    cycleCount = 0; // Reset the cycle count
    if (interval) clearInterval(interval); // Clear any existing interval
    interval = setInterval(loadImage, 2000); // Change image every 2 seconds
}

// Initially display the welcome section


let currentPlayer = 'O'; // Start with player 'O'
let board = ['', '', '', '', '', '', '', '', '']; // Initialize an empty board

// Player names and symbols
let player1Name = '';
let player2Name = '';

// Function to set player names
function setPlayerNames(name1, name2) {
    player1Name = name1;
    player2Name = name2;
    document.getElementById('p1').textContent = player1Name;
    document.getElementById('p2').textContent = player2Name;
    document.getElementById('p1-game').textContent = player1Name;
    document.getElementById('p2-game').textContent = player2Name;
}

// Function to handle the cell click
function cellClick(cellId) {
    const cell = document.getElementById(cellId);
    const cellIndex = parseInt(cellId.replace('cell', '')) - 1; // Get the cell index

    // Check if the cell is already filled
    if (board[cellIndex] === '') {
        // Update the board and the UI
        board[cellIndex] = currentPlayer;
        cell.value = currentPlayer;
        cell.disabled = true; // Disable the input to prevent further changes

        // Check for a winner
        const winner = checkWinner();
        if (winner) {
            showWinner(winner);
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
        }
    } else {
        alert('This cell is already filled!');
    }
}

// Function to check the winner
function checkWinner() {
    // Rows
    for (let i = 0; i < 3; i++) {
        if (board[i * 3] === currentPlayer &&
            board[i * 3 + 1] === currentPlayer &&
            board[i * 3 + 2] === currentPlayer) {
            return currentPlayer;
        }
    }

    // Columns
    for (let i = 0; i < 3; i++) {
        if (board[i] === currentPlayer &&
            board[i + 3] === currentPlayer &&
            board[i + 6] === currentPlayer) {
            return currentPlayer;
        }
    }

    // Diagonals
    if ((board[0] === currentPlayer && board[4] === currentPlayer && board[8] === currentPlayer) ||
        (board[2] === currentPlayer && board[4] === currentPlayer && board[6] === currentPlayer)) {
        return currentPlayer;
    }

    // Check for a draw
    if (board.every(cell => cell !== '')) {
        return "Draw";
    }

    return null; // No winner or draw yet
}
document.getElementById('result').style.display = 'none';

// Function to show the winner
function showWinner(winner) {
    const resultDiv = document.getElementById('result');
    const playerWon = document.getElementById('palyerWon');
    const symbolWon = document.getElementById('symbolWon');
    
    if (winner === "Draw") {
        playerWon.textContent = "Game is Draw";
        symbolWon.textContent = "";
    } else {
        const winnerName = winner === 'O' ? player1Name : player2Name;
        playerWon.textContent = `${winnerName} Wins!`;
        symbolWon.textContent = `Symbol: ${winner}`;
    }
    
    resultDiv.style.display = 'block'; // Show the result section
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'O'; // Start with player 'O'
    document.querySelectorAll('.input-game-pad').forEach(cell => {
        cell.value = '';
        cell.disabled = false;
    });
     // Hide result section
}
function submitDetails() {
    const name1 = document.getElementById('player1').value;
    const name2 = document.getElementById('player2').value;
    if (name1 && name2) {
        setPlayerNames(name1, name2);
    } else {
        alert('Please enter names for both players.');
    }
}

// Function to handle "Play Again" button
function playAgain() {
    resetGame();
    display('sectionHome');
}

// Function to handle "Close" button
function closeGame() {
    window.close(); // Close the window/tab
}

// Attach event listeners to each cell
document.querySelectorAll('.input-game-pad').forEach((cell, index) => {
    cell.addEventListener('click', () => cellClick(`cell${index + 1}`));
});

// Attach event listeners to the result buttons
display('sectionWelcome');