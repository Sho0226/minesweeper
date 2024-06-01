import styles from "./Board.module.css";

type Props = {
  board: number[][];
  row: number[];
  cell: number[];
  isFailure: boolean;
  bombMap: number[][];
  userIn: number[][];
  clickHandler: (x: number, y: number) => void;
  Rightclick: (event: React.MouseEvent, x: number, y: number) => void;
};

export const Board = ({
  board,
  row,
  cell,
  isFailure,
  bombMap,
  userIn,
  clickHandler,
  Rightclick,
}:Props) =>
  (
    {board.map((row, y) =>
      row.map((cell, x) => {
        if (isFailure && bombMap[y][x] === 1) {
          return (
            <div
              className={`${styles.cellstyle} ${styles.samplestyle} `}
              key={`${x}-${y}`}
              onClick={() => clickHandler(x, y)}
              onContextMenu={(event) => RightClick(event, x, y)}
              style={{
                backgroundPosition: `-300px 0px`,
                backgroundColor: bombMap[y][x] === 1 && userIn[y][x] === 1 ? `red` : '',
              }}
            />
          );
        } else {
          return (
            <div
              className={`${styles.cellstyle} ${styles.samplestyle} ${cell === -1 ? styles.stonestyle : cell === 9 || cell === 10 ? `${styles.stonestyle} ${styles.flag} ${styles.question}` : ''}`}
              key={`${x}-${y}`}
              onClick={() => clickHandler(x, y)}
              onContextMenu={(event) => RightClick(event, x, y)}
              style={{
                backgroundPosition:
                  cell === 9 || cell === 10
                    ? `${-22.9 * (cell - 1)}px 0px`
                    : `${-30 * (cell - 1)}px 0px`,
              }}
            />
          );
        }
      }),
    )}
  );
