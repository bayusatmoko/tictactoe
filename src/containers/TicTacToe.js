import React, {useState, useEffect} from "react";
import Board from "../components/Board";

const calculateWinner = (squares) => {
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
    let empty = 0
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(!squares[a] || !squares[b] || !squares[c]) empty++
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    if(empty === 0) return "tie"
    return null;
}

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [score, setScore] = useState({
        "O": 0,
        "X": 0,
        "tie": 0
    })
    const [xIsNext, setXisNext] = useState(true);

    useEffect(() => {
        const savedBoard = JSON.parse(localStorage.getItem('board', Array(9).fill(null)));
        const savedScore = JSON.parse(localStorage.getItem('score', {
            "O": 0,
            "X": 0,
            "tie": 0
        }));
        setXisNext(JSON.parse(localStorage.getItem('xIsNext', true)));
        if (savedBoard) setBoard(savedBoard);
        if (savedScore) setScore(savedScore);
    }, []);

    const winner = calculateWinner(board);
    if(winner) {
        let scoreCopy = {...score};
        scoreCopy[winner]++
        localStorage.setItem('score', JSON.stringify(scoreCopy));
        localStorage.setItem('board', JSON.stringify(Array(9).fill(null)));
        setScore(scoreCopy);
        setBoard(Array(9).fill(null))
    }

    const handleClick = (i) => {
        let boardCopy = [...board];
        if(board[i]) {
            return
        }
        boardCopy[i] = xIsNext ? "X" : "O";
        localStorage.setItem('board', JSON.stringify(boardCopy));
        localStorage.setItem('xIsNext', JSON.stringify(!xIsNext));
        setBoard(boardCopy);
        setXisNext(!xIsNext);
    };

    return (
        <>
            <Board squares={board} onClick={handleClick} />
            <div style={{textAlign: "center"}}>
                <span style={ xIsNext ? { fontWeight: 'bold' } : { fontWeight: 'normal' } }>{"PLAYER 1 (X) : " + score.X}</span>
                <span>{" | TIE : " + score.tie}</span>
                <span style={ xIsNext ? { fontWeight: 'normal' } : { fontWeight: 'bold' } }>{" | PLAYER 2 (O) : " + score.O}</span>
            </div>
        </>
    )
}

export default TicTacToe