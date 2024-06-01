import styles from './CustomInput.module.css';

type Props = {
  setInputWidth: Dispatch<SetStateAction<string>>;
  setInputHeight: Dispatch<SetStateAction<string>>;
  setInputBombs: Dispatch<SetStateAction<string>>;
  handleUpdateClick: () => void;
  inputWidth: string;
  inputHeight: string;
  inputBombs: string;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Custom';
};

export const CustomInput = ({
  setInputWidth,
  setInputHeight,
  setInputBombs,
  handleUpdateClick,
  inputWidth,
  inputHeight,
  inputBombs,
  difficulty,
}: Props) => (
  <span className={styles.customtext} style={{ display: difficulty === 'Custom' ? '' : 'none' }}>
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
);
