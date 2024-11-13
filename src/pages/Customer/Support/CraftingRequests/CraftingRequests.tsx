import { Box, Button, Chip, Divider, Grid } from "@mui/material";
import styles from "./CraftingRequests.module.scss";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";

function CraftingRequests() {
  const navigate = useNavigate();

  return (
    <Grid container className={styles.container} justifyContent={"center"}>
      <Grid
        container
        item
        xs={11}
        lg={10}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={7}
      >
        <Box sx={{ mb: 3 }} className={styles.title}>
          Yêu Cầu Gia Công
        </Box>
        <Button
          variant="contained"
          sx={{ ...secondaryBtn, mb: 3 }}
          onClick={() => navigate("/customer/support/crafting-request/create")}
        >
          Tạo Yêu Cầu
        </Button>
      </Grid>

      <Grid container item xs={11} lg={10} alignItems={"center"}>
        <Grid item md={4} mb={2}>
          <div>
            <Box sx={{ marginBottom: "1.5rem" }}>
              <img src={male} width={18} />
              <span className={styles.subtitle}>Thiết Kế Của Nam</span>
            </Box>

            <Grid container gap={11} mb={2}>
              <div>File thiết kế:</div>
              <a href="#" className={styles.download}>
                <DownloadRoundedIcon />
                Tải Về
              </a>
            </Grid>

            <Grid container gap={10.6} mb={2}>
              <div>Trọng lượng:</div>
              <div>3 Chỉ</div>
            </Grid>

            <Grid container gap={5} mb={2}>
              <div>Số kim cương phụ:</div>
              <div>8 Viên</div>
            </Grid>
          </div>
        </Grid>

        <Grid container item md={8}>
          <Grid item xs={12} lg={5.8} className={styles.request}>
            <Chip
              label={"Đang chờ duyệt"}
              color={"warning"}
              className={styles.status}
            />
            <Grid container gap={5} mb={1} alignItems={"center"}>
              <div className={styles.label}>
                <ArrowRightRoundedIcon />
                Kim Cương
              </div>
              <div style={{ fontStyle: "italic", fontWeight: 300 }}>
                15PT ,G ,VS1
              </div>
            </Grid>
            <Grid container gap={6} mb={1} alignItems={"center"}>
              <div className={styles.label}>
                <ArrowRightRoundedIcon />
                Chất Liệu
              </div>
              <div style={{ fontStyle: "italic", fontWeight: 300 }}>
                18K Gold - Yellow
              </div>
            </Grid>
            <Grid container gap={6} mb={1} alignItems={"center"}>
              <div className={styles.label}>
                <ArrowRightRoundedIcon />
                Khắc Chữ
              </div>
              <div style={{ fontWeight: 300 }}>NVA</div>
            </Grid>
            <Grid container gap={4.5} alignItems={"center"}>
              <div className={styles.label}>
                <ArrowRightRoundedIcon />
                Kích Thước
              </div>
              <div style={{ fontWeight: 300 }}>4</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container item xs={10}>
        <Divider sx={{ width: "100%", mt: 8, mb: 10 }} />
      </Grid>

      <Grid container item xs={11} lg={10} alignItems={"center"}>
        <Grid item xs={12} md={4} mb={2}>
          <div>
            <Box sx={{ marginBottom: "1.5rem" }}>
              <img src={female} width={18} />
              <span className={styles.subtitle}>Thiết Kế Của Nữ</span>
            </Box>

            <Grid container gap={11} mb={2}>
              <div>File thiết kế:</div>
              <a href="#" className={styles.download}>
                <DownloadRoundedIcon />
                Tải Về
              </a>
            </Grid>

            <Grid container gap={10.6} mb={2}>
              <div>Trọng lượng:</div>
              <div>3 Chỉ</div>
            </Grid>

            <Grid container gap={5} mb={2}>
              <div>Số kim cương phụ:</div>
              <div>8 Viên</div>
            </Grid>
          </div>
        </Grid>

        <Grid container item xs={12} md={8}>
          <Grid item xs={12} lg={5.8} className={styles.request}>
            <Chip
              label={"Đang chờ duyệt"}
              color={"warning"}
              className={styles.status}
            />
            <Grid container gap={5} mb={1} alignItems={"center"}>
              <div className={styles.label}>
                <ArrowRightRoundedIcon />
                Kim Cương
              </div>
              <div style={{ fontStyle: "italic", fontWeight: 300 }}>
                15PT ,G ,VS1
              </div>
            </Grid>
            <Grid container gap={6} mb={1} alignItems={"center"}>
              <div className={styles.label}>
                <ArrowRightRoundedIcon />
                Chất Liệu
              </div>
              <div style={{ fontStyle: "italic", fontWeight: 300 }}>
                18K Gold - Yellow
              </div>
            </Grid>
            <Grid container gap={6} mb={1} alignItems={"center"}>
              <div className={styles.label}>
                <ArrowRightRoundedIcon />
                Khắc Chữ
              </div>
              <div style={{ fontWeight: 300 }}>NVA</div>
            </Grid>
            <Grid container gap={4.5} alignItems={"center"}>
              <div className={styles.label}>
                <ArrowRightRoundedIcon />
                Kích Thước
              </div>
              <div style={{ fontWeight: 300 }}>4</div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CraftingRequests;
