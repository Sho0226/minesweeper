import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { CustomInput } from '../components/CustomInput/CustomInput';
import { DifficultyLink } from '../components/DifficultyLink/DifficultyLink';
import { DifficultyOutside } from '../components/DifficultyOutside/DifficultyOutside';

const Home = () => {
  const {
    difficulty,
    inputWidth,
    inputHeight,
    inputBombs,
    handleEasyClick,
    handleNormalClick,
    handleHardClick,
    handleCustomClick,
    handleUpdateClick,
    setInputWidth,
    setInputHeight,
    setInputBombs,
    width,
    height,
    board,
    isFailure,
    bombMap,
    userIn,
    clickHandler,
    RightClick,
    difficultResetgame,
    isClear,
    isPlaying,
    bombcount,
    NumBoard,
    count,
  } = useGame();

  return (
    <div className={styles.container}>
      <DifficultyLink
        handleEasyClick={handleEasyClick}
        handleNormalClick={handleNormalClick}
        handleHardClick={handleHardClick}
        handleCustomClick={handleCustomClick}
        difficulty={difficulty}
      />

      <CustomInput
        setInputWidth={setInputWidth}
        setInputHeight={setInputHeight}
        setInputBombs={setInputBombs}
        handleUpdateClick={handleUpdateClick}
        inputWidth={inputWidth}
        inputHeight={inputHeight}
        inputBombs={inputBombs}
        difficulty={difficulty}
      />
      {/* <div className={styles.boardcontainer}> */}
      <DifficultyOutside
        difficulty={difficulty}
        width={width}
        height={height}
        board={board}
        isFailure={isFailure}
        bombMap={bombMap}
        userIn={userIn}
        clickHandler={clickHandler}
        RightClick={RightClick}
        difficultResetgame={difficultResetgame}
        isClear={isClear}
        isPlaying={isPlaying}
        bombcount={bombcount}
        Numboard={NumBoard}
        count={count}
      />
      {/* </div> */}
    </div>
  );
};
export default Home;
