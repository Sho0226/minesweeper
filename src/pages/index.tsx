import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [samplePos, setSamplePos] = useState(0);

  // 0 -> ボム無し
  // 1 -> ボム有り

  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [userIn, setUserIn] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  // 0 ->未クリック
  // 1 ->左クリック
  // 2 ->はてな
  // 3 ->旗

  const newBombMap = structuredClone(bombMap);
  const newUserIn = structuredClone(userIn);

  const directions = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];

  // bombMap のコピーを作成
  const clickHandler = (x: number, y: number) => {
    const NumBoard = (col: number) => board.flat().filter((c) => c === col).length;
    const Num = (col: number) => newBombMap.flat().filter((c) => c === col).length;
    let bombcountnow = 0;
    const bombcount = 10;
    // 10個のボムを設置
    if (NumBoard(11) === 0) {
      while (bombcountnow < bombcount) {
        const randomY = Math.floor(Math.random() * newBombMap.length);
        const randomX = Math.floor(Math.random() * newBombMap[0].length);
        if (newBombMap[randomY][randomX] !== 1 && !(y === randomY && x === randomX)) {
          newBombMap[randomY][randomX] = 1;
          bombcountnow++;
        }
      }
    }

    console.log('0は', Num(0), '1は', Num(1));
    setBombMap(newBombMap);

    // for (let a = 0; a < 9; a++) {
    //   for (let b = 0; b < 9; b++) {

    if (board[y][x] === -1 && userIn[y][x] === 0) {
      newUserIn[y][x] = 1;

      setUserIn(newUserIn);
    }

    //   }
    // }
    console.table(userIn);
    console.table(board);
  };

  // console.table(newBombMap);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (newBombMap[i][j] === 1) {
        board[i][j] = 11;
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      for (const direct of directions) {
        const [I, J] = direct;
        if (board[i][j] !== 11) {
          if (newUserIn[i][j] === 1) {
            if (board[i + I] !== undefined) {
              if (board[i + I][j + J] !== undefined) {
                if (board[i + I][j + J] === 11) {
                  board[i][j]++;
                  board[i][j]++;
                }
              }
            }
          }
        }
      }
    }
  }
  // ゲーム中は消す

  // console.table(board);

  const isPlaying = userIn.some((row) => row.some((input) => input !== 0));
  const isFailure = userIn.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );

  // -1   -> 石
  //  0   -> 画像無しセル
  //  1~8 -> 数字セル
  //  9   -> 石+はてな
  //  10  -> 石+旗
  //  11  -> ボムセル

  return (
    <div className={styles.container}>
      <div className={styles.boardoutsideflame}>
        <div className={styles.boardcontainer}>
          <div className={styles.topflame} />
          <div className={styles.boardflame}>
            <div className={styles.boardstyle}>
              {board.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    className={`${styles.cellstyle} ${styles.samplestyle} ${cell === -1 ? styles.stonestyle : ''} `}
                    key={`${x}-${y}`}
                    onClick={() => clickHandler(x, y)}
                    style={{
                      backgroundPosition: `${-30 * (cell - 1)}px 0px`,
                    }}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 外側のdivで囲まれたサンプル要素 */}
      <div
        className={styles.samplestyle}
        style={{ backgroundPosition: `${-30 * samplePos}px 0px` }}
      />
      <button onClick={() => setSamplePos((P) => (P + 1) % 14)}>sample</button>
    </div>
  );
};
export default Home;
