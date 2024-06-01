import React from 'react';
import styles from './TopArea.module.css';
import { Seven } from '../SevenSegmentDisplay/SevenSegmentDisplay';

type Props = {
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom';
  difficultResetgame: (
    difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom',
    newWidth?: number,
    newHeight?: number,
  ) => void;
  width: number;
  height: number;
  isClear: boolean;
  isFailure: boolean;
  isPlaying: boolean;
  bombcount: number;
  Numboard: (col: number) => number;

  count: number;
};

export const TopArea = ({
  difficulty,
  difficultResetgame,
  width,
  height,
  isClear,
  isFailure,
  isPlaying,
  bombcount,
  Numboard,
  count,
}: Props) => (
  <div
    className={`${difficulty === 'Easy' ? styles.topflame1 : ''} ${difficulty === 'Normal' ? styles.topflame2 : ''} ${difficulty === 'Hard' ? styles.topflame3 : ''} ${difficulty === 'Custom' ? styles.topflamecustom : ''}`}
    onClick={() => difficultResetgame(difficulty, width, height)}
    style={difficulty === 'Custom' ? { width: width <= 8 ? '252px' : `${width * 30 + 12}px` } : {}}
  >
    <div className={styles.flagflame}>
      <div className={styles.flagboard}>
        <span className={styles.digit}>{bombcount - Numboard(10)}</span>
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
        <Seven count={count} />
      </div>
    </div>
  </div>
);
