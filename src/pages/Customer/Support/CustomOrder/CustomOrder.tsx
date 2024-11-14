import { Grid } from "@mui/material";
import styles from "./CustomOrder.module.scss";

function CustomOrder() {
  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid container item xs={10}>
        <div className={styles.title}>Đơn Hàng Gia Công</div>
      </Grid>
    </Grid>
  );
}

export default CustomOrder;
