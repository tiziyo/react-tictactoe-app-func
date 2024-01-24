import { useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {

  const [history, setHistory] = useState([{ squares: Array(9).fill(null)}]);
  const [IsValO, setIsValO] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const caculateWinner = (squares) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const current = history[stepNumber];
  const winner = caculateWinner(current.squares);
 
  let status;
  if (winner) {
    status = `Winner is ${winner} `;
  } else {
    status = `Next Player is ${IsValO ? "X" : "O"} `;
  }

  const handleClick = (i) => {

    //console.log(i);
    console.log("stepNumber:", stepNumber);
    const history_copy = history.slice(0, stepNumber + 1 );
    const new_current = history_copy[stepNumber];
    const squares_copy = new_current.squares.slice();

    if ( caculateWinner(squares_copy) || squares_copy[i]) {
      return;
    }

    squares_copy[i] = IsValO ? "X" : "O";
    setHistory([...history_copy, {squares: squares_copy}]);
    // setIsValO(!IsValO);
    setIsValO(prev => !prev);

    setStepNumber(stepNumber + 1);
  }; 

  const moves = history.map((step, move) => {

    console.log("step:", step);
    console.log("move:", move);

    const desc = move ? 
      'Go to move #' + move :
      'Go to game start' ;
    return (
      <li key={move}>
        <button className="move-button" onClick={() => jumpTo(move)}> {desc} </button>
      </li>
    );
  });

  const jumpTo = (step) => {
    setStepNumber(step);
    setIsValO((step % 2) === 0);
  };

  return (
    <div className="game"> 
      <div className="title">TIC TAC TOE</div>
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div className="status"> {status} </div>
        <ol style={{listStyle: 'none'}}>
          {moves}
        </ol>
      </div>
    </div>
  );
}
  
export default App;
