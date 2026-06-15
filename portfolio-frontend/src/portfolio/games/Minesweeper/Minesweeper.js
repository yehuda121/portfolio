// Minesweeper.jsx / Minesweeper.js
import React, { useState, useEffect } from "react";
import "./Minesweeper.css";
import { useTranslation } from "react-i18next";
import InlineAlert from "../../../components/ui/InlineAlert/InlineAlert";
import { createBoard, floodReveal, checkWin } from "./minesweeperLogic";

const Minesweeper = () => {
  // Game state
  const [boardSize, setBoardSize] = useState(10);
  const [numMines, setNumMines] = useState(13);
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");

  const { t } = useTranslation();

  // Initialize board when size or mine count changes
  useEffect(() => {
    initializeBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardSize, numMines]);

  // Create a fresh board and reset game state
  const initializeBoard = () => {
    const safeMines = Math.min(numMines, boardSize * boardSize - 1);
    const newBoard = createBoard(boardSize, safeMines);
    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
  };

  // Handle left-click: open a cell
  const handleClick = (x, y) => {
    if (gameOver || gameWon || !board.length) return;

    const size = board.length;
    if (x < 0 || x >= size || y < 0 || y >= size) return;

    const currentBoard = board.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    const cell = currentBoard[x][y];

    if (cell.isOpen || cell.isFlagged) return;

    // If clicked on a mine -> game over
    if (cell.isMine) {
      setGameOver(true);

      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (currentBoard[i][j].isMine) {
            currentBoard[i][j].isOpen = true;
          }
        }
      }

      setBoard(currentBoard);
      return;
    }

    // Reveal safe area
    floodReveal(currentBoard, x, y);
    setBoard(currentBoard);

    // Check win condition
    if (checkWin(currentBoard)) {
      setGameWon(true);
    }
  };

  // Handle right-click: toggle flag
  const handleRightClick = (event, x, y) => {
    event.preventDefault();
    if (gameOver || gameWon || !board.length) return;

    const size = board.length;
    if (x < 0 || x >= size || y < 0 || y >= size) return;

    const currentBoard = board.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    const cell = currentBoard[x][y];

    if (cell.isOpen) return;

    cell.isFlagged = !cell.isFlagged;
    setBoard(currentBoard);
  };

  // Handle difficulty selection changes
  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setDifficulty(selectedDifficulty);

    switch (selectedDifficulty) {
      case "easy":
        setBoardSize(8);
        setNumMines(8);
        break;
      case "hard":
        setBoardSize(12);
        setNumMines(20);
        break;
      case "very-hard":
        setBoardSize(16);
        setNumMines(40);
        break;
      default:
        break;
    }
  };

  // Count flags and remaining mines (can be negative by request)
  const flagsPlaced = board.length ? board.reduce(
    (acc, row) => acc + row.filter((cell) => cell.isFlagged).length, 0) : 0;
  const minesRemaining = numMines - flagsPlaced;

  // Notification content
  const notificationType = gameWon ? "success" : gameOver ? "error" : null;
  const notificationMessage = gameWon
    ? t("minesweeper.winMessage") : gameOver
    ? t("minesweeper.loseMessage") : "";

  return (
    <div className="ms-page">
      <div className="ms-header">
        <h1 className="ms-title">{t("minesweeper.title")}</h1>
        <p className="ms-instructions">{t("minesweeper.instructions")}</p>
      </div>

      <div className="ms-panel">
        <label className="ms-label" htmlFor="difficulty">
          {t("minesweeper.difficultyLabel")}
        </label>

        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="ms-select"
        >
          <option value="easy">{t("minesweeper.difficultyEasy")}</option>
          <option value="hard">{t("minesweeper.difficultyMedium")}</option>
          <option value="very-hard">{t("minesweeper.difficultyHard")}</option>
        </select>

        <button className="ms-btn" onClick={initializeBoard}>
          {t("minesweeper.buttonStartOver")}
        </button>

        <div className="ms-mines-remaining">
          {t("minesweeper.minesRemainingLabel")}: {minesRemaining}
        </div>
      </div>

      {notificationType && (
        <InlineAlert type={notificationType} message={notificationMessage} />
      )}

      <div className="ms-board">
        {board.map((row, x) => (
          <div key={x} className="ms-row">
            {row.map((cell, y) => (
              <div
                key={`${x}-${y}`}
                className={`ms-cell
                  ${cell.isOpen ? "open" : ""}
                  ${cell.isFlagged ? "flag" : ""}
                  ${cell.isMine && cell.isOpen ? "mine" : ""}`}
                onClick={() => handleClick(x, y)}
                onContextMenu={(event) => handleRightClick(event, x, y)}
              >
                {cell.isOpen && !cell.isMine && cell.adjacentMines > 0 ? (
                  <span className="ms-number" data-number={cell.adjacentMines}>
                    {cell.adjacentMines}
                  </span>
                ) : null}

                {cell.isOpen && cell.isMine && (
                  <img
                    src="/mine.png"
                    alt={t("minesweeper.mineAlt")}
                    className="ms-mine-img"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Minesweeper;
