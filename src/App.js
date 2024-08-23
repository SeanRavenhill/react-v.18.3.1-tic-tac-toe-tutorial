import { useState } from 'react';

// Square component represents a single square on the Tic-Tac-Toe board
function Square({ value, onSquareClick }) {
  return (
    <>
      {/* Button representing the square, clicking it triggers the onSquareClick function */}
      <button className='square' onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
}

// Board component represents the entire Tic-Tac-Toe board
export default function Board() {
  // State to store the current state of the squares (null, 'X', or 'O')
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  // State to track whether it's X's turn (true) or O's turn (false)
  const [xIsNext, setXIsNext] = useState(true);

  // Function to handle the click event on a square
  function handleClick(i) {
    // If the square is already filled or there is a winner, do nothing
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    // Create a copy of the squares array to avoid mutating the original state
    const nextSquares = squares.slice();
    
    // Assign 'X' or 'O' to the clicked square based on the current player
    xIsNext ? (nextSquares[i] = 'X') : (nextSquares[i] = 'O');
    
    // Update the squares state with the new move
    setSquares(nextSquares);
    
    // Switch the turn to the next player
    setXIsNext(!xIsNext);
  }

  // Calculate the winner of the game (if there is one)
  const winner = calculateWinner(squares);
  
  // Determine the game status message (either showing the winner or indicating the next player)
  let status;
  winner ? status = `Winner: ${winner}` : status = `Next player: ${xIsNext ? 'X' : 'O'}`; 

  return (
    <>
      {/* Display the game status */}
      <div className="status">{status}</div>

      {/* Render the three rows of the Tic-Tac-Toe board */}
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Helper function to calculate the winner of the game
function calculateWinner(squares) {
  // Possible winning combinations on the board
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check each combination to see if there's a winner
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // Return the winner ('X' or 'O')
    }
  }

  // If no winner, return null
  return null;
}
