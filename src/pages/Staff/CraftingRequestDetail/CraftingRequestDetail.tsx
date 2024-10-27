import { Button, Divider, Grid } from "@mui/material";
import styles from "./CraftingRequestDetail.module.scss";
import menring from "src/assets/sampledata/menring.png";
import womenring from "src/assets/sampledata/womenring.png";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import HoverCard from "src/components/product/HoverCard";
import blueprint from "src/assets/sampledata/blueprint.pdf";
import { roundedPrimaryBtn } from "src/utils/styles";

function CraftingRequestDetail() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Yêu Cầu Chế Tác</div>

      <Grid container justifyContent={"center"}>
        <Grid container item xs={10} justifyContent={"space-between"}>
          <Grid item xs={5}>
            <HoverCard image={menring} file={blueprint} shadow={true} />
            <div className={styles.label}>
              <img src={male} />
              <span>Nhẫn Nam</span>
            </div>

            <div className={styles.info}>
              <div className={styles.row}>
                <div className={styles.field}>Chất liệu</div>
                <div className={styles.value}>Vàng trắng 18K</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kim cương</div>
                <div className={styles.value}>Round 12PT, D, VS1</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kích thước</div>
                <div className={styles.value}>14 mm</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Trọng lượng</div>
                <div className={styles.value}>3 chỉ</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Khắc chữ</div>
                <div className={styles.value}>Bean Nguyen</div>
              </div>
            </div>
          </Grid>

          <Grid item xs={5}>
            <HoverCard image={womenring} file={blueprint} shadow={true} />
            <div className={styles.label}>
              <img src={female} />
              <span>Nhẫn Nữ</span>
            </div>

            <div className={styles.info}>
              <div className={styles.row}>
                <div className={styles.field}>Chất liệu</div>
                <div className={styles.value}>Vàng trắng 18K</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kim cương</div>
                <div className={styles.value}>Round 12PT, D, VS1</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Kích thước</div>
                <div className={styles.value}>14 mm</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Trọng lượng</div>
                <div className={styles.value}>3 chỉ</div>
              </div>
              <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

              <div className={styles.row}>
                <div className={styles.field}>Khắc chữ</div>
                <div className={styles.value}>Bean Nguyen</div>
              </div>
            </div>
          </Grid>

          <Grid container item xs={12} justifyContent={"center"} mt={3} gap={3}>
            <Grid item xs={4}>
              <Button variant="contained" fullWidth sx={roundedPrimaryBtn}>
                Chấp Nhận
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button variant="contained" fullWidth sx={roundedPrimaryBtn}>
                Từ Chối
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CraftingRequestDetail;
