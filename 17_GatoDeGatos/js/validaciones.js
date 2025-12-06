let boards = Array(9).fill(null).map(() => Array(9).fill(null));
let bigBoard = Array(9).fill(null);
let currentPlayer = 'X';
let activeBoard = null;
let gameWinner = null;

// Cargar scores al iniciar
loadScores();

function loadScores() {
  fetch('/api/juego/scores')
    .then(res => res.json())
    .then(scores => {
      document.getElementById('scoreX').textContent = scores.X || 0;
      document.getElementById('scoreO').textContent = scores.O || 0;
    })
    .catch(err => console.error('Error al cargar scores:', err));
}

function initGame() {
  boards = Array(9).fill(null).map(() => Array(9).fill(null));
  bigBoard = Array(9).fill(null);
  currentPlayer = 'X';
  activeBoard = null;
  gameWinner = null;
  document.getElementById('winnerMessage').style.display = 'none';
  renderBoard();
}

function renderBoard() {
  const container = document.getElementById('ultimateBoard');
  container.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    const miniBoard = document.createElement('div');
    miniBoard.className = 'mini-board';
    
    if (activeBoard === null || activeBoard === i) {
      if (!bigBoard[i]) miniBoard.classList.add('active');
    } else {
      miniBoard.classList.add('disabled');
    }

    if (bigBoard[i]) {
      miniBoard.classList.add('won');
      const overlay = document.createElement('div');
      overlay.className = `winner-overlay ${bigBoard[i]}`;
      overlay.textContent = bigBoard[i];
      miniBoard.appendChild(overlay);
    }

    for (let j = 0; j < 9; j++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      
      if (boards[i][j]) {
        cell.textContent = boards[i][j];
        cell.classList.add(boards[i][j], 'taken');
      } else if (!bigBoard[i] && !gameWinner) {
        cell.onclick = () => makeMove(i, j);
      }

      miniBoard.appendChild(cell);
    }

    container.appendChild(miniBoard);
  }

  document.getElementById('currentPlayer').textContent = currentPlayer;
}

function makeMove(boardIdx, cellIdx) {
  if (gameWinner) return;
  if (bigBoard[boardIdx]) return;
  if (boards[boardIdx][cellIdx]) return;
  if (activeBoard !== null && activeBoard !== boardIdx) return;

  boards[boardIdx][cellIdx] = currentPlayer;

  const winner = checkWinner(boards[boardIdx]);
  if (winner) {
    bigBoard[boardIdx] = winner;
    const bigWinner = checkWinner(bigBoard);
    if (bigWinner) {
      gameWinner = bigWinner;
      showWinner(bigWinner);
      updateScore(bigWinner);
    }
  }

  activeBoard = bigBoard[cellIdx] ? null : cellIdx;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  renderBoard();
}

function checkWinner(board) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  for (let line of lines) {
    const [a,b,c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) return 'Empate';
  return null;
}

function showWinner(winner) {
  const msg = document.getElementById('winnerMessage');
  msg.textContent = winner === 'Empate' ? '¡Empate!' : `¡Ganador: ${winner}!`;
  msg.style.display = 'block';
}

function updateScore(winner) {
  if (winner === 'Empate') return;
  
  fetch('/api/juego/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ winner })
  })
  .then(res => res.json())
  .then(() => loadScores())
  .catch(err => console.error('Error al actualizar score:', err));
}

function resetGame() {
  initGame();
}

function resetScores() {
  if (confirm('¿Seguro que quieres resetear los scores?')) {
    fetch('/api/juego/reset', { method: 'POST' })
      .then(res => res.json())
      .then(() => loadScores())
      .catch(err => console.error('Error al resetear scores:', err));
  }
}

initGame();