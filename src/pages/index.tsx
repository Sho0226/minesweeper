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

  const [difficulty, setDifficulty] = useState<'Easy' | 'Normal' | 'Hard' | 'Custom'>('Easy');
  const [width, setWidth] = useState(9);
  const [height, setHeight] = useState(9);
  const [bombs, setBombs] = useState('');
  const [inputWidth, setInputWidth] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const [inputBombs, setInputBombs] = useState('');

  const generateboard = (x: number, y: number, fill: number) =>
    [...Array(y)].map(() => [...Array(x)].map(() => fill));

  let board = generateboard(9, 9, -1);
  let bombcount = 10;
  let inputboard = generateboard(9, 9, 0);
  let bombboard = generateboard(9, 9, 0);

  if (difficulty === 'Easy') {
    board = generateboard(9, 9, -1);
    bombcount = 10;
  } else if (difficulty === 'Normal') {
    board = generateboard(16, 16, -1);
    bombcount = 40;
  } else if (difficulty === 'Hard') {
    board = generateboard(30, 16, -1);
    bombcount = 99;
  } else {
    board = generateboard(width, height, -1);
    bombcount = Number(bombs);
  }

  const [bombMap, setBombMap] = useState(bombboard);
  const [userIn, setUserIn] = useState(inputboard);

  const difficultSet = () => {
    setCount(0);
    setBombMap(bombboard);
    setUserIn(inputboard);
  };

  const difficultResetgame = (
    difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom',
    newWidth?: number,
    newHeight?: number,
  ) => {
    if (difficulty === 'Easy') {
      bombboard = generateboard(9, 9, 0);
      inputboard = generateboard(9, 9, 0);
      difficultSet();
    } else if (difficulty === 'Normal') {
      bombboard = generateboard(16, 16, 0);
      inputboard = generateboard(16, 16, 0);
      difficultSet();
    } else if (difficulty === 'Hard') {
      bombboard = generateboard(30, 16, 0);
      inputboard = generateboard(30, 16, 0);
      difficultSet();
    } else {
      bombboard = generateboard(newWidth ?? width, newHeight ?? height, 0);
      inputboard = generateboard(newWidth ?? width, newHeight ?? height, 0);
      difficultSet();
      if (newWidth === undefined) return;
      if (newHeight === undefined) return;
    }
  };

  const handleUpdateClick = () => {
    if (Number(inputWidth) < 1 || Number(inputHeight) < 1 || Number(inputBombs) < 1) {
      alert('Value must be greater than or equal to 1.');
      return;
    }

    if (Number(inputWidth) > 100 || Number(inputHeight) > 100) {
      alert('Value must be less than or equal to 100.');
      return;
    }
    if (Number(inputBombs) > 10000) {
      alert('Value must be less than or equal to 10000.');
      return;
    }

    if (Number(inputBombs) >= Number(inputWidth) * Number(inputHeight)) {
      alert('Value must be less than the total number of cells.');
      return;
    }

    setWidth(Number(inputWidth));
    setHeight(Number(inputHeight));
    setBombs(inputBombs);
    difficultResetgame('Custom', Number(inputWidth), Number(inputHeight));

    console.log('幅:', width, '高さ:', height, '爆弾数:', bombs);
  };

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
      if (j + J >= 0 && j + J < board[0].length && i + I >= 0 && i + I < board.length) {
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
        if (j + J >= 0 && j + J < board[0].length && i + I >= 0 && i + I < board.length) {
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

  const handleDifficultyClick = (difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom') => {
    setDifficulty(difficulty);
    difficultResetgame(difficulty);
  };

  const handleEasyClick = () => handleDifficultyClick('Easy');
  const handleNormalClick = () => handleDifficultyClick('Normal');
  const handleHardClick = () => handleDifficultyClick('Hard');
  const handleCustomClick = () => handleDifficultyClick('Custom');

  return (
    <div className={styles.container}>
      <div className={styles.difficulty}>
        {' '}
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
        <a
          className={`${styles.levelLink} ${difficulty === 'Custom' ? styles.active : ''}`}
          onClick={handleCustomClick}
        >
          カスタム
        </a>{' '}
      </div>

      <span
        className={styles.customtext}
        style={{ display: difficulty === 'Custom' ? '' : 'none' }}
      >
        <a>
          幅：
          <input
            type="number"
            className={styles.inputtext}
            min="1"
            max="100"
            value={inputWidth}
            onChange={(e) => setInputWidth(e.target.value)}
          />
        </a>
        <a>
          高さ：
          <input
            type="number"
            className={styles.inputtext}
            min="1"
            max="100"
            value={inputHeight}
            onChange={(e) => setInputHeight(e.target.value)}
          />
        </a>
        <a>
          爆弾数：
          <input
            type="number"
            className={styles.inputtext}
            min="1"
            max="10000"
            value={inputBombs}
            onChange={(e) => setInputBombs(e.target.value)}
          />
        </a>
        <button type="button" className={styles.update} onClick={handleUpdateClick}>
          更新
        </button>
      </span>

      <div
        className={`${difficulty === 'Easy' ? styles.boardoutsideflame1 : ''} ${difficulty === 'Normal' ? styles.boardoutsideflame2 : ''} ${difficulty === 'Hard' ? styles.boardoutsideflame3 : ''} ${difficulty === 'Custom' ? styles.boardoutsideflame3 : ''}`}
        style={
          difficulty === 'Custom'
            ? {
                width: width <= 8 ? '280px' : `${width * 30 + 40}px`,
                height: `${height * 30 + 122}px`,
              }
            : {}
        }
      >
        <div className={styles.boardcontainer}>
          <div
            className={`${difficulty === 'Easy' ? styles.topflame1 : ''} ${difficulty === 'Normal' ? styles.topflame2 : ''} ${difficulty === 'Hard' ? styles.topflame3 : ''} ${difficulty === 'Custom' ? styles.topflamecustom : ''}`}
            onClick={() => difficultResetgame(difficulty, width, height)}
            style={
              difficulty === 'Custom'
                ? { width: width <= 8 ? '252px' : `${width * 30 + 12}px` }
                : {}
            }
          >
            <div className={styles.flagflame}>
              <div className={styles.flagboard}>
                <span className={styles.digit}>{bombcount - NumBoard(10)}</span>
              </div>
            </div>
            <div className={styles.resetoutflame}>
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
            className={`${difficulty === 'Easy' ? styles.boardflame1 : ''} ${difficulty === 'Normal' ? styles.boardflame2 : ''} ${difficulty === 'Hard' ? styles.boardflame3 : ''} ${difficulty === 'Custom' ? styles.boardflamecustom : ''}`}
            style={
              difficulty === 'Custom'
                ? { width: `${width * 30 + 12}px`, height: `${height * 30 + 12}px` }
                : {}
            }
          >
            <div
              className={`${difficulty === 'Easy' ? styles.boardstyle1 : ''} ${difficulty === 'Normal' ? styles.boardstyle2 : ''} ${difficulty === 'Hard' ? styles.boardstyle3 : ''} ${difficulty === 'Custom' ? styles.boardstylecustom : ''}`}
              style={
                difficulty === 'Custom'
                  ? { width: `${width * 30}px`, height: `${height * 30}px` }
                  : {}
              }
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
  );
};
export default Home;
