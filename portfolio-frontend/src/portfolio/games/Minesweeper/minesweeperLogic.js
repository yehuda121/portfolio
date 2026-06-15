// minesweeperLogic.js

export const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export function createBoard(size, numMines) {
  const board = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      isMine: false,
      isOpen: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  placeMines(board, size, numMines);
  calculateAdjacents(board, size);

  return board;
}

export function placeMines(board, size, numMines) {
  let placed = 0;
  while (placed < numMines) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    if (!board[x][y].isMine) {
      board[x][y].isMine = true;
      placed++;
    }
  }
}

export function calculateAdjacents(board, size) {
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (board[x][y].isMine) continue;

      let count = 0;
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < size &&
          ny >= 0 &&
          ny < size &&
          board[nx][ny].isMine
        ) {
          count++;
        }
      }
      board[x][y].adjacentMines = count;
    }
  }
}

// flood reveal
export function floodReveal(board, x, y) {
  const size = board.length;
  const stack = [[x, y]];

  while (stack.length) {
    const [cx, cy] = stack.pop();

    if (
      cx < 0 ||
      cx >= size ||
      cy < 0 ||
      cy >= size ||
      board[cx][cy].isOpen ||
      board[cx][cy].isFlagged
    ) {
      continue;
    }

    board[cx][cy].isOpen = true;

    if (board[cx][cy].adjacentMines === 0 && !board[cx][cy].isMine) {
      for (const [dx, dy] of directions) {
        stack.push([cx + dx, cy + dy]);
      }
    }
  }
}

export function checkWin(board) {
  for (let row of board) {
    for (let cell of row) {
      if (!cell.isMine && !cell.isOpen) return false;
    }
  }
  return true;
}
