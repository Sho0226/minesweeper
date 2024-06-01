import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { TopArea } from '../components/TopArea/TopArea';
import { CustomInput } from '../components/CustomInput/CustomInput';
import { DifficultyLink } from '../components/DifficultyLink/DifficultyLink';
import { DifficultyOutside } from '../components/DifficultyOutside/DifficultyOutside';

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
      <CustomInput />
      <div className={styles.boardcontainer}>
        <DifficultyOutside>
          <TopArea difficulty={difficulty} />
          <DifficultyLink />

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
        </DifficultyOutside>
      </div>
    </div>
  );
};
export default Home;
