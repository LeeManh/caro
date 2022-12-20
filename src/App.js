import React, { useState } from "react";
import styled from "styled-components";

const size = 15;
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${size}, 30px);
  grid-template-rows: repeat(${size}, 30px);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const arr = Array.from(Array(size), () => new Array(size).fill(""));

const App = () => {
  const [squares, setSquares] = useState(arr);
  // [{value : "X", rowIndex : 0,colIndex : 0}, .....]
  const [listCellCLicked, setListCellCLicked] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winnerPlayer, setWinnerPlayer] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const handleClickCell = (rowIndex, colIndex) => {
    if (squares[rowIndex][colIndex] || winnerPlayer) return;

    const _squares = JSON.parse(JSON.stringify(squares));
    _squares[rowIndex][colIndex] = currentPlayer;
    setSquares(_squares);

    const newListCellCLicked = [
      ...listCellCLicked,
      { value: currentPlayer, rowIndex, colIndex },
    ];
    setListCellCLicked(newListCellCLicked);

    if (checkWinner(rowIndex, colIndex, currentPlayer, newListCellCLicked)) {
      setWinnerPlayer(currentPlayer);
    }

    if (checkDraw(_squares)) {
      setIsDraw(true);
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = (rowIndex, colIndex, value, listCellCLicked) => {
    return (
      checkRow(rowIndex, colIndex, value, listCellCLicked) ||
      checkColumn(rowIndex, colIndex, currentPlayer, listCellCLicked) ||
      checkDiagonalLeft(rowIndex, colIndex, currentPlayer, listCellCLicked) ||
      checkDiagonalRight(rowIndex, colIndex, currentPlayer, listCellCLicked)
    );
  };
  const checkDraw = (squares) => {
    if (
      squares.every((row) => row.every((cell) => cell !== "")) &&
      !winnerPlayer
    ) {
      return true;
    }

    return false;
  };
  const checkRow = (rowIndex, colIndex, value, listCellCLicked) => {
    let count = 0;

    const findArr = listCellCLicked.filter((cell) => {
      return cell.value === value;
    });

    for (let i = colIndex - 4; i <= colIndex + 4; i++) {
      for (let item of findArr) {
        if (item.colIndex === i && item.rowIndex === rowIndex) {
          count++;
        }
      }
    }

    if (count > 4) {
      return true;
    }

    return false;
  };
  const checkColumn = (rowIndex, colIndex, value, listCellCLicked) => {
    let count = 0;

    const findArr = listCellCLicked.filter((cell) => {
      return cell.value === value;
    });

    for (let i = rowIndex - 4; i <= rowIndex + 4; i++) {
      for (let item of findArr) {
        if (item.rowIndex === i && item.colIndex === colIndex) {
          count++;
        }
      }
    }
    if (count > 4) {
      return true;
    }

    return false;
  };
  const checkDiagonalLeft = (rowIndex, colIndex, value, listCellCLicked) => {
    let count = 0;

    const findArr = listCellCLicked.filter((item) => {
      return item.value === value;
    });

    for (let i = rowIndex - 4; i <= rowIndex + 4; i++) {
      for (let j = colIndex - 4; j <= colIndex + 4; j++) {
        for (let item of findArr) {
          if (
            item.rowIndex === i &&
            item.colIndex === j &&
            i + j === rowIndex + colIndex
          ) {
            count++;
          }
        }
      }
    }

    if (count > 4) {
      return true;
    }
    return false;
  };
  const checkDiagonalRight = (rowIndex, colIndex, value, listCellCLicked) => {
    let count = 0;

    const findArr = listCellCLicked.filter((item) => {
      return item.value === value;
    });

    for (let i = rowIndex - 4; i <= rowIndex + 4; i++) {
      for (let j = colIndex - 4; j <= colIndex + 4; j++) {
        for (let item of findArr) {
          if (
            item.rowIndex === i &&
            item.colIndex === j &&
            i - j === rowIndex - colIndex
          ) {
            count++;
          }
        }
      }
    }
    if (count > 4) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <div>
        <Header>
          <div>{currentPlayer} Turn</div>
          <div>
            {winnerPlayer && <div>{winnerPlayer} Win</div>}
            {isDraw && <div>Draw</div>}
          </div>
        </Header>

        <Grid size={size}>
          {squares.map((row, rowIndex) =>
            row.map((val, colIndex) => {
              return (
                <button
                  key={rowIndex + colIndex}
                  onClick={() => handleClickCell(rowIndex, colIndex)}
                >
                  {val}
                </button>
              );
            })
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default App;
