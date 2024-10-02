import styles from "./Footer.module.scss";
import LowerPart from "./LowerPart";
import UpperPart from "./UpperPart";

const Footer = () => {
  return (
    <div className={styles.container}>
      <UpperPart />
      <LowerPart />
    </div>
  );
};

export default Footer;
