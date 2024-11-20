import { Grid } from "@mui/material";
import styles from "./Index.module.scss";

function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Analytics Dashboard</div>

      <div>
        <Grid container justifyContent={"space-between"}></Grid>
      </div>
    </div>
  );
}

export default Index;
