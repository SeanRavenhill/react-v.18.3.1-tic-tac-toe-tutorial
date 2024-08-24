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
function Board({ xIsNext, squares, onPlay }) {

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
    
    // Call the onPlay function, passing the updated squares array to the parent component
    onPlay(nextSquares);
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

export default function Game() {

  // State to store the history of the board's states (each move creates a new state)
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // State to track the current move index
  const [currentMove, setCurrentMove] = useState(0);

  // The current squares to be displayed on the board (based on the move index)
  const currentSquares = history[currentMove];

  // Determine the next player based on the current move (X if even, O if odd)
  const xIsNext = currentMove % 2 === 0;

   // Function to handle a new move (updates history and current move)
  function handlePlay(nextSquares) {
    // Create a new history array, discarding any "future" history if we are jumping back
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // Update the history state with the new history and set the current move to the latest
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  // Function to jump to a specific move in the game history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    // Create a description for each move
    move > 0 ? description = `Got to move #${move}` : description = `Go to game start`;

    // Return a list item with a button to jump to the specific move
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* Pass the necessary props to the Board component */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        {/* Display the list of moves */}
        <ol>{moves}</ol>
      </div>
    </div>
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
