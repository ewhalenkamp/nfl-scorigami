import { highestLosingScore, highestScore } from "@/pages";
import { useEffect, useState, useRef } from "react";

const bgColor = "transparent";

const setColors = (coords, color) => {
    coords.forEach((c) => {
        document.getElementById(`score-${c[0]}-${c[1]}`).style.backgroundColor = color;
    });
}

const clearColors = (coords) => {
    coords.forEach((c) => {
        document.getElementById(`score-${c[0]}-${c[1]}`).style.backgroundColor = bgColor;
    });
}

const clearColumnRowColors = (i, j) => {
    setColumnColor(i, bgColor);
    setRowColor(j, bgColor);
}

const setColumnColor = (col, color) => document.getElementById(`underlay-col-${col}`).style.backgroundColor = color;

const setRowColor = (row, color) => document.getElementById(`row-${row}`).style.backgroundColor = color;

const findSurrounding = (x, y, dist) => {
    const retVal = [];
    for (let i = x - dist; i <= Math.min(x + dist, highestScore); i++) {
        for (let j = y - dist; j <= Math.min(y + dist, highestLosingScore); j++) {
            if ((i !== x || j !== y) && (i >= 0 && j >= 0)) {
                retVal.push([i, j]);
            }
        }
    }
    return retVal;
}

function ScoreDialog({ matrix, coords }) {
    const dialogRef = useRef();
    const [col, row] = coords ? coords : [undefined, undefined];

    const timeout = useRef();

    useEffect(() => {
        if (col !== undefined && row !== undefined) {
            const parent = document.getElementById(`score-${col}-${row}`);
            if (parent) {
                parent.appendChild(dialogRef.current);
            }
            dialogRef.current.style["z-index"] = 5;
            timeout.current = setTimeout(() => {
                dialogRef.current.style.opacity = 1;
            }, 100);
        } else {
            dialogRef.current.style.opacity = 0;
            dialogRef.current.style["z-index"] = -5;
            clearTimeout(timeout.current);
        }
    }, [col, row]);

    return <div
        id="score-dialog"
        className="dialog"
        ref={dialogRef}
    >
        {col && row ? <h2>{col}-{row}</h2> : null}
    </div>;
}

function ScorigamiMatrixRow({ row, rowIndex, updateItem }) {
    const timeout = useRef();
    const open = useRef(false);
    let clearCoords;

    const beginDialog = (i) => {
        setColumnColor(i, "#87d5eb");
        setRowColor(rowIndex, "#87d5eb");

        // const coords = findSurrounding(i, rowIndex, 3);
        // setColors(coords, "#a62036");
        // clearCoords = coords;

        timeout.current = setTimeout(() => {
            showDialog(i);
            open.current = true;
        }, 250);
    }

    const cancelDialog = (i) => {
        clearColumnRowColors(i, rowIndex);
        clearTimeout(timeout.current);
        if (clearCoords) {
            clearColors(clearCoords);
            clearCoords = [];
        }
        // keep track of an "open" ref in order to avoid unnecessary setState calls
        if (open.current) {
            updateItem(undefined);
            open.current = false;
        }
    }

    const showDialog = (i) => {
        setColumnColor(i, "#72d972");
        setRowColor(rowIndex, "#72d972");
        updateItem(i, rowIndex);
    }

    return <div className="row" id={`row-${rowIndex}`}>
        {row.map((item, i) => (
            <div
                id={`score-${i}-${rowIndex}`}
                key={`${i}-${rowIndex}`}
                className="item"
                onMouseEnter={() => {
                    beginDialog(i);
                }}
                onMouseLeave={() => {
                    cancelDialog(i);
                }}
            >
                <div id={`innerBox-${i}-${rowIndex}`} className="innerBox" />
            </div>
        ))}
    </div>
}

export default function ScorigamiMatrix({ matrix }) {
    const [current, setCurrent] = useState();

    const updateItem = (i, j) => {
        setCurrent([i, j]);
    }

    const generateColumns = (n, identifier) => {
        const columns = [];
        for (let i = 0; i < n; i++) {
            columns.push(<div id={`${identifier}-${i}`} />)
        }
        return columns;
    }

    return <div className="container">
        <div className="column-underlay">
            {generateColumns(74, "underlay-col")}
        </div>
        {matrix.map((row, i) => (<ScorigamiMatrixRow row={row} rowIndex={i} updateItem={updateItem} />))}
        <ScoreDialog matrix={matrix} coords={current} />
    </div>;
}