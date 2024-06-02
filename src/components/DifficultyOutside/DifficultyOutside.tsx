import { DifficultyInside } from '../DifficultyInside/DifficultyInside';
import { TopArea } from '../TopArea/TopArea';
import styles from './DifficultyOutside.module.css';

type Props = {
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom';
  width: number;
  height: number;
  board: number[][];
  isFailure: boolean;
  bombMap: number[][];
  userIn: number[][];
  clickHandler: (x: number, y: number) => void;
  RightClick: (event: React.MouseEvent, x: number, y: number) => void;
  difficultResetgame: (
    difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom',
    newWidth?: number,
    newHeight?: number,
  ) => void;
  isClear: boolean;
  isPlaying: boolean;
  bombcount: number;
  Numboard: (col: number) => number;
  count: number;
};

export const DifficultyOutside = ({
  difficulty,
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
  Numboard,
  count,
}: Props) => (
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
    <TopArea
      difficulty={difficulty}
      difficultResetgame={difficultResetgame}
      isClear={isClear}
      isPlaying={isPlaying}
      bombcount={bombcount}
      Numboard={Numboard}
      count={count}
      width={width}
      height={height}
      isFailure={isFailure}
    />
    <DifficultyInside
      board={board}
      isFailure={isFailure}
      bombMap={bombMap}
      userIn={userIn}
      clickHandler={clickHandler}
      RightClick={RightClick}
      difficulty={difficulty}
      width={width}
      height={height}
    />
  </div>
);
