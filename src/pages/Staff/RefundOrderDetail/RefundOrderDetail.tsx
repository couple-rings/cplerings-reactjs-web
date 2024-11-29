import { Button, Card, Divider, Grid, Stack } from "@mui/material";
import styles from "./RefundOrderDetail.module.scss";
import { useNavigate } from "react-router-dom";
import { currencyFormatter } from "src/utils/functions";
import sample from "src/assets/sampledata/ringdesign.png";
import { secondaryBtn } from "src/utils/styles";

const refundOrder = {
  id: 1,
  orderId: "824100998377",
  date: "09/10/2024",
  customerName: "Nguyễn Văn A",
  phone: "0987654321",
  address: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM",
  collection: "Bộ Sưu Tập FOREVER",
  price: 24000000,
  reason: "Kích thước không phù hợp",
  description: "Nhẫn nam hơi rộng và nhẫn nữ hơi chật, cần điều chỉnh kích thước cả đôi.",
  rings: {
    male: {
      material: "Vàng Trắng 18K",
      size: "15",
      diamond: "5PT, F, SI1"
    },
    female: {
      material: "Vàng Trắng 18K",
      size: "10",
      diamond: "5PT, F, SI1"
    }
  },
  images: [sample, sample, sample]
};

function RefundOrderDetail() {
  const navigate = useNavigate();

  return (
    <Grid container className={styles.container} justifyContent="center">
      <Grid item xs={11}>
        <div className={styles.title}>Chi Tiết Đơn Hoàn Trả</div>
        
        <Card className={styles.orderInfo}>
          <Grid container p={3} spacing={3}>
            <Grid item xs={12}>
              <div className={styles.header}>
                <div className={styles.orderInfo}>
                  <div>Ngày: {refundOrder.date}</div>
                  <div>Mã đơn: {refundOrder.orderId}</div>
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={4}>
              <img src={refundOrder.images[0]} alt="Product" className={styles.mainImage} />
              <Grid container spacing={2} mt={2}>
                {refundOrder.images.slice(1).map((image, index) => (
                  <Grid item xs={6} key={index}>
                    <img src={image} alt={`Evidence ${index + 1}`} className={styles.evidenceImage} />
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={8}>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <span className={styles.icon}>💍</span>
                  Thông Tin Sản Phẩm
                </div>
                <div className={styles.collection}>{refundOrder.collection}</div>
                <div className={styles.price}>{currencyFormatter(refundOrder.price)}</div>
                
                <div className={styles.ringsContainer}>
                  <div className={styles.ringBox}>
                    <div className={styles.ringHeader}>
                      <span className={styles.ringIcon}>👨</span>
                      <span className={styles.ringTitle}>Nhẫn Nam</span>
                    </div>
                    <div className={styles.ringSpecs}>
                      <div className={styles.specItem}>
                        <div className={styles.specLabel}>Chất liệu</div>
                        <div className={styles.specValue}>{refundOrder.rings.male.material}</div>
                      </div>
                      <div className={styles.specItem}>
                        <div className={styles.specLabel}>Size</div>
                        <div className={styles.specValue}>{refundOrder.rings.male.size}</div>
                      </div>
                      <div className={styles.specItem}>
                        <div className={styles.specLabel}>Kim cương</div>
                        <div className={styles.specValue}>{refundOrder.rings.male.diamond}</div>
                      </div>
                    </div>
                  </div>

                  <Divider orientation="vertical" flexItem />

                  <div className={styles.ringBox}>
                    <div className={styles.ringHeader}>
                      <span className={styles.ringIcon}>👩</span>
                      <span className={styles.ringTitle}>Nhẫn Nữ</span>
                    </div>
                    <div className={styles.ringSpecs}>
                      <div className={styles.specItem}>
                        <div className={styles.specLabel}>Chất liệu</div>
                        <div className={styles.specValue}>{refundOrder.rings.female.material}</div>
                      </div>
                      <div className={styles.specItem}>
                        <div className={styles.specLabel}>Size</div>
                        <div className={styles.specValue}>{refundOrder.rings.female.size}</div>
                      </div>
                      <div className={styles.specItem}>
                        <div className={styles.specLabel}>Kim cương</div>
                        <div className={styles.specValue}>{refundOrder.rings.female.diamond}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Divider sx={{ my: 3 }} />

              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <span className={styles.icon}>👤</span>
                  Thông Tin Khách Hàng
                </div>
                <div className={styles.customerInfo}>
                  <div className={styles.name}>{refundOrder.customerName}</div>
                  <div className={styles.phone}>{refundOrder.phone}</div>
                  <div className={styles.address}>{refundOrder.address}</div>
                </div>
              </div>

              <Divider sx={{ my: 3 }} />

              <div className={styles.section}>
                <div className={styles.sectionTitle}>
                  <span className={styles.icon}>❗</span>
                  Lý Do Hoàn Trả
                </div>
                <div className={styles.reason}>{refundOrder.reason}</div>
                <div className={styles.description}>{refundOrder.description}</div>
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
            onClick={() => navigate('/staff/refund-order')}
          >
            Quay Lại
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default RefundOrderDetail;