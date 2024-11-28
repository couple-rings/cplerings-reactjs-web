import { Button, Card, Chip, Divider, Grid } from "@mui/material";
import { currencyFormatter } from "src/utils/functions";
import styles from "./MaintenanceList.module.scss";
import sample from "src/assets/sampledata/ringdesign.png";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";

const maintainService = [
  {
    id: 1,
    title: "Đánh bóng bề mặt của nhẫn",
    price: 100000,
    description: "Làm sạch và đánh bóng để loại bỏ vết xước nhỏ, giúp nhẫn sáng bóng như mới.",
  },
  {
    id: 2,
    title: "Mạ lại bề mặt nhẫn",
    price: 100000,
    description: "Phủ lại lớp mạ để giữ màu sắc và độ sáng bóng của nhẫn.",
  },
];

function MaintenanceList() {
  const navigate = useNavigate();

  return (
    <>
      <Card className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div>09/10/2024</div>
            <div>Mã đơn: 824000000777</div>
          </div>
          <Chip label="Đang xử lý" color="warning" />
        </div>

        <Grid container className={styles.body}>
          <Grid item xs={12} sm={3} md={2}>
            <img src={sample} alt="Ring" className={styles.productImage} />
          </Grid>

          <Grid item xs={12} sm={9} md={7} className={styles.middle}>
            <div className={styles.title}>Dịch Vụ Bảo Trì và Bảo Dưỡng</div>
            <div className={styles.customerInfo}>
              <span className={styles.label}>Khách hàng:</span>
              <span>Nguyễn Văn A</span>
            </div>
            <div className={styles.services}>
              {maintainService.map((service) => (
                <div key={service.id} className={styles.service}>
                  <div className={styles.serviceName}>{service.title}</div>
                  <div className={styles.serviceDesc}>{service.description}</div>
                  <div className={styles.price}>
                    {currencyFormatter(service.price)}
                  </div>
                </div>
              ))}
            </div>
          </Grid>

          <Grid container item xs={12} md={3} lg={2.5} className={styles.right}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ ...secondaryBtn }}
                onClick={() => navigate(`/jeweler/maintenance-order/detail/1`)}
              >
                Chi Tiết
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <Divider sx={{ backgroundColor: "#555", my: 5 }} />
    </>
  );
}

export default MaintenanceList;