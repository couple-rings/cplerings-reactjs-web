import { currencyFormatter } from "src/utils/functions";
import styles from "./CustomerOrder.module.scss";
import sample from "src/assets/sampledata/ringdesign.png";
import { Box, Button, Divider, Grid } from "@mui/material";
import { outlinedBtn, primaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";

function CustomerOrder() {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div>09/10/2024</div>
            <div>Mã đơn: 824100998377</div>
          </div>
          <div>Unpaid</div>
        </div>

        <Grid container className={styles.body}>
          <Grid item xs={12} sm={3} md={2}>
            <img src={sample} />
          </Grid>

          <Grid item xs={12} sm={9} md={7} className={styles.middle}>
            <div className={styles.title}>BỘ SƯU TẬP FOREVER Nhẫn Cưới</div>
            <div className={styles.price}>{currencyFormatter(12000000)}</div>
            <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
              <div>
                <span className={styles.label}>Chất liệu</span>
                <span>Vàng Trắng 18K</span>
              </div>
              <div>
                <span className={styles.label}>Kích thước</span>
                <span>5</span>
              </div>
            </Box>
            <div>
              <span className={styles.label}>Kim cương</span>
              <span>5PT, F, SI1</span>
            </div>
          </Grid>

          <Grid container item xs={12} md={3} lg={2.5} className={styles.right}>
            <Grid item xs={12} sm={3.5} md={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ ...primaryBtn, py: 1 }}
              >
                Trả Ngay
              </Button>
            </Grid>
            <Grid item xs={12} sm={3.5} md={12}>
              <Button
                fullWidth
                variant="outlined"
                sx={{ ...outlinedBtn, px: 0 }}
                onClick={() => navigate(`/customer/order-detail/1`)}
              >
                Chi Tiết
              </Button>
            </Grid>
            <Grid item xs={12} sm={3.5} md={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ ...primaryBtn, py: 1 }}
              >
                Hủy Đơn
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Divider sx={{ backgroundColor: "#555", my: 5 }} />
    </>
  );
}

export default CustomerOrder;
