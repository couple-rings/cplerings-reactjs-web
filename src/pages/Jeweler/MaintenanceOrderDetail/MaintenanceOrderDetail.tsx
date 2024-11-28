import { Button, Card, Chip, Divider, Grid, Stack } from "@mui/material";
import styles from "./MaintenanceOrderDetail.module.scss";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "src/utils/functions";
import sample from "src/assets/sampledata/ringdesign.png";
import { primaryBtn, secondaryBtn } from "src/utils/styles";

const maintainService = [
  {
    id: 1,
    title: "Đánh bóng bề mặt của nhẫn",
    price: 100000,
    description: "Làm sạch và đánh bóng để loại bỏ vết xước nhỏ, giúp nhẫn sáng bóng như mới.",
    recommend: "Khuyến nghị: 1-2 lần/năm",
  },
  {
    id: 2,
    title: "Mạ lại bề mặt nhẫn",
    price: 100000,
    description: "Phủ lại lớp mạ để giữ màu sắc và độ sáng bóng của nhẫn.",
    recommend: "Khuyến nghị: 1-2 lần/năm",
  },
];

function MaintenanceOrderDetail() {
  const navigate = useNavigate();
  const isAssigned = false;

  return (
    <Grid container className={styles.container} justifyContent="center">
      <Grid item xs={11}>
        <div className={styles.title}>Chi Tiết Đơn Bảo Trì</div>
        
        <Card className={styles.orderInfo}>
          <Grid container p={3} spacing={3}>
            <Grid item xs={12}>
              <div className={styles.header}>
                <div>
                  <div className={styles.orderId}>Mã đơn: 824000000777</div>
                  <div className={styles.date}>Ngày tạo: 09/10/2024</div>
                </div>
                <Chip label="Đang xử lý" color="warning" />
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <img src={sample} alt="Ring" className={styles.productImage} />
            </Grid>

            <Grid item xs={12} md={8}>
              <div className={styles.customerInfo}>
                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Thông Tin Khách Hàng</div>
                  <div className={styles.info}>
                    <div className={styles.name}>Nguyễn Văn A</div>
                    <div className={styles.phone}>0987654321</div>
                    <div className={styles.address}>
                      123 Đường ABC, Phường XYZ, Quận 1, TP.HCM
                    </div>
                  </div>
                </div>

                <Divider sx={{ my: 3 }} />

                <div className={styles.section}>
                  <div className={styles.sectionTitle}>Dịch Vụ Yêu Cầu</div>
                  {maintainService.map((service) => (
                    <div key={service.id} className={styles.serviceItem}>
                      <div className={styles.serviceHeader}>
                        <div className={styles.serviceName}>{service.title}</div>
                        <div className={styles.servicePrice}>
                          {currencyFormatter(service.price)}
                        </div>
                      </div>
                      <div className={styles.serviceDesc}>{service.description}</div>
                      <div className={styles.serviceRecommend}>{service.recommend}</div>
                    </div>
                  ))}
                </div>

                <Divider sx={{ my: 3 }} />

                <div className={styles.totalSection}>
                  <div className={styles.totalLabel}>Tổng chi phí:</div>
                  <div className={styles.totalAmount}>
                    {currencyFormatter(200000)}
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Card>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          mt={4}
          className={styles.buttonGroup}
        >
          <Button
            variant="contained"
            sx={{
              ...secondaryBtn,
              width: "200px",
              fontSize: "1.1rem",
              padding: "10px 0",
            }}
            onClick={() => navigate('/jeweler/maintenance-order')}
          >
            Quay Lại
          </Button>

          {isAssigned ? (
            <Button
              variant="contained"
              sx={{
                ...primaryBtn,
                width: "200px",
                fontSize: "1.1rem",
                padding: "10px 0",
              }}
              onClick={() => {
                console.log("Update process clicked");
              }}
            >
              Cập Nhật Tiến Độ
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                ...primaryBtn,
                width: "200px",
                fontSize: "1.1rem",
                padding: "10px 0",
              }}
              onClick={() => {
                console.log("Receive order clicked");
              }}
            >
              Nhận Đơn
            </Button>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MaintenanceOrderDetail;
