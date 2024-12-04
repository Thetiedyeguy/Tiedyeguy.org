import React, { useState } from 'react';
import styles from './TicTacToe.module.css';
import WinnerModal from './Winner';

const TicTacToe = () => {


    
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);
  
    const handleClick = (index) => {
      if (board[index] || winner) return; // Prevent clicking if there's already a winner
      const newBoard = [...board];
      newBoard[index] = isXNext ? 'X' : 'O';
      setBoard(newBoard);
      setIsXNext(!isXNext);
      checkWinner(newBoard);
    };
  
    const checkWinner = (newBoard) => {
      // Add your winner detection logic here
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
          setWinner(newBoard[a]);
          return;
        }
      }

      for (let entry of newBoard){
        if (entry === null){
            return;
        }
      }
      setWinner('tie');
    };
  
    const resetGame = () => {
      setBoard(Array(9).fill(null));
      setIsXNext(true);
      setWinner(null);
    };
  
    return (
      <div>
        <div className={styles.board}>
          {board.map((square, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className= {styles.square}
            >
              {square}
            </button>
          ))}
        </div>
        <WinnerModal winner={winner} onClose={resetGame} />
      </div>
    );
  };


  
  export default TicTacToe;
  