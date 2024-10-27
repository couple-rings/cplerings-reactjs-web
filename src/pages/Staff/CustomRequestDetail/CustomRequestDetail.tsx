import { useParams } from "react-router-dom";
import styles from "./CustomRequestDetail.module.scss";
import menring from "src/assets/sampledata/menring.png";
import womenring from "src/assets/sampledata/womenring.png";
import { Button, Grid } from "@mui/material";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import { roundedPrimaryBtn } from "src/utils/styles";
import blueprint from "src/assets/sampledata/blueprint.pdf";
import HoverCard from "src/components/product/HoverCard";

const metals = ["Vàng Trắng 18K", "Vàng Thường 18K", "Vàng Hồng 18K"];
const diamonds = ["5PT ,F ,SI1", "10PT ,F ,VS2", "15PT ,G ,SI1"];

function CustomRequestDetail() {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        DR FOREVER Two-row Diamond Pavé Wedding Rings
      </div>

      <Grid container item xs={12} justifyContent={"center"}>
        <Grid container className={styles.section}>
          <Grid item xs={12} md={4}>
            <HoverCard file={blueprint} image={menring} />
          </Grid>

          <Grid item xs={12} md={7.5} className={styles.right}>
            <div className={styles.gender}>
              <img src={male} />
              <span>Nam Giới</span>
            </div>

            <Grid container gap={3} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Chất Liệu:
              </Grid>
              <div>
                {metals.map((item, index) => {
                  return (
                    <div key={index} className={styles.item}>
                      - {item}
                    </div>
                  );
                })}
              </div>
            </Grid>

            <Grid container gap={3} my={2} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Kim Cương:
              </Grid>
              <div>
                {diamonds.map((item, index) => {
                  return (
                    <div key={index} className={styles.item}>
                      - {item}
                    </div>
                  );
                })}
              </div>
            </Grid>

            <Grid container gap={3} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Trọng Lượng:
              </Grid>
              <div className={styles.item}>2 chỉ</div>
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={styles.section}>
          <Grid item xs={12} md={4}>
            <HoverCard file={blueprint} image={womenring} />
          </Grid>

          <Grid item xs={12} md={7.5} className={styles.right}>
            <div className={styles.gender}>
              <img src={female} />
              <span>Nữ Giới</span>
            </div>

            <Grid container gap={3} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Chất Liệu:
              </Grid>
              <div>
                {metals.map((item, index) => {
                  return (
                    <div key={index} className={styles.item}>
                      - {item}
                    </div>
                  );
                })}
              </div>
            </Grid>

            <Grid container gap={3} my={2} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Kim Cương:
              </Grid>
              <div>
                {diamonds.map((item, index) => {
                  return (
                    <div key={index} className={styles.item}>
                      - {item}
                    </div>
                  );
                })}
              </div>
            </Grid>

            <Grid container gap={3} alignItems={"baseline"}>
              <Grid item xs={4} lg={2.5} className={styles.label}>
                Trọng Lượng:
              </Grid>
              <div className={styles.item}>2 chỉ</div>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid item xs={8} md={4}>
            <Button variant="contained" fullWidth sx={roundedPrimaryBtn}>
              Nhận Yêu Cầu
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CustomRequestDetail;
