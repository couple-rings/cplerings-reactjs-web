import { Button, Chip, Divider, Grid } from "@mui/material";
import styles from "./CustomOrderDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { currencyFormatter } from "src/utils/functions";
import menring from "src/assets/sampledata/menring.png";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { secondaryBtn } from "src/utils/styles";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";

function CustomOrderDetail() {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const navigate = useNavigate();

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid item xs={10}>
        <div className={styles.title}>Chi Tiết Đơn Gia Công</div>
        <Grid container>
          <Grid container item xs={6}>
            <Grid container item fontSize={"1.2rem"} mt={1} mb={3}>
              <Grid item xs={3}>
                Mã Đơn:
              </Grid>
              <Grid item className={styles.info}>
                1234567
              </Grid>
            </Grid>

            <Grid container item fontSize={"1.2rem"} mb={3}>
              <Grid item xs={3}>
                Ngày Tạo:
              </Grid>
              <Grid item className={styles.info}>
                {moment().format("DD/MM/YYYY")}
              </Grid>
            </Grid>
          </Grid>

          <Grid container item xs={6}>
            <Grid
              container
              item
              fontSize={"1.2rem"}
              mb={3}
              alignItems={"center"}
            >
              <Grid item xs={3}>
                Trạng Thái:
              </Grid>
              <Grid item>
                <Chip label={"Chưa Thanh Toán"} color="warning" />
              </Grid>
            </Grid>

            <Grid container item fontSize={"1.2rem"} mb={2}>
              <Grid item xs={3}>
                Thợ Gia Công:
              </Grid>
              <Grid item className={styles.info}>
                N/A
              </Grid>
            </Grid>
          </Grid>

          <Grid container item fontSize={"1.2rem"} mb={2} alignItems={"center"}>
            <Grid item xs={1.5}>
              Tổng Tiền:
            </Grid>
            <Grid item className={styles.total}>
              {currencyFormatter(20000000)}
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"} mt={5}>
          <Grid container item xs={8} className={styles.card} py={5}>
            <Grid container item xs={6} justifyContent={"center"}>
              <Grid item xs={9} mb={3}>
                <img src={menring} className={styles.ringImage} />
              </Grid>

              <Grid item xs={12} textAlign={"center"} mb={5}>
                <img src={male} width={15} style={{ marginRight: 8 }} />
                Nhẫn Nam
              </Grid>

              <Grid item xs={9}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Chất Liệu
                  </Grid>
                  <Grid item>Vàng Trắng 18K</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kim Cương
                  </Grid>
                  <Grid item>15PT ,G ,VS1</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kích Thước
                  </Grid>
                  <Grid item>4</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khắc Chữ
                  </Grid>
                  <Grid item>NVA</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khối Lượng
                  </Grid>
                  <Grid item>3 Chỉ</Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container item xs={6} justifyContent={"center"}>
              <Grid item xs={9} mb={3}>
                <img src={menring} className={styles.ringImage} />
              </Grid>

              <Grid item xs={12} textAlign={"center"} mb={5}>
                <img src={female} width={15} style={{ marginRight: 8 }} />
                Nhẫn Nữ
              </Grid>

              <Grid item xs={9}>
                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Chất Liệu
                  </Grid>
                  <Grid item>Vàng Trắng 18K</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kim Cương
                  </Grid>
                  <Grid item>15PT ,G ,VS1</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Kích Thước
                  </Grid>
                  <Grid item>4</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khắc Chữ
                  </Grid>
                  <Grid item>NVA</Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />

                <Grid container justifyContent={"space-between"}>
                  <Grid item className={styles.label}>
                    Khối Lượng
                  </Grid>
                  <Grid item>3 Chỉ</Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container mt={10} className={styles.download}>
              <DownloadForOfflineRoundedIcon />
              <span>Tải File PDF</span>
            </Grid>

            <Grid container justifyContent={"center"} mt={5}>
              {
                // eslint-disable-next-line no-constant-condition
                true ? (
                  <Button
                    variant="contained"
                    sx={secondaryBtn}
                    onClick={() =>
                      navigate(
                        "/customer/support/custom-order/crafting-process"
                      )
                    }
                  >
                    Quá Trình Gia Công
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={secondaryBtn}
                    onClick={() => navigate("/customer/contract")}
                  >
                    Ký Hợp Đồng
                  </Button>
                )
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CustomOrderDetail;
