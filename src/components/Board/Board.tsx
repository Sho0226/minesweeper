import styles from './Board.module.css';

type Props = {
  board: number[][];
  isFailure: boolean;
  bombMap: number[][];
  userIn: number[][];
  clickHandler: (x: number, y: number) => void;
  RightClick: (event: React.MouseEvent, x: number, y: number) => void;
};

export const Board = ({ board, isFailure, bombMap, userIn, clickHandler, RightClick }: Props) => (
  <div className={styles.board}>
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
                backgroundSize: cell === 9 || cell === 10 ? '308px' : '420px',
                backgroundPosition:
                  cell === 9 || cell === 10
                    ? `${-22 * (cell - 1)}px 0px`
                    : `${-30 * (cell - 1)}px 0px`,
              }}
            />
          );
        }
      }),
    )}
  </div>
);
