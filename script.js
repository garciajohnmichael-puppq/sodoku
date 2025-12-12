// Initial settings
let selectedDifficulty = 'medium';
let selectedMode = 'classic';
let musicOn = true;
let soundOn = true;

// Difficulty selection
document.querySelectorAll('.difficulty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedDifficulty = btn.dataset.diff;
  });
});

// Mode selection
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedMode = btn.dataset.mode;
  });
});

// Start game
document.getElementById('startBtn').addEventListener('click', () => {
  document.querySelector('.startup-screen').classList.add('hidden');
  document.querySelector('.game-ui').classList.remove('hidden');

  if (selectedMode === 'classic') {
    startClassicMode();
  } else if (selectedMode === 'symbol') {
    startEmojiMode();
  }
});

// Toggle music
document.getElementById('toggle-music').addEventListener('click', () => {
  musicOn = !musicOn;
  document.querySelector('#toggle-music span').textContent = musicOn ? 'On' : 'Off';
});

// Toggle sounds
document.getElementById('toggle-sound').addEventListener('click', () => {
  soundOn = !soundOn;
  document.querySelector('#toggle-sound span').textContent = soundOn ? 'On' : 'Off';
});


// ========== GAME LOGIC ========== //

function startClassicMode() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  board.className = 'sudoku-board';

  const puzzle = getClassicPuzzle(selectedDifficulty);

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const value = puzzle[row][col];
      if (value !== 0) {
        cell.textContent = value;
        cell.classList.add('prefilled');
      } else {
        cell.setAttribute('contenteditable', 'true');
        cell.classList.add('editable');
      }

      board.appendChild(cell);
    }
  }
}

// Example: Use different fill amounts for each difficulty
function getClassicPuzzle(diff) {
  const easy = [
    [3,2,1,0,0,9,0,6,8],
    [4,9,7,0,2,0,0,1,3],
    [0,6,5,0,7,1,2,4,9],
    [5,4,0,7,0,0,0,0,6],
    [0,0,2,0,0,0,0,5,0],
    [0,0,6,2,9,0,0,0,4],
    [0,5,8,1,0,0,0,0,0],
    [0,3,9,6,0,0,0,8,0],
    [0,0,4,9,8,2,0,0,0]
  ];

  const medium = [
    [0,0,0,0,3,0,0,0,8],
    [0,0,7,8,0,0,0,1,3],
    [1,0,0,0,7,0,2,0,0],
    [0,4,0,7,0,0,0,0,0],
    [0,0,2,0,0,0,0,5,0],
    [0,0,0,0,9,0,0,0,4],
    [0,5,0,1,0,0,0,0,0],
    [0,3,9,0,0,0,0,8,0],
    [0,0,4,9,8,2,0,0,0]
  ];

  const hard = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,3,0,0,0],
    [0,0,1,0,0,0,0,0,0],
    [0,0,0,7,0,0,0,0,6],
    [0,0,0,0,0,0,0,5,0],
    [0,0,6,0,9,0,0,0,0],
    [0,5,0,0,0,0,0,0,0],
    [0,3,0,0,0,0,0,8,0],
    [0,0,0,0,0,2,0,0,0]
  ];

  if (diff === 'easy') return easy;
  if (diff === 'hard') return hard;
  return medium;
}

function startEmojiMode() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  board.className = 'sudoku-board';

  const symbols = ['🍎','🍌','🍇','🍉','🍒','🍍','🥝','🍓','🍑'];
  const puzzle = getClassicPuzzle(selectedDifficulty); // reuse classic layout

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      const value = puzzle[row][col];
      if (value !== 0) {
        cell.textContent = symbols[value - 1];
        cell.classList.add('prefilled');
      } else {
        cell.setAttribute('contenteditable', 'true');
        cell.classList.add('editable');
      }

      board.appendChild(cell);
    }
  }
}
