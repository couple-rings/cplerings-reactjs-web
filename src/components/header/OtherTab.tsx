import { List, ListItemButton, ListItemText } from "@mui/material";
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

export const OtherTabMobile = (props: IOtherTabProps) => {
  const { cardsList } = props;

  return (
    <List>
      {cardsList.map((item, index) => {
        return (
          <ListItemButton key={index} sx={{ pl: 5 }}>
            <ListItemText primary={item.title} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default OtherTab;
