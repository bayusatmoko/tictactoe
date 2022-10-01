import React from "react";
import { Cancel, RadioButtonUnchecked } from '@mui/icons-material';

const style = {
	background: "lightblue",
	border: "2px solid darkblue",
	fontSize: "30px",
	fontWeight: "800",
	cursor: "pointer",
	outline: "none",
};

const Square = ({onClick, value}) => {

    const renderSquare = (value) => {
        if(value === "X") return <Cancel />
        if(value === "O") return <RadioButtonUnchecked />
    }

    return (
        <button style={style} onClick={onClick}>
            {renderSquare(value)}
        </button>
    )
}

export default Square