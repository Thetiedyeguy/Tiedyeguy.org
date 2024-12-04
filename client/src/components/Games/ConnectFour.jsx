import React, { useState } from 'react';
import WinnerModal from './Winner';
import styles from './ConnectFour.module.css';

const ConnectFour = () => {
  const rows = 6;
  const cols = 7;
  const [board, setBoard] = useState(Array(rows).fill(null).map(() => Array(cols).fill(null)));
  const [isRedNext, setIsRedNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [hoverCol, setHoverCol] = useState(null);

  const handleClick = (col) => {
    if (winner) return;

    // Find the lowest empty row in the selected column
    for (let row = rows - 1; row >= 0; row--) {
      if (!board[row][col]) {
        const newBoard = board.map((r) => [...r]); // Clone the board
        newBoard[row][col] = isRedNext ? 'Red' : 'Yellow';
        setBoard(newBoard);
        checkWinner(newBoard, row, col);
        setIsRedNext(!isRedNext);
        setHoverCol(null);
        break;
      }
    }
  };

  const checkWinner = (newBoard, row, col) => {
    const color = newBoard[row][col];

    // Helper function to check in a direction
    const countInDirection = (dx, dy) => {
      let count = 0;
      let r = row + dx;
      let c = col + dy;
      while (r >= 0 && r < rows && c >= 0 && c < cols && newBoard[r][c] === color) {
        count++;
        r += dx;
        c += dy;
      }
      return count;
    };

    // Check all directions (vertical, horizontal, diagonal)
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal /
      [1, -1], // Diagonal \
    ];

    for (const [dx, dy] of directions) {
      const count =
        1 + countInDirection(dx, dy) + countInDirection(-dx, -dy);
      if (count >= 4) {
        setWinner(color);
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(rows).fill(null).map(() => Array(cols).fill(null)));
    setIsRedNext(true);
    setWinner(null);
    setHoverCol(null);
  };

  const handleMouseEnter = (col) => {
    setHoverCol(col); // Track the hovered column
  };

  const handleMouseLeave = () => {
    setHoverCol(null); // Clear hover state
  };

  return (
    <div className={styles.container}>
      <h1>Connect Four</h1>
      <div className={styles.board}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => {
              const isHovered =
                hoverCol === colIndex &&
                board[rowIndex][colIndex] === null && // Ensure the spot is empty
                (rowIndex === rows - 1 || board[rowIndex + 1][colIndex] !== null); // Lowest empty spot
              return (
                <div
                  key={colIndex}
                  className={`${styles.cell} ${
                    cell === 'Red' ? styles.red : cell === 'Yellow' ? styles.yellow : isHovered ? styles.hover : ''
                  }`}
                  onClick={() => handleClick(colIndex)}
                  onMouseEnter={() => handleMouseEnter(colIndex)}
                  onMouseLeave={handleMouseLeave}
                />
              );
            })}
          </div>
        ))}
      </div>
      <WinnerModal winner={winner} onClose={resetGame} />
    </div>
  );
};

export default ConnectFour;
