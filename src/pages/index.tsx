import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [samplePos, setSamplePos] = useState(0);

  // 0 -> ボム無し
  // 1 -> ボム有り

  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const clickBomb = () => {
    // bombMap のコピーを作成
    const newBombMap = structuredClone(bombMap);

    // 10個のボムを設置
    for (let i = 0; i < 10; i++) {
      const randomY = Math.floor(Math.random() * newBombMap.length);
      const randomX = Math.floor(Math.random() * newBombMap[0].length);
      newBombMap[randomY][randomX] = 1;
    }

    // bombMap を更新
    setBombMap(newBombMap);
  };

  // 0 ->未クリック
  // 1 ->左クリック
  // 2 ->はてな
  // 3 ->旗
  const [userIn, setUserIn] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const isPlaying = userIn.some((row) => row.some((input) => input !== 0));
  const isFailure = userIn.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1),
  );

  // -1   -> 石
  //  0   -> 画像無しセル
  //  1~8 -> 数字セル
  //  9   -> 石+はてな
  //  10  ->石+旗
  //  11  -> ボムセル

  const board: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  console.log(samplePos);
  return (
    <div className={styles.container}>
      {/* <div className={styles.minesweeperboard}> */}

      <div className={styles.boardstyle}>
        {board.map((row, y) =>
          row.map((color, x) => <div className={styles.cellstyle} key={`${x}-${y}`} />),
        )}
      </div>
      {/* </div> */}

      <button onClick={() => clickBomb()}>bomb</button>

      <div
        className={styles.samplestyle}
        style={{ backgroundPosition: `${-30 * samplePos}px 0px` }}
      />
      <button onClick={() => setSamplePos((P) => (P + 1) % 14)}>sample</button>
    </div>
  );
};

export default Home;
