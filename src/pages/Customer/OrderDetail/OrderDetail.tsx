import styles from "./OrderDetail.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Grid } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CustomizedSteppers from "src/components/stepper/Stepper";
import sample from "src/assets/sampledata/ringdesign.png";
import { currencyFormatter } from "src/utils/functions";

function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  console.log(id);

  return (
    <div className={styles.container}>
      <Grid container xs={11} item xl={7} className={styles.head}>
        <div
          className={styles.backLink}
          onClick={() => navigate("/customer/orders")}
        >
          <ArrowBackIosIcon />
          <span>Quay Lại</span>
        </div>
      </Grid>

      <Grid container item xs={11} lg={8} xl={6} className={styles.body}>
        <div className={styles.title}>Chi Tiết Đơn</div>
        <div className={styles.status}>Chưa Thanh Toán</div>

        <Grid container justifyContent={"center"}>
          <Grid item xs={12} md={8} lg={6}>
            <CustomizedSteppers activeStep={0} />
          </Grid>
        </Grid>

        <div className={styles.orderNo}>Mã Đơn: 824100998377</div>
        <div className={styles.datetime}>09/10/2024 7:55 PM</div>

        <Grid container justifyContent={"center"}>
          <Grid item xs={10} sm={6} md={4} lg={2.5}>
            <img src={sample} className={styles.productImg} />
          </Grid>
        </Grid>

        <div className={styles.collection}>Bộ Sưu Tập FOREVER</div>
        <Box sx={{ display: "flex", gap: 3, my: 2, justifyContent: "center" }}>
          <div>
            <span className={styles.label}>Chất liệu</span>
            <span>Vàng Trắng 18K</span>
          </div>
          <div>
            <span className={styles.label}>Kích thước</span>
            <span>5</span>
          </div>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <span className={styles.label}>Kim cương</span>
          <span>5PT, F, SI1</span>
        </Box>
        <div className={styles.price}>{currencyFormatter(12000000)}</div>

        <Grid container justifyContent={"space-between"}>
          <Grid item sm={5} md={4} className={styles.left}>
            <div className={styles.title}>Thông Tin Giao Hàng</div>
            <div className={styles.name}>Tín Quốc</div>
            <div className={styles.address}>
              Chung cư NestHome Block1.2 phòng 110, đường Chu Huy Mân,Đà
              Nẵng,Quận Sơn Trà
            </div>
            <div className={styles.phone}>0987446873</div>
          </Grid>
          <Grid item sm={5} md={4} className={styles.right}>
            <div className={styles.title}>Thông Tin Thanh Toán</div>
            <div className={styles.fee}>
              <span>Tiền Hàng:</span>
              <span>{currencyFormatter(12000000)}</span>
            </div>
            <div className={styles.fee}>
              <span>Vận Chuyển:</span>
              <span>{currencyFormatter(0)}</span>
            </div>
            <div className={styles.fee}>
              <span>Tổng Cộng:</span>
              <span>{currencyFormatter(12000000)}</span>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderDetail;
