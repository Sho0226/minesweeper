import { useState } from 'react';
import React, { useEffect } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [count, setCount] = useState<number>(0);
  const SevenSegmentDisplay: React.FC<{ count: number }> = ({ count }) => {
    const formattedCount = String(count).padStart(3, '0');

    return (
      <div className={styles.sevensegment}>
        {formattedCount.split('').map((digit, index) => (
          <span key={index} className={styles.digit}>
            {digit}
          </span>
        ))}
      </div>
    );
  };

  const [difficulty, setDifficulty] = useState<'Easy' | 'Normal' | 'Hard'>('Easy');
  const resetgame = () => {
    setCount(0);
    const newbomb = bombboard;
    setBombMap(newbomb);
    const newinput = inputboard;
    setUserIn(newinput);
  };

  let bombcount: number;
  let board: number[][];
  let bombboard: number[][];
  let inputboard: number[][];

  const generateboard = (x: number, y: number, fill: number) =>
    [...Array(y)].map(() => [...Array(x)].map(() => fill));

  if (difficulty === 'Easy') {
    board = generateboard(9, 9, -1);
    bombboard = generateboard(9, 9, 0);
    inputboard = generateboard(9, 9, 0);
    bombcount = 10;
  } else if (difficulty === 'Normal') {
    board = generateboard(16, 16, -1);
    bombboard = generateboard(16, 16, 0);
    inputboard = generateboard(16, 16, 0);
    bombcount = 40;
  } else {
    board = generateboard(16, 30, -1);
    bombboard = generateboard(16, 30, 0);
    inputboard = generateboard(16, 30, 0);
    bombcount = 99;
  }

  const [bombMap, setBombMap] = useState(bombboard);
  const [userIn, setUserIn] = useState(inputboard);

  const updateboard = () => {
    bombMap.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (bombMap[i][j] === 1 && userIn[i][j] === 1) {
          board[i][j] = 11;
        } else if (userIn[i][j] === 1) {
          arounder(i, j);
        } else if (userIn[i][j] === 2) {
          board[i][j] = 9;
        } else if (userIn[i][j] === 3) {
          board[i][j] = 10;
        } else if (isClear && bombMap[i][j] === 1) {
          board[i][j] = 10;
        }
      });
    });
  };

  const isPlaying = userIn.some((row) => row.some((input) => input !== 0));
  const isFailure = userIn.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );
  const isClear = board.every((row, y) =>
    row.every((cell, x) => {
      if (bombMap[y][x] !== 1) {
        return userIn[y][x] === 1;
      }
      return true;
    }),
  );

  useEffect(() => {
    if (isClear || isFailure) {
      return;
    }
    if (isPlaying) {
      const interval = setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isClear, isFailure, isPlaying]);

  const clickHandler = (x: number, y: number) => {
    if (isFailure || isClear) return;

    const Num = (col: number) => bombMap.flat().filter((c) => c === col).length;
    let bombcountnow = 0;

    if (Num(1) === 0) {
      const newBombMap = structuredClone(bombMap);
      while (bombcountnow < bombcount) {
        const randomY = Math.floor(Math.random() * newBombMap.length);
        const randomX = Math.floor(Math.random() * newBombMap[0].length);
        if (newBombMap[randomY][randomX] !== 1 && !(y === randomY && x === randomX)) {
          newBombMap[randomY][randomX] = 1;
          bombcountnow++;
        }
      }
      setBombMap(newBombMap);
    }

    const newUserIn = structuredClone(userIn);

    if (board[y][x] === -1 && userIn[y][x] === 0) {
      newUserIn[y][x] = 1;
      setUserIn(newUserIn);
    }

    if (board[y][x] === -1 && bombMap[y][x] === 1) {
      isFailure;
    }
  };

  const arounder = (i: number, j: number) => {
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

    let aroundcount = 0;

    for (const direct of directions) {
      const [I, J] = direct;
      if (j + J >= 0 && j + J < board.length && i + I >= 0 && j + J < board[0].length) {
        if (bombMap[i + I] !== undefined && bombMap[i + I][j + J] !== undefined) {
          if (bombMap[i + I][j + J] === 1) {
            aroundcount++;
          }
          board[i][j] = aroundcount;
        }
      }
    }

    board[i][j] = aroundcount;

    if (aroundcount === 0) {
      userIn[i][j] = 1;
      for (const direct of directions) {
        const [I, J] = direct;
        if (j + J >= 0 && j + J < board.length && i + I >= 0 && i + I < board[0].length) {
          if (bombMap[i + I][j + J] === 1 && (userIn[i][j] === 2 || userIn[i][j] === 3)) {
            userIn[i][j] = 0;
          }
          if (
            userIn[i + I][j + J] === 0 ||
            userIn[i + I][j + J] === 2 ||
            userIn[i + I][j + J] === 3
          ) {
            if (userIn[i + I][j + J] === 2 || userIn[i + I][j + J] === 3) {
              userIn[i + I][j + J] = 0;
            }
            if (board[i + I][j + J] === -1) {
              board[i + I][j + J] = aroundcount + 1;
              userIn[i + I][j + J] = 1;

              arounder(i + I, j + J);
            }
          }
        }
      }
    }
  };

  const RightClick = (event: React.MouseEvent, x: number, y: number) => {
    event.preventDefault();

    if (isFailure || isClear) return;

    const newUserIn = structuredClone(userIn);

    if (board[y][x] === -1 && newUserIn[y][x] === 0) {
      newUserIn[y][x] = 3;
      setUserIn(newUserIn);
    } else if (newUserIn[y][x] === 3) {
      newUserIn[y][x] = 2;
      setUserIn(newUserIn);
    } else if (newUserIn[y][x] === 2) {
      newUserIn[y][x] = 0;
      setUserIn(newUserIn);
    }
  };

  const NumBoard = (col: number) => board.flat().filter((c) => c === col).length;

  updateboard();

  const handleEasyClick = () => {
    setDifficulty('Easy');
    const newbomb = bombboard;
    setBombMap(newbomb);
    const newinput = inputboard;
    setUserIn(newinput);

    resetgame();
  };

  const handleNormalClick = () => {
    setDifficulty('Normal');

    const newbomb = bombboard;
    setBombMap(newbomb);
    const newinput = inputboard;
    setUserIn(newinput);

    resetgame();
  };

  const handleHardClick = () => {
    setDifficulty('Hard');

    resetgame();
  };

  console.table(board);
  console.table(bombMap);
  console.table(userIn);
  console.table(bombboard);
  console.table(inputboard);

  return (
    <div className={styles.container}>
      <div className={styles.difficulty}>
        <a
          className={`${styles.levelLink} ${difficulty === 'Easy' ? styles.active : ''}`}
          onClick={handleEasyClick}
        >
          初級
        </a>
        <a
          className={`${styles.levelLink} ${difficulty === 'Normal' ? styles.active : ''}`}
          onClick={handleNormalClick}
        >
          中級
        </a>
        <a
          className={`${styles.levelLink} ${difficulty === 'Hard' ? styles.active : ''}`}
          onClick={handleHardClick}
        >
          上級
        </a>
      </div>
      <div className={styles.minesweepercontainer}>
        <div
          className={styles.gameoverboardflame}
          style={{ display: isClear || isFailure ? '' : 'none' }}
        >
          <div className={styles.gameoverboard}>
            <span className={styles.text} style={{ display: isClear ? '' : 'none' }}>
              回避成功
            </span>
            <span className={styles.text} style={{ display: isClear ? 'none' : '' }}>
              回避失敗
            </span>
          </div>
        </div>
        <div
          className={`${difficulty === 'Easy' ? styles.boardoutsideflame1 : ''} ${difficulty === 'Normal' ? styles.boardoutsideflame2 : ''} ${difficulty === 'Hard' ? styles.boardoutsideflame3 : ''}`}
        >
          <div className={styles.boardcontainer}>
            <div
              className={`${difficulty === 'Easy' ? styles.topflame1 : ''} ${difficulty === 'Normal' ? styles.topflame2 : ''} ${difficulty === 'Hard' ? styles.topflame3 : ''}`}
              onClick={resetgame}
            >
              <div className={styles.flagflame}>
                <div className={styles.flagboard}>
                  <span className={styles.digit}>{bombcount - NumBoard(10)}</span>
                </div>
              </div>
              <div
                className={`${difficulty === 'Easy' ? styles.resetoutflame1 : ''} ${difficulty === 'Normal' ? styles.resetoutflame2 : ''} ${difficulty === 'Hard' ? styles.resetoutflame3 : ''}`}
              >
                <div className={styles.resetflame}>
                  <div
                    className={styles.reset}
                    style={{
                      backgroundPosition: isClear
                        ? `-360px 0px`
                        : isFailure
                          ? `-390px 0px`
                          : isPlaying
                            ? `-330px 0px`
                            : `-330px 0px`,
                    }}
                  />
                </div>
              </div>
              <div className={styles.timerflame}>
                <div className={styles.timerboard}>
                  <SevenSegmentDisplay count={count} />
                </div>
              </div>
            </div>
            <div
              className={`${difficulty === 'Easy' ? styles.boardflame1 : ''} ${difficulty === 'Normal' ? styles.boardflame2 : ''} ${difficulty === 'Hard' ? styles.boardflame3 : ''}`}
            >
              <div
                className={`${difficulty === 'Easy' ? styles.boardstyle1 : ''} ${difficulty === 'Normal' ? styles.boardstyle2 : ''} ${difficulty === 'Hard' ? styles.boardstyle3 : ''}`}
              >
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
