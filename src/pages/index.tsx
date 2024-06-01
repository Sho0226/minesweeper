import styles from './index.module.css';
import { useGame } from '../hooks/useGame';
import { TopArea } from '../components/TopArea/TopArea';
import { CustomInput } from '../components/CustomInput/CustomInput';
import { DifficultyLink } from '../components/DifficultyLink/DifficultyLink';
import { DifficultyOutside } from '../components/DifficultyOutside/DifficultyOutside';
import { DifficultyInside } from '../components/DifficultyInside/DifficultyInside';

const Home = () => {
  const { difficulty } = useGame();

  return (
    <div className={styles.container}>
      <CustomInput />
      <div className={styles.boardcontainer}>
        <DifficultyOutside>
          <TopArea difficulty={difficulty} />
          <DifficultyLink />

          <DifficultyInside />
        </DifficultyOutside>
      </div>
    </div>
  );
};
export default Home;
