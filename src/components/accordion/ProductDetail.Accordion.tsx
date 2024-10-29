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
import { meleeDiamondCarat } from "src/utils/constants";

function ProductDetailAccordion(props: IProductDetailAccordionProps) {
  const { collectionName, category, maleDetail, femaleDetail } = props;

  return (
    <div className={styles.container}>
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary expandIcon={<CustomExpandIcon />} sx={{ p: 0 }}>
          <div className={styles.title}>Chi Tiết</div>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <Box sx={{ mb: 2 }}>
            <div className={styles.title}>
              {category ? "Thông Tin Trang Sức" : "Thông Tin Nhẫn"}
            </div>
            <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />

            <Grid container className={styles.section}>
              <Grid item xs={4} className={styles.label}>
                <div>Phân loại</div>
                <div>Chất liệu</div>
                <div>Bộ sưu tập</div>
              </Grid>
              <Grid item xs={8} className={styles.content}>
                <div>{category ? category : "Nhẫn Cưới"}</div>
                <div>
                  {maleDetail &&
                    femaleDetail &&
                    `Nam: ${maleDetail.metalSpec.name} / Nữ: ${femaleDetail.metalSpec.name}`}
                </div>
                <div>{collectionName}</div>
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
                <div>
                  {maleDetail &&
                    femaleDetail &&
                    `Nam: ${maleDetail.diamondSpec.weight} / Nữ: ${femaleDetail.diamondSpec.weight}`}
                </div>
                <div>
                  {maleDetail &&
                    femaleDetail &&
                    `Nam: ${maleDetail.diamondSpec.shape} / Nữ: ${femaleDetail.diamondSpec.shape}`}
                </div>
                <div>
                  {maleDetail &&
                    femaleDetail &&
                    `Nam: ${maleDetail.diamondSpec.color} / Nữ: ${femaleDetail.diamondSpec.color}`}
                </div>
                <div>
                  {maleDetail &&
                    femaleDetail &&
                    `Nam: ${maleDetail.diamondSpec.clarity} / Nữ: ${femaleDetail.diamondSpec.clarity}`}
                </div>
              </Grid>
            </Grid>

            <Divider sx={{ backgroundColor: "#ccc", my: 2 }} />
            <Grid container className={styles.section}>
              <Grid item xs={4} className={styles.label}>
                <div>Số kim cương tấm</div>
                <div>Tổng trọng lượng</div>
              </Grid>
              <Grid item xs={8} className={styles.content}>
                <div>
                  {maleDetail &&
                    femaleDetail &&
                    `Nam: ${maleDetail.sideDiamondsCount} viên / Nữ: ${femaleDetail.sideDiamondsCount} viên`}
                </div>
                <div>
                  {" "}
                  {maleDetail &&
                    femaleDetail &&
                    `Nam: ${
                      maleDetail.sideDiamondsCount * meleeDiamondCarat
                    } / Nữ: ${
                      femaleDetail.sideDiamondsCount * meleeDiamondCarat
                    }`}
                </div>
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
