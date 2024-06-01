import styles from './SevenSegmentDisplay.module.css';

type SevenSProps = {
  count: number;
};

export const Seven: React.FC<SevenSProps> = ({ count }) => {
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
