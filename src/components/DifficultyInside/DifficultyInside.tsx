import styles from './DifficultyInside.module.css';

type Props = {
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom';
  width: number;
  height: number;
};
export const DifficultyInside = ({ difficulty, width, height }: Props) => (
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
        difficulty === 'Custom' ? { width: `${width * 30}px`, height: `${height * 30}px` } : {}
      }
    />
  </div>
);
