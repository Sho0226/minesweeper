import styles from './DifficultyNavi.module.css';

type Props = {
  handleEasyClick: () => void;
  handleNormalClick: () => void;
  handleHardClick: () => void;
  handleCustomClick: () => void;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom';
};

export const Difficulty = ({
  handleEasyClick,
  handleNormalClick,
  handleHardClick,
  handleCustomClick,
  difficulty,
}: Props) => (
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
    <a
      className={`${styles.levelLink} ${difficulty === 'Custom' ? styles.active : ''}`}
      onClick={handleCustomClick}
    >
      カスタム
    </a>
  </div>
);
