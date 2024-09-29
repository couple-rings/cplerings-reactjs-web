import styles from "./Index.module.scss";
import banner1 from "src/assets/banner1.png";
import banner2 from "src/assets/banner2.png";

const HomeDefault = () => {
  return (
    <div className={styles.container}>
      <img src={banner1} className={styles.banner} />
      <img src={banner2} className={styles.banner} />
    </div>
  );
};

export default HomeDefault;
