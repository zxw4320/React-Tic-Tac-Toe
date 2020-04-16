import React from 'react';
import Board from './board.js'

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{squares: Array(9).fill(null)}],
            turnNumber: 0,
            xTurn: true
        }
    }

    calculateWinner(squares) {
        const lines = [ [0, 1, 2],
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
                return {
                    winner: squares[a],
                    line: lines[i],
                    draw: false
                };
            }
        }
        
        let draw = true;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === null) {
                draw = false;
                break;
            }
        }

        return {
            winner: null,
            line: null,
            draw: draw
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.turnNumber + 1);
        const current = history[history.length -1];
        const squares = current.squares.slice();

        if(this.calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xTurn ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            turnNumber: history.length,
            xTurn: !this.state.xTurn
        });
    }

    jumpTo(step) {
        this.setState({
            turnNumber: step,
            xTurn: (step%2) === 0
        });
    }
    
    render() {
        const history = this.state.history;
        const current = history[this.state.turnNumber];
        const winnerInfo = this.calculateWinner(current.squares);
        const winner = winnerInfo.winner;
        const draw = winnerInfo.draw;

        const moves = history.map((step, move) => {
            const desc = move ? 
                'Go to move # ' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        let status;
        if (winner){
            status = 'Winner: ' + winnerInfo.winner;
        } else if (draw){
            status = 'Draw'
        } else {
            status = 'Next Player: ' + (this.state.xTurn ? 'X' : 'O');
        }

        return (
            <div className="game">
            <div className="game-board">
                <Board 
                    squares = {current.squares}
                    onClick = {(i) => this.handleClick(i)}
                    winLine = {winnerInfo.line}  
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
            </div>
        );
    }
}

export default Game;