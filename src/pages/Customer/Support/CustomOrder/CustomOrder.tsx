import { Box, Button, Card, Chip, Grid } from "@mui/material";
import styles from "./CustomOrder.module.scss";
import menring from "src/assets/sampledata/menring.png";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";

function CustomOrder() {
  const navigate = useNavigate();

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid container item xs={11}>
        <div className={styles.title}>Đơn Hàng Gia Công</div>
        <Card
          className={styles.order}
          sx={{ px: { md: 5, lg: 2 }, py: { md: 3, lg: 1 } }}
        >
          <Grid
            container
            p={2}
            pb={0}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box sx={{ fontSize: "1.2rem" }}>
              Mã Đơn: <span className={styles.orderNo}>1234567</span>
            </Box>
            <Chip label={"Chưa Thanh Toán"} color="warning" />
          </Grid>

          <Grid container justifyContent={"space-between"}>
            <Grid container item sm={5.9} className={styles.section} p={2}>
              <Grid item lg={4} mb={{ xs: 3, lg: 0 }}>
                <img src={menring} className={styles.ringImg} />
              </Grid>

              <Grid container item lg={7} gap={2.5}>
                <Grid container>
                  <div>
                    <img src={male} width={15} style={{ marginRight: 6 }} />
                    Nhẫn Nam
                  </div>
                </Grid>

                <Grid container>
                  <Grid item xs={4}>
                    Chất Liệu:
                  </Grid>
                  <div>Vàng Trắng 18K</div>
                </Grid>

                <Grid container>
                  <Grid item xs={4}>
                    Kim Cương:
                  </Grid>
                  <div>ROUND 15PT ,D ,VS1</div>
                </Grid>

                <Grid container>
                  <Grid item xs={4}>
                    Kích Thước:
                  </Grid>
                  <div>4</div>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item sm={5.9} className={styles.section} p={2}>
              <Grid item lg={4} mb={{ xs: 3, lg: 0 }}>
                <img src={menring} className={styles.ringImg} />
              </Grid>

              <Grid container item lg={7} gap={2.5}>
                <Grid container>
                  <div>
                    <img src={female} width={15} style={{ marginRight: 6 }} />
                    Nhẫn Nữ
                  </div>
                </Grid>

                <Grid container>
                  <Grid item xs={4}>
                    Chất Liệu:
                  </Grid>
                  <div>Vàng Trắng 18K</div>
                </Grid>

                <Grid container>
                  <Grid item xs={4}>
                    Kim Cương:
                  </Grid>
                  <div>ROUND 15PT ,D ,VS1</div>
                </Grid>

                <Grid container>
                  <Grid item xs={4}>
                    Kích Thước:
                  </Grid>
                  <div>4</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "right", p: 2 }}>
            <Button
              variant="contained"
              sx={secondaryBtn}
              onClick={() =>
                navigate(`/customer/support/custom-order/detail/${1}`)
              }
            >
              Xem Chi Tiết
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CustomOrder;
