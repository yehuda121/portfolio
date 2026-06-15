// snakeUtils.js
import { ROWS, COLS } from "./snakeConstants";

// Generate a new random food position that is not on the snake
export const generateRandomFood = (snake) => {
  const occupied = new Set(snake.map((s) => `${s.x},${s.y}`));
  const freeCells = [];

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!occupied.has(`${x},${y}`)) freeCells.push({ x, y });
    }
  }

  if (freeCells.length === 0) {
    return { x: 0, y: 0 };
  }

  return freeCells[Math.floor(Math.random() * freeCells.length)];
};

// Build a matrix representing the grid: 0 = empty, 1 = snake, 2 = food
export const generateMatrix = (snake, food) => {
  const matrix = Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  snake.forEach((segment) => {
    if (
      segment.y >= 0 &&
      segment.y < ROWS &&
      segment.x >= 0 &&
      segment.x < COLS
    ) {
      matrix[segment.y][segment.x] = 1;
    }
  });

  if (
    food.y >= 0 &&
    food.y < ROWS &&
    food.x >= 0 &&
    food.x < COLS
  ) {
    matrix[food.y][food.x] = 2;
  }

  return matrix;
};
