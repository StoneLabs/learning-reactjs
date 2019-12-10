import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function calculateWinner(squares) {
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    state = {
        winner: null,
        nextPlayer: true, //false=O true=X
        values: Array(9).fill(null),
    }

    player() {
        return this.state.nextPlayer ? "X" : "O";
    }

    renderRow(i) {
        return (
            <div className="board-row">
                {this.renderSquare(3*i+0)}
                {this.renderSquare(3*i+1)}
                {this.renderSquare(3*i+2)}
            </div>
        );
    }

    renderSquare(i) {
      return <Square id={i} value={this.state.values[i]}
                     onClick={() => this.handleClick(i)}/>;
    }

    handleClick(i) {
        if (this.state.winner) return;
        if (this.state.values[i]) return;
        const newValues = this.state.values.slice();
        newValues[i] = this.player();
        this.setState({nextPlayer: !this.state.nextPlayer, values: newValues, winner: calculateWinner(newValues)});
    }
  
    render() {
        let status;
        if (this.state.winner) {
            status = "Winner: " + this.state.winner;
        } else {
            status = "Next player: " + this.player();
        }

        return (
            <div>
                    <div className="status">{status}</div>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-status">
                    <div>{/*status*/}</div>
                    <ol>{/*todo*/}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));