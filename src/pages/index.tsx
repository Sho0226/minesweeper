import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [samplePos, setSamplePos] = useState(11);
  const [gameOver, setGameOver] = useState(false);
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

  const resetgame = () => {
    console.log(111111);
    setBombMap([
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

    setUserIn([
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
  };

  const newBombMap = structuredClone(bombMap);
  const newUserIn = structuredClone(userIn);

  const updateboard = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (userIn[i][j] === 1) {
          arounder(i, j);
        } else if (userIn[i][j] === 2) {
          board[i][j] = 9;
        } else if (userIn[i][j] === 3) {
          board[i][j] = 10;
        }
      }
    }
  };

  const clickHandler = (x: number, y: number) => {
    if (gameOver) return;
    if (bombMap[y][x] === 1) {
      setGameOver(true); // ゲームオーバー状態に設定
      return; // 以降の処理をスキップ
    }
    const NumBoard = (col: number) => board.flat().filter((c) => c === col).length;
    const Num = (col: number) => newBombMap.flat().filter((c) => c === col).length;
    let bombcountnow = 0;
    const bombcount = 10;

    if (Num(1) === 0) {
      while (bombcountnow < bombcount) {
        const randomY = Math.floor(Math.random() * newBombMap.length);
        const randomX = Math.floor(Math.random() * newBombMap[0].length);
        if (newBombMap[randomY][randomX] !== 1 && !(y === randomY && x === randomX)) {
          newBombMap[randomY][randomX] = 1;
          bombcountnow++;
        }
      }
    }

    // console.log('0は', Num(0), '1は', Num(1));
    setBombMap(newBombMap);

    if (board[y][x] === -1 && userIn[y][x] === 0) {
      newUserIn[y][x] = 1;

      setUserIn(newUserIn);
    }

    // console.table(userIn);
    // console.table(board);
  };

  const arounder = (i: number, j: number) => {
    console.log(1);
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

    // 周囲のボムの数をカウントするための変数
    let aroundcount = 0;

    // 全ての方向に対して処理を繰り返す
    for (const direct of directions) {
      const [I, J] = direct;

      // ボードの範囲内であることを確認
      if (j + J >= 0 && j + J < board.length && i + I >= 0 && j + J < board[0].length) {
        // 周囲にボムがある場合はカウントを増やす
        if (bombMap[i + I] !== undefined && bombMap[i + I][j + J] !== undefined) {
          if (bombMap[i + I][j + J] === 1) {
            aroundcount++;
          }
          board[i][j] = aroundcount;
        }
      }
    }
    console.log(4);
    // 周囲のボムの数を設定
    board[i][j] = aroundcount;
    console.log(aroundcount, '回');
    console.table(userIn);

    if (aroundcount === 0) {
      console.log(3);
      userIn[i][j] = 1;
      for (const direct of directions) {
        const [I, J] = direct;
        // ボードの範囲内であることを確認
        if (j + J >= 0 && j + J < board.length && i + I >= 0 && i + I < board[0].length) {
          // 未探索のセルに対して再帰的に arounder を呼び出す
          if (userIn[i + I][j + J] === 0) {
            if (board[i + I][j + J] === -1) {
              console.log(2);
              board[i + I][j + J] = aroundcount + 1;
              arounder(i + I, j + J);
            }
          }
        }
      }
    }
  };
  // const isPlaying = userIn.some((row) => row.some((input) => input !== 0));
  // const isFailure = userIn.some((row, y) =>
  //   row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  // );

  // -1   -> 石
  //  0   -> 画像無しセル
  //  1~8 -> 数字セル
  //  9   -> 石+はてな
  //  10  -> 石+旗
  //  11  -> ボムセル
  updateboard();

  return (
    <div className={styles.container}>
      <div className={styles.boardoutsideflame}>
        <div className={styles.boardcontainer}>
          <div className={styles.topflame}>
            <div className={styles.flagflame} />
            <div className={styles.resetoutflame}>
              <div className={styles.resetflame}>
                <div
                  className={styles.reset}
                  style={{ backgroundPosition: `${-30 * samplePos}px 0px` }}
                  onClick={() => `${setSamplePos((P) => 11 + ((P % 9) % 3))} ${resetgame()} `}
                />
              </div>
            </div>
            <div className={styles.timerflame} />
          </div>
          <div className={styles.boardflame}>
            <div className={styles.boardstyle}>
              {board.map((row, y) =>
                row.map((cell, x) => (
                  <div
                    className={`${styles.cellstyle} ${styles.samplestyle} ${cell === -1 ? styles.stonestyle : ''} ${cell === 11 ? styles.gameover : ''}
                    `}
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
    </div>
  );
};
export default Home;
