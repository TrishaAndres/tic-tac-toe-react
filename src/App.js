import React, { useState } from "react";
import "./App.css";

function App() {
  const emptyBoard = Array(3).fill(null).map(() => Array(3).fill(""));
  const [board, setBoard] = useState(emptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const checkWinner = (newBoard) => {
    const lines = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (
        newBoard[a[0]][a[1]] &&
        newBoard[a[0]][a[1]] === newBoard[b[0]][b[1]] &&
        newBoard[a[0]][a[1]] === newBoard[c[0]][c[1]]
      ) {
        return newBoard[a[0]][a[1]];
      }
    }

    // Check for tie
    const isTie = newBoard.every(row => row.every(cell => cell));
    return isTie ? "Tie" : null;
  };

  const handleClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
    } else {
      setCurrentPlayer(prev => (prev === "X" ? "O" : "X"));
    }
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {winner ? (
        <div className="status">
          {winner === "Tie" ? "It's a Tie!" : `Player ${winner} Wins!`}
        </div>
      ) : (
        <div className="status">Current Player: {currentPlayer}</div>
      )}

      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </button>
          ))
        )}
      </div>

      {winner && (
        <button className="reset-btn" onClick={resetGame}>
          Play Again
        </button>
      )}
    </div>
  );
}

export default App;
