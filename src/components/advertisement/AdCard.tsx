import { Grid } from "@mui/material";
import styles from "./AdCard.module.scss";

const AdCard = (props: IAdCardProps) => {
  const { coverImg, text, title } = props;

  return (
    <Grid item xs={8} sm={5.5} md={4.5} lg={2.3} className={styles.container}>
      <img src={coverImg} />
      <div className={styles.title}>{title}</div>
      <div className={styles.text}>{text}</div>
    </Grid>
  );
};

export default AdCard;
