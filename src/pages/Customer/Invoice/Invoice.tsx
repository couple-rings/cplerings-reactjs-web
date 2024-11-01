import { Divider, Grid, SxProps } from "@mui/material";
import styles from "./Invoice.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import PulseIcon from "src/components/icon/PulseIcon";
import DoneIcon from "@mui/icons-material/Done";
import { currencyFormatter } from "src/utils/functions";
import moment from "moment";
import DownloadForOfflineRoundedIcon from "@mui/icons-material/DownloadForOfflineRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const iconStyle: SxProps = {
  color: "white",
  fontSize: 30,
};

function Invoice() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Grid container item xs={11} xl={10}>
        <Grid item className={styles.homeLink} onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
          <span>Trang Chủ</span>
        </Grid>

        <Grid container item justifyContent={"center"}>
          <Grid container item sm={8} lg={6} className={styles.body}>
            <Grid item xs={12} className={styles.upper}>
              <PulseIcon
                backgroundColor="#23A26D"
                icon={<DoneIcon sx={iconStyle} />}
              />
              <div className={styles.status}>
                {
                  // eslint-disable-next-line no-constant-condition
                  true
                    ? "Thanh Toán Thành Công!"
                    : "Thanh Toán Không Thành Công!"
                }
              </div>
              <div className={styles.amount}>{currencyFormatter(350000)}</div>

              <Divider sx={{ width: "80%", mb: 5 }} />
            </Grid>

            <Grid container item xs={12} justifyContent={"space-between"}>
              <Grid container item xs={6} gap={3} className={styles.label}>
                <div>Ngày Giao Dịch</div>
                <div>Phương Thức Thanh Toán</div>
                <div>Người Thực Hiện</div>
              </Grid>
              <Grid container item xs={6} gap={3} className={styles.info}>
                <div>{moment().format("DD-MM-YYYY, HH:mm:ss")}</div>
                <div>VNPAY</div>
                <div>Nguyễn Văn A</div>
              </Grid>

              <Grid container item justifyContent={"center"}>
                <Divider sx={{ width: "80%", borderStyle: "dashed", my: 3 }} />
              </Grid>

              {true && (
                <>
                  <Grid container item xs={6} gap={3} className={styles.label}>
                    <div>Tổng Tiền</div>
                  </Grid>

                  <Grid container item xs={6} gap={3} className={styles.info}>
                    <div>{currencyFormatter(350000)}</div>
                  </Grid>
                </>
              )}
            </Grid>

            {true && (
              <Grid item xs={12} className={styles.bottom}>
                <DownloadForOfflineRoundedIcon fontSize="large" />
                <span>Tải File PDF</span>
              </Grid>
            )}

            {false && (
              <Grid container item xs={12} className={styles.error}>
                <Grid item className={styles.left}>
                  <div className={styles.iconContainer}>
                    <HelpOutlineOutlinedIcon sx={{ color: "#B43620" }} />
                  </div>
                  <div>
                    <div className={styles.upperText}>
                      Gặp vấn đề khi thanh toán?
                    </div>
                    <div className={styles.lowerText}>
                      Hãy cho chúng tôi biết tại Trung Tâm Hỗ Trợ.
                    </div>
                  </div>
                </Grid>

                <Grid item>
                  <KeyboardArrowRightOutlinedIcon sx={{ color: "#B43620" }} />
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Invoice;
