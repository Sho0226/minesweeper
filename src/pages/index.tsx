import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { TopArea } from '../components/TopArea/TopArea';

const Home = () => {
  const {
    difficulty,
    handleEasyClick,
    handleNormalClick,
    handleHardClick,
    handleCustomClick,
    handleUpdateClick,
    setInputWidth,
    setInputHeight,
    setInputBombs,
    inputWidth,
    inputHeight,
    width,
    height,
    bombcount,
    inputBombs,
    difficultResetgame,
    NumBoard,
    isClear,
    isFailure,
    isPlaying,
    clickHandler,
    RightClick,
    bombMap,
    userIn,
    board,
    count,
  } = useGame();

  return (
    <div className={styles.container}>
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
          <TopArea difficulty={difficulty} />

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
