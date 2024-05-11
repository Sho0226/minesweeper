import { useState } from 'react';
import styles from './index.module.css';
import { table } from 'console';

const Home = () => {
  const [samplePos, setSamplePos] = useState(0);

  // 0 -> ボム無し
  // 1 -> ボム有り
  const bombcount = 10;

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
  const board: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  console.table(board);

  const newBoard = structuredClone(board);
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

  const clickBomb = () => {
    // bombMap のコピーを作成

    const Num = (col: number) => newBombMap.flat().filter((c) => c === col).length;
    const bombcount = 10;
    let bombcountnow = 0;
    // 10個のボムを設置
    while (bombcountnow < bombcount) {
      const randomY = Math.floor(Math.random() * newBombMap.length);
      const randomX = Math.floor(Math.random() * newBombMap[0].length);
      if (newBombMap[randomY][randomX] !== 1) {
        newBombMap[randomY][randomX] = 1;
        bombcountnow++;
      }
    }

    console.log('0は', Num(0), '1は', Num(1));
    console.table(newBombMap);
    // bombMap を更新
    setBombMap(newBombMap);
  };

  // 0 ->未クリック
  // 1 ->左クリック
  // 2 ->はてな
  // 3 ->旗

  const clickHandler = (x: number, y: number) => {
    if (userIn[y][x] === 0) {
      let count = 0;
      for (const direct of directions) {
        const [x1, y1] = direct;
        if (newUserIn[y + y1] !== undefined && newUserIn[y + y1][x + x1] !== undefined) {
          if (bombMap[y + y1][x + x1] === 1) {
            count++;
          }
        }
      }

      // 新しい userIn 配列を生成して更新する

      board[y][x] = count;
    }
  };
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

  for (let y = 0; y < newBoard.length; y++) {
    for (let x = 0; x < newBoard[y].length; x++) {
      if (newBombMap[y][x] === 1) {
        newBoard[y][x] = 11; // ボムセルの値を設定
      }
    }
  }

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
      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div
              className={`${styles.cellstyle} ${bombMap[y][x] === 1 ? styles.samplestyle : ''}`}
              key={`${x}-${y}`}
              onClick={() => clickHandler(x, y)}
              style={{
                backgroundPosition: `${-30 * board[y][x]}px 0px`,
              }}
            />
          )),
        )}
      </div>

      <button onClick={() => clickBomb()}>bomb</button>

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
