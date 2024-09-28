import HeaderCard from "./Card";
import styles from "./Header.module.scss";

const OtherTab = (props: IOtherTabProps) => {
  const { cardsList } = props;

  return (
    <div className={styles.tab}>
      <div className={styles.cardsContainer}>
        {cardsList.map((card, index) => {
          return <HeaderCard key={index} {...card} />;
        })}
      </div>
    </div>
  );
};

export default OtherTab;
