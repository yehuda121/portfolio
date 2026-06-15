// Snake.jsx / Snake.js
import React, { useState, useEffect, useRef } from "react";
import "./Snake.css";
import { useTranslation } from "react-i18next";
import {
  ROWS,
  COLS,
  INITIAL_SPEED,
  SPEED_INCREMENT,
  SPEED_THRESHOLD,
  Direction,
  INITIAL_SNAKE,
} from "./snakeConstants";
import { generateRandomFood, generateMatrix } from "./snakeUtils";
import { getNewHeadPosition, checkCollision, checkEatingFood } from "./snakeLogic";
import { apiFetch, isApiConfigured } from "../../../api/client";
import InlineAlert from "../../../components/ui/InlineAlert/InlineAlert";

const Snake = () => {
  // Game state
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(generateRandomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(Direction.RIGHT);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const [foodsEaten, setFoodsEaten] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [apiMessage, setApiMessage] = useState(null);
  const gameLoop = useRef(null);
  const directionQueue = useRef([]);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const { t } = useTranslation();

  const fetchBestScore = async () => {
    if (!isApiConfigured()) {
      setApiMessage(t("snake.apiNotConfigured"));
      return;
    }

    const result = await apiFetch("/api/snake/best-score");
    if (!result.ok) {
      setApiMessage(
        result.error === "aws_not_configured"
          ? t("snake.apiAwsNotConfigured")
          : t("snake.apiError")
      );
      return;
    }

    if (typeof result.data?.bestScore === "number") {
      setBestScore(result.data.bestScore);
      setApiMessage(null);
    }
  };

  const submitScore = async (score) => {
    if (!isApiConfigured()) return;

    const result = await apiFetch("/api/snake/submit-score", {
      method: "POST",
      body: JSON.stringify({ score }),
    });

    if (!result.ok) {
      setApiMessage(
        result.error === "aws_not_configured"
          ? t("snake.apiAwsNotConfigured")
          : t("snake.apiError")
      );
      return;
    }

    if (typeof result.data?.bestScore === "number") {
      setBestScore(result.data.bestScore);
    }
  };

  useEffect(() => {
    fetchBestScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gameOver) {
      submitScore(foodsEaten);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameOver, foodsEaten]);

  // Keyboard input (arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      let newDirection = direction;

      e.preventDefault();

      switch (e.key) {
        case "ArrowUp":
          if (direction !== Direction.DOWN) newDirection = Direction.UP;
          break;
        case "ArrowDown":
          if (direction !== Direction.UP) newDirection = Direction.DOWN;
          break;
        case "ArrowLeft":
          if (direction !== Direction.RIGHT) newDirection = Direction.LEFT;
          break;
        case "ArrowRight":
          if (direction !== Direction.LEFT) newDirection = Direction.RIGHT;
          break;
        default:
          break;
      }

      if (
        directionQueue.current[directionQueue.current.length - 1] !==
        newDirection
      ) {
        directionQueue.current.push(newDirection);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Touch input (swipe)
  useEffect(() => {
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
    };

    const handleTouchMove = (e) => {
      if (touchStartX.current == null || touchStartY.current == null) return;

      const touch = e.touches[0];
      const diffX = touch.clientX - touchStartX.current;
      const diffY = touch.clientY - touchStartY.current;

      let newDirection = direction;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 0 && direction !== Direction.LEFT) {
          newDirection = Direction.RIGHT;
        } else if (diffX < 0 && direction !== Direction.RIGHT) {
          newDirection = Direction.LEFT;
        }
      } else {
        // Vertical swipe
        if (diffY > 0 && direction !== Direction.UP) {
          newDirection = Direction.DOWN;
        } else if (diffY < 0 && direction !== Direction.DOWN) {
          newDirection = Direction.UP;
        }
      }

      if (
        directionQueue.current[directionQueue.current.length - 1] !==
        newDirection
      ) {
        directionQueue.current.push(newDirection);
      }

      touchStartX.current = null;
      touchStartY.current = null;

      e.preventDefault();
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [direction]);

  // Move snake one step
  const moveSnake = () => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];

      // Use queued direction if exists
      let newDirection = direction;
      if (directionQueue.current.length > 0) {
        newDirection = directionQueue.current.shift();
        setDirection(newDirection);
      }

      // Compute new head position using pure logic helper
      const newHead = getNewHeadPosition(head, newDirection);

      // Basic wall collision check (redundant but safe with checkCollision)
      if (
        newHead.x < 0 ||
        newHead.x >= COLS ||
        newHead.y < 0 ||
        newHead.y >= ROWS
      ) {
        setGameOver(true);
        clearInterval(gameLoop.current);
        return prevSnake;
      }

      // Move the snake forward: new head + previous body (without last segment)
      return [newHead, ...prevSnake.slice(0, -1)];
    });
  };

  // Game loop: collisions & eating
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Collision with wall or self (pure logic)
    if (checkCollision(snake)) {
      setGameOver(true);
      clearInterval(gameLoop.current);
    } else if (checkEatingFood(snake, food)) {
      // Grow the snake by duplicating the last segment
      setSnake((prevSnake) => {
        const tail = prevSnake[prevSnake.length - 1];
        return [...prevSnake, { x: tail.x, y: tail.y }];
      });

      // Spawn new food
      setFood(generateRandomFood(snake));

      // Update score and possibly increase speed
      setFoodsEaten((prev) => {
        const next = prev + 1;
        if (next % SPEED_THRESHOLD === 0) {
          setSpeed((prevSpeed) =>
            Math.max(50, prevSpeed - SPEED_INCREMENT)
          );
        }
        return next;
      });
    }
  }, [snake, food]);

  // Main game interval — moveSnake intentionally excluded to avoid interval resets
  useEffect(() => {
    if (!gameOver) {
      clearInterval(gameLoop.current);
      gameLoop.current = setInterval(() => {
        moveSnake();
      }, speed);

      return () => clearInterval(gameLoop.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, gameOver, direction]);

  // Render grid cells
  const renderGrid = () => {
    const matrix = generateMatrix(snake, food);
    const cells = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const value = matrix[row][col];
        cells.push(
          <div
            key={`${row}-${col}`}
            className={`cell ${value === 1 ? "snake" : ""} ${
              value === 2 ? "food" : ""
            }`}
          ></div>
        );
      }
    }

    return cells;
  };

  // Restart the game
  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateRandomFood(INITIAL_SNAKE));
    setDirection(Direction.RIGHT);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setFoodsEaten(0);
    directionQueue.current = [];
  };

  return (
    <div className="snake-game" dir="ltr">
      <div className="snake-card">
        {/* Header: title + instructions */}
        <div className="snake-header">
          <h2>{t("snake.title")}</h2>
          <p>{t("snake.subtitle")}</p>
        </div>

        {/* Game grid */}
        <div className="grid" style={{ "--rows": ROWS, "--cols": COLS }}>
          {renderGrid()}
        </div>

        {/* Footer: score */}
        {apiMessage && <InlineAlert type="warning" message={apiMessage} />}

        <div className="snake-footer">
          <span className="snake-score">
            {t("snake.scoreLabel")}: {foodsEaten}
          </span>
          <span className="snake-best">
            {t("snake.bestLabel")}: {bestScore}
          </span>
        </div>

        {/* Game over overlay */}
        {gameOver && (
          <div className="overlay">
            <h1>{t("snake.gameOverTitle")}</h1>
            <button onClick={restartGame}>{t("snake.restartButton")}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Snake;
