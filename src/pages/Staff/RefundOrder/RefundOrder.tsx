import { Button, Card, Grid, Divider } from "@mui/material";
import { currencyFormatter } from "src/utils/functions";
import styles from "./RefundOrder.module.scss";
import sample from "src/assets/sampledata/ringdesign.png";
import { secondaryBtn } from "src/utils/styles";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const refundOrders = [
  {
    id: 1,
    orderId: "824100998377",
    date: "09/10/2024",
    customerName: "Nguyễn Văn A",
    collection: "Bộ Sưu Tập FOREVER",
    price: 24000000,
    reason: "Kích thước không phù hợp",
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
    }
  }
];

function RefundOrder() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Danh Sách Đơn Hoàn Trả</div>
        <Button 
          className={styles.buttonCreate}
          onClick={() => navigate('/staff/refund-create-form')}
        >
          <AddCircleOutlineIcon /> <div>Tạo Đơn</div>
        </Button>
      </div>
      
      {refundOrders.map((order) => (
        <Card key={order.id} className={styles.orderCard}>
          <div className={styles.header}>
            <div className={styles.orderInfo}>
              <div className={styles.date}>Ngày: {order.date}</div>
              <div className={styles.orderId}>Mã đơn: {order.orderId}</div>
            </div>
          </div>

          <Grid container className={styles.body} spacing={3}>
            <Grid item xs={12} sm={3} md={2}>
              <img src={sample} alt="Product" className={styles.productImage} />
            </Grid>

            <Grid item xs={12} sm={9} md={7} className={styles.middle}>
              <div className={styles.collection}>
                <span className={styles.collectionIcon}>💍</span>
                {order.collection}
              </div>
              
              <div className={styles.customerInfo}>
                <span className={styles.label}>Khách hàng:</span>
                <span className={styles.value}>{order.customerName}</span>
              </div>
              
              <div className={styles.ringsInfo}>
                <div className={styles.ringSection}>
                  <div className={styles.ringTitle}>
                    <span className={styles.icon}>👨</span>
                    Nhẫn Nam
                  </div>
                  <div className={styles.specsCard}>
                    <div className={styles.spec}>
                      <span className={styles.label}>Chất liệu:</span>
                      <span className={styles.value}>{order.rings.male.material}</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.label}>Size:</span>
                      <span className={styles.value}>{order.rings.male.size}</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.label}>Kim cương:</span>
                      <span className={styles.value}>{order.rings.male.diamond}</span>
                    </div>
                  </div>
                </div>

                <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />

                <div className={styles.ringSection}>
                  <div className={styles.ringTitle}>
                    <span className={styles.icon}>👩</span>
                    Nhẫn Nữ
                  </div>
                  <div className={styles.specsCard}>
                    <div className={styles.spec}>
                      <span className={styles.label}>Chất liệu:</span>
                      <span className={styles.value}>{order.rings.female.material}</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.label}>Size:</span>
                      <span className={styles.value}>{order.rings.female.size}</span>
                    </div>
                    <div className={styles.spec}>
                      <span className={styles.label}>Kim cương:</span>
                      <span className={styles.value}>{order.rings.female.diamond}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.reason}>
                <span className={styles.label}>Lý do hoàn trả: </span>
                <span className={styles.value}>{order.reason}</span>
              </div>
            </Grid>

            <Grid container item xs={12} md={3} lg={2.5} className={styles.right}>
              <Grid item xs={12}>
                <div className={styles.price}>
                  {currencyFormatter(order.price)}
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ 
                    ...secondaryBtn,
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '1rem'
                  }}
                  onClick={() => navigate(`/staff/refund-order/detail/${order.id}`)}
                >
                  Chi Tiết
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
}

export default RefundOrder;