import styles from './index.module.css';
import { useGame } from '../hooks/useGame';

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
        </a>
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
