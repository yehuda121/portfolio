// snakeConstants.js

export const ROWS = 20;
export const COLS = 20;
export const CELL_SIZE = 20;

export const INITIAL_SPEED = 200;
export const SPEED_INCREMENT = 10;
export const SPEED_THRESHOLD = 5;

export const Direction = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
];
