// snakeLogic.js

import { ROWS, COLS, Direction } from "./snakeConstants";

// Returns a new head object based on direction
export const getNewHeadPosition = (head, direction) => {
  switch (direction) {
    case Direction.UP:
      return { x: head.x, y: head.y - 1 };
    case Direction.DOWN:
      return { x: head.x, y: head.y + 1 };
    case Direction.LEFT:
      return { x: head.x - 1, y: head.y };
    case Direction.RIGHT:
      return { x: head.x + 1, y: head.y };
    default:
      return head;
  }
};

// Check wall or self collision
export const checkCollision = (snake) => {
  const head = snake[0];
  const body = snake.slice(1);

  if (
    head.x < 0 ||
    head.x >= COLS ||
    head.y < 0 ||
    head.y >= ROWS ||
    body.some((s) => s.x === head.x && s.y === head.y)
  ) {
    return true;
  }

  return false;
};

// Return true if head touches food
export const checkEatingFood = (snake, food) => {
  const head = snake[0];
  return head.x === food.x && head.y === food.y;
};
