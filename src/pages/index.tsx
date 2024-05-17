import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
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
        if (bombMap[i][j] === 1 && userIn[i][j] === 1) {
          board[i][j] = 11;
        } else if (userIn[i][j] === 1) {
          arounder(i, j);
        } else if (userIn[i][j] === 2) {
          board[i][j] = 9;
        } else if (userIn[i][j] === 3) {
          board[i][j] = 10;
        }
      }
    }
  };
  // const NumBoard = (col: number) => board.flat().filter((c) => c === col).length;
  const isPlaying = userIn.some((row) => row.some((input) => input !== 0));
  const isFailure = userIn.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );
  const isClear = board.every((row, y) =>
    row.every((cell, x) => {
      // 爆弾のないセルが開かれているかどうかをチェック
      if (bombMap[y][x] !== 1) {
        return userIn[y][x] === 1;
      }
      return true;
    }),
  );
  const clickHandler = (x: number, y: number) => {
    if (isFailure) return;

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

    if (board[y][x] === -1 && bombMap[y][x] === 1) {
      isFailure;
    }
  };
  // console.table(userIn);
  // console.table(board);

  const arounder = (i: number, j: number) => {
    // console.log(1);
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
    // console.log(4);
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
          if (bombMap[i + I][j + J] === 1 && (userIn[i][j] === 2 || userIn[i][j] === 3)) {
            userIn[i][j] = 0;
          }
          if (
            userIn[i + I][j + J] === 0 ||
            userIn[i + I][j + J] === 2 ||
            userIn[i + I][j + J] === 3
          ) {
            // 旗または？の場合はリセットする
            if (userIn[i + I][j + J] === 2 || userIn[i + I][j + J] === 3) {
              userIn[i + I][j + J] = 0;
            }
            if (board[i + I][j + J] === -1) {
              // console.log(2);
              board[i + I][j + J] = aroundcount + 1;
              userIn[i + I][j + J] = 1;

              arounder(i + I, j + J);
            }
          }
        }
      }
    }
  };

  // -1   -> 石
  //  0   -> 画像無しセル
  //  1~8 -> 数字セル
  //  9   -> 石+はてな
  //  10  -> 石+旗
  //  11  -> ボムセル
  const RightClick = (event: React.MouseEvent, x: number, y: number) => {
    event.preventDefault(); // デフォルトの右クリックメニューを無効化
    console.log(1);

    if (isFailure) {
      return;
    }
    console.log(2);

    if (board[y][x] === -1 && userIn[y][x] === 0) {
      newUserIn[y][x] = 3;
      // 旗を表示
      console.log(3);
      setUserIn(newUserIn);
    }
    if (userIn[y][x] === 3) {
      newUserIn[y][x] = 2;
      // ？を表示
      setUserIn(newUserIn);
    }
    if (userIn[y][x] === 2) {
      // 元に戻す
      newUserIn[y][x] = 0;
      setUserIn(newUserIn);
    }
  };

  console.table(newUserIn);
  console.table(board);

  updateboard();

  return (
    <div className={styles.container}>
      <div className={styles.gameoverboard} />
      <div className={styles.boardoutsideflame}>
        <div className={styles.boardcontainer}>
          <div className={styles.topflame}>
            <div className={styles.flagflame} />
            <div className={styles.resetoutflame}>
              <div className={styles.resetflame}>
                <div
                  className={styles.reset}
                  onClick={() => {
                    resetgame();
                  }}
                  style={{
                    backgroundPosition: isClear
                      ? `-360px 0px` // クリア時の背景位置
                      : isFailure
                        ? `-390px 0px`
                        : isPlaying
                          ? `-330px 0px`
                          : `-330px 0px`,
                  }}
                />
              </div>
            </div>
            <div className={styles.timerflame} />
          </div>
          <div className={styles.boardflame}>
            <div className={styles.boardstyle}>
              {board.map((row, y) =>
                row.map((cell, x) => {
                  // ゲームが終了しており、かつセルが爆弾である場合は爆弾を表示する
                  if (isFailure && bombMap[y][x] === 1) {
                    return (
                      <div
                        className={`${styles.cellstyle} ${styles.samplestyle} `}
                        key={`${x}-${y}`}
                        onClick={() => {
                          clickHandler(x, y);
                        }}
                        onContextMenu={(event) => {
                          RightClick(event, x, y);
                        }}
                        style={{
                          backgroundPosition: `-300px 0px`,
                          backgroundColor: bombMap[y][x] === 1 && userIn[y][x] === 1 ? `red` : '',
                        }}
                      />
                    );
                  } else {
                    return (
                      <div
                        className={`${styles.cellstyle} ${styles.samplestyle} ${cell === -1 ? styles.stonestyle : ''}`}
                        key={`${x}-${y}`}
                        onClick={() => {
                          clickHandler(x, y);
                        }}
                        onContextMenu={(event) => {
                          RightClick(event, x, y);
                        }}
                        style={{
                          backgroundPosition: `${-30 * (cell - 1)}px 0px`,
                        }}
                      />
                    );
                  }
                }),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
