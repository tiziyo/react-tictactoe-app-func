import "./App.css";
import Board from "./components/Board";

function App() {
  return (
    <div className="game">
      <div className="game-board">
        <Board xxx="JJJ" />
      </div>
      <div className="game-info">Game Info</div>
    </div>
  );
}

export default App;
