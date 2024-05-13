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
  // for (let a = 0; a < bombMap.length; a++) {
  //   for (let b = 0; b < bombMap[a].length; b++) {

  //     console.log();
  //   }
  // }

  // console.table(bombMap);
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
  const bombclick = (x: number, y: number) => {
    const Num = (col: number) => newBombMap.flat().filter((c) => c === col).length;
    let bombcountnow = 0;
    const bombcount = 10;
    // 10個のボムを設置
    while (bombcountnow < bombcount) {
      const randomY = Math.floor(Math.random() * newBombMap.length);
      const randomX = Math.floor(Math.random() * newBombMap[0].length);
      if (newBombMap[randomY][randomX] !== 1 && !(y === randomY && x === randomX)) {
        newBombMap[randomY][randomX] = 1;
        bombcountnow++;
      }
    }

    console.log('0は', Num(0), '1は', Num(1));
    // console.table(newBombMap);
    // bombMap を更新

    setBombMap(newBombMap);
  };

  console.table(newBombMap);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (newBombMap[i][j] === 1) {
        board[i][j] = 10;
      }
    }
  }

  console.table(board);
  // 0 ->未クリック
  // 1 ->左クリック
  // 2 ->はてな
  // 3 ->旗

  // const clickHandler = (x: number, y: number) => {
  //   if (userIn[y][x] === 0) {
  //     let count = 0;
  //     for (const direct of directions) {
  //       const [x1, y1] = direct;
  //       if (newUserIn[y + y1] !== undefined && newUserIn[y + y1][x + x1] !== undefined) {
  //         if (bombMap[y + y1][x + x1] === 1) {
  //           count++;
  //         }
  //       }
  //     }

  //     // 新しい userIn 配列を生成して更新する

  //     board[y][x] = count;
  //   }
  // };

  // console.log(userIn);
  // console.table(userIn);

  const isPlaying = userIn.some((row) => row.some((input) => input !== 0));
  const isFailure = userIn.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );

  const input = () => {};

  // -1   -> 石
  //  0   -> 画像無しセル
  //  1~8 -> 数字セル
  //  9   -> 石+はてな
  //  10  -> 石+旗
  //  11  -> ボムセル

  //   let zeroList: { x: number; y: number }[]
  // for () {
  //   zeroList = // board + directions + userInputs + bombMap
  // }
  // let openedCount: number
  // for () {
  //   openedCount = // board
  // }
  // const isSuccess = // openedCount + bombCount
  // let isFailure: boolean
  // for () {
  //   isFialure = // userInputs + bombMap
  // }
  // let isStarted: boolean
  // for () {
  //   isStarted = // userInputs
  // }

  // console.table(board);

  // console.log(samplePos);

  return (
    <div className={styles.container}>
      <div className={styles.boardoutsideflame}>
        <div className={styles.boardcontainer}>
          <div className={styles.topflame} />
          <div className={styles.boardflame}>
            <div className={styles.boardstyle}>
              {board.map((row, y) =>
                row.map((color, x) => (
                  <div
                    className={`${styles.cellstyle} ${styles.samplestyle} ${styles.stonestyle}`}
                    key={`${x}-${y}`}
                    onClick={() => bombclick(x, y)}
                    style={{
                      backgroundPosition: `${-30 * board[y][x]}px 0px`,
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
