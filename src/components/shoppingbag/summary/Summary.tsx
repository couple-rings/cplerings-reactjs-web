import { Button, Divider, Grid } from "@mui/material";
import styles from "./Summary.module.scss";
import { currencyFormatter } from "src/utils/functions";
import { primaryBtn } from "src/utils/styles";

function Summary(props: ISummaryProps) {
  const { discount, productAmount } = props;

  return (
    <div className={styles.container}>
      <div className={styles.text}>Chi Tiết Đơn</div>

      <Divider sx={{ backgroundColor: "#888" }} />

      <Grid container justifyContent={"space-between"} className={styles.text}>
        <div>Phí Vận Chuyển</div>
        <div>{currencyFormatter(0)}</div>
      </Grid>

      <Grid container justifyContent={"space-between"} className={styles.text}>
        <div>Tiền Hàng</div>
        <div>{currencyFormatter(productAmount)}</div>
      </Grid>

      <Divider sx={{ backgroundColor: "#888" }} />

      <Grid container justifyContent={"space-between"} className={styles.text}>
        <div>Giảm Giá</div>
        <div>{currencyFormatter(discount)}</div>
      </Grid>

      <Divider sx={{ backgroundColor: "#888" }} />

      <Grid container justifyContent={"space-between"} className={styles.text}>
        <div>Tổng Tiền</div>
        <div>{currencyFormatter(productAmount - discount)}</div>
      </Grid>

      <Button variant="contained" sx={{ ...primaryBtn, mt: 3 }} fullWidth>
        Thanh Toán
      </Button>

      <div className={styles.text}>
        Xin lưu ý: Vui lòng kiểm tra kỹ thông tin trước khi thanh toán
      </div>
    </div>
  );
}

export default Summary;
