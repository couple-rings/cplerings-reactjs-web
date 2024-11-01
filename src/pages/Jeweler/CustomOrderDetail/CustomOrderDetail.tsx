import { Button, Grid } from "@mui/material";
import Divider from "@mui/material/Divider";

import blueprint from "src/assets/sampledata/blueprint.pdf";
import menring from "src/assets/sampledata/menring.png";
import HoverCard from "src/components/product/HoverCard";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from '@mui/icons-material/Female';
import styles from "./CustomOrderDetail.module.scss";

function CustomOrderDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Bản thiết kế chi tiết</div>
        <div className={styles.title}>#Customer_ID</div>
      </div>

      <div className={styles.customName}>
        DR FOREVER Two-row Diamond Pavé Wedding Rings
      </div>

      <Grid
        container
        justifyContent={"space-around"}
        className="container-biggest"
      >
        <Grid
          container
          item
          md={4}
          justifyContent={"center"}
          className="container-item"
          pb={5}
        >
          <Grid item xs={12} md={12} pb={3} className="image-item">
            <HoverCard file={blueprint} image={menring} />
          </Grid>

          <Grid container pb={5} className={styles.genderDefine}>
            <Grid item className="gender-icon">
              <MaleIcon sx={{ color: "#4994ec" }} />
            </Grid>
            <Grid item className="gender-name">
              Nam giới
            </Grid>
          </Grid>

          <Grid
            container
            item
            justifyContent={"center"}
            className="info-detail-container"
          >
            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Chất Liệu
              </Grid>
              <Grid item className="info-detail-content">
                18K white gold
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Kim cương
              </Grid>
              <Grid item className="info-detail-content">
                12PT, D
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Kích cỡ
              </Grid>
              <Grid item className="info-detail-content">
                3
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Khắc Chữ
              </Grid>
              <Grid item className="info-detail-content">
                Hehehoho
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Trọng Lượng
              </Grid>
              <Grid item className="info-detail-content">
                5 chỉ
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Ghi chú
              </Grid>
              <Grid item className="info-detail-content">
                Hong có gì hết chơn
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
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

        <Grid
          container
          item
          md={4}
          justifyContent={"center"}
          className="container-item"
          pb={5}
        >
          <Grid item xs={12} md={12} pb={3} className="image-item">
            <HoverCard file={blueprint} image={menring} />
          </Grid>

          <Grid container pb={5} className={styles.genderDefine}>
            <Grid item className="gender-icon">
              <FemaleIcon sx={{ color: "#ea394b" }} />
            </Grid>
            <Grid item className="gender-name">
              Nữ giới
            </Grid>
          </Grid>

          <Grid
            container
            item
            justifyContent={"center"}
            className="info-detail-container"
          >
            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Chất Liệu
              </Grid>
              <Grid item className="info-detail-content">
                18K white gold
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Kim cương
              </Grid>
              <Grid item className="info-detail-content">
                12PT, D
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Kích cỡ
              </Grid>
              <Grid item className="info-detail-content">
                3
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Khắc Chữ
              </Grid>
              <Grid item className="info-detail-content">
                Hehehoho
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Trọng Lượng
              </Grid>
              <Grid item className="info-detail-content">
                5 chỉ
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid container className={styles.infoDetail}>
              <Grid item className="info-detail-label">
                Ghi chú
              </Grid>
              <Grid item className="info-detail-content">
                Hong có gì hết chơn
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
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

      <Grid container justifyContent={"center"}>
        <Button>Nhận làm bản thiết kế này</Button>
      </Grid>
    </div>
  );
}

export default CustomOrderDetail;
