import React from 'react';
import Square from './square.js'

class Board extends React.Component {  
    renderSquare(i) {
        const winLine = this.props.winLine;
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                highlight={winLine && winLine.includes(i)}
            />
        );
    }
  
    render() {
        const board = [];
        for (let i = 0; i < 3; i++){
            const row = [];
            for (let j = 0; j < 3; j++){
                row.push(this.renderSquare(i*3 + j));
            }
            board.push(<div className="board-row">{row}</div>);
        }

        return (
            <div>{board}</div>
        );
    }
}

export default Board;