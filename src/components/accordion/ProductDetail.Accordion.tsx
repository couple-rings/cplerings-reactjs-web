import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import CustomExpandIcon from "src/components/icon/CustomExpandIcon";
import styles from "./ProductDetailAccordion.module.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PinterestIcon from "@mui/icons-material/Pinterest";

function ProductDetailAccordion() {
  return (
    <div className={styles.container}>
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<CustomExpandIcon />} sx={{ p: 0 }}>
          <div className={styles.title}>Chi Tiết</div>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ mb: 2 }}>
            <div className={styles.title}>Thông Tin Nhẫn</div>
            <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

            <Grid container className={styles.section}>
              <Grid item xs={4} className={styles.label}>
                <div>Phân loại</div>
                <div>Chất liệu</div>
                <div>Bộ sưu tập</div>
              </Grid>
              <Grid item xs={8} className={styles.content}>
                <div>Nam: Nhẫn Cưới / Nữ: Nhẫn Cưới</div>
                <div>Nam: Vàng hồng 18K / Nữ: Vàng trắng 18K</div>
                <div>Nam: FOREVER / Nữ: FOREVER</div>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 2 }}>
            <div className={styles.title}>Kim Cương</div>
            <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

            <Grid container className={styles.section}>
              <Grid item xs={4} className={styles.label}>
                <div>Trọng lượng</div>
                <div>Hình dáng</div>
                <div>Màu sắc</div>
                <div>Độ tinh khiết</div>
              </Grid>
              <Grid item xs={8} className={styles.content}>
                <div>Nam: 0.03 / Nữ: 0.03</div>
                <div>Nam: Tròn / Nữ: Trái Tim</div>
                <div>Nam: H / Nữ: F</div>
                <div>Nam: SI1 / Nữ: VS1</div>
              </Grid>
            </Grid>

            <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />
            <Grid container className={styles.section}>
              <Grid item xs={4} className={styles.label}>
                <div>Số kim cương tấm</div>
                <div>Tổng trọng lượng</div>
              </Grid>
              <Grid item xs={8} className={styles.content}>
                <div>Nam: 6 viên / Nữ: 8 viên</div>
                <div>Nam: 0.07 / Nữ: 0.08</div>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Divider sx={{ backgroundColor: "#ccc", my: 1 }} />

      <div className={styles.share}>
        <span>Share:</span>
        <div className={styles.iconBar}>
          <FacebookIcon fontSize="large" className={styles.icon} />
          <InstagramIcon fontSize="large" className={styles.icon} />
          <TwitterIcon fontSize="large" className={styles.icon} />
          <WhatsAppIcon fontSize="large" className={styles.icon} />
          <PinterestIcon fontSize="large" className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetailAccordion;
