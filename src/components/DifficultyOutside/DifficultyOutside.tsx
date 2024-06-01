import styles from './DifficultyOutside.module.css';

type Props = {
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom';
  width: number;
  height: number;
};

export const DifficultyOutside = ({ difficulty, width, height }: Props) => (
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
  />
);
