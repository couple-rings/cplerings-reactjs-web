import {  Grid } from "@mui/material";
import Divider from '@mui/material/Divider';
import blueprint from "src/assets/sampledata/blueprint.pdf";
import menring from "src/assets/sampledata/menring.png";
import HoverCard from "src/components/product/HoverCard";
import MaleIcon from "@mui/icons-material/Male";
import styles from "./OrderCustomDetail.module.scss";

function OrderCustomDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Bản thiết kế chi tiết</div>
        <div className={styles.title}>#Customer_ID</div>
      </div>

      <div className={styles.customName}>
        DR FOREVER Two-row Diamond Pavé Wedding Rings
      </div>

      <Grid container className="container-biggest">
        <Grid container item md={5} justifyContent={"center"} className="container-item">
          <Grid item xs={12} md={12} pb={3} className="image-item">
            <HoverCard file={blueprint} image={menring} />
          </Grid>

          <Grid container pb={5} className={styles.genderDefine}>
            <Grid item  className="gender-icon">
              <MaleIcon />
            </Grid>
            <Grid item className="gender-name">
              Nam giới
            </Grid>
          </Grid>

          <Grid container item justifyContent={"center"} className="info-detail-container">
            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Chất Liệu
              </Grid>
              <Grid item className="info-detail-content">
                18K white gold
              </Grid>
            </Grid>

            <Divider/>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Kim cương
              </Grid>
              <Grid item className="info-detail-content">
                12PT, D
              </Grid>
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Kích cỡ
              </Grid>
              <Grid item className="info-detail-content">
                3
              </Grid>
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Khắc Chữ
              </Grid>
              <Grid item className="info-detail-content">
                Hehehoho
              </Grid>
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Trọng Lượng
              </Grid>
              <Grid item className="info-detail-content">
                5 chỉ
              </Grid>
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Ghi chú
              </Grid>
              <Grid item className="info-detail-content">
                Hong có gì hết chơn
              </Grid>
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Giá
              </Grid>
              <Grid item className="info-detail-content">
                1,000,000VND
              </Grid>
            </Grid>


          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default OrderCustomDetail;
