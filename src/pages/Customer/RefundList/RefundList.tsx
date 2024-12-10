import { Button, Card, Grid } from "@mui/material";
import styles from "./RefundList.module.scss";
import { currencyFormatter } from "src/utils/functions";
import sample from "src/assets/sampledata/ringdesign.png";
import { useNavigate } from "react-router-dom";

const refundOrders = [
  {
    id: 1,
    orderId: "824100998377",
    date: "09/10/2024",
    status: "Đang xử lý",
    collection: "Bộ Sưu Tập FOREVER",
    price: 24000000,
    reason: "Kích thước không phù hợp",
    type: "standard",
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
  },
  {
    id: 2,
    orderId: "824100998378",
    date: "10/10/2024",
    status: "Đang xử lý",
    collection: "Thiết Kế Đặc Biệt",
    price: 35000000,
    reason: "Không đúng mẫu thiết kế",
    type: "custom",
    rings: {
      male: {
        material: "Vàng Hồng 18K",
        size: "16",
        diamond: "10PT, F, VS1"
      },
      female: {
        material: "Vàng Hồng 18K",
        size: "11",
        diamond: "10PT, F, VS1"
      }
    }
  }
];

function RefundList() {
  const navigate = useNavigate();

  const standardOrders = refundOrders.filter(order => order.type === "standard");
  const customOrders = refundOrders.filter(order => order.type === "custom");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Danh Sách Hoàn Trả</div>
        <Button 
          className={styles.buttonCreate}
          onClick={() => navigate('/customer/refund-create')}
        >
          Tạo Yêu Cầu Hoàn Trả
        </Button>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Đơn Hàng Tiêu Chuẩn</div>
        {standardOrders.map((order) => (
          <Card key={order.id} className={styles.orderCard}>
            <div className={styles.header}>
              <div className={styles.orderInfo}>
                <div className={styles.orderId}>Mã đơn: {order.orderId}</div>
                <div className={styles.date}>Ngày: {order.date}</div>
                <div className={styles.status}>{order.status}</div>
              </div>
            </div>

            <Grid container className={styles.body} spacing={3}>
              <Grid item xs={12} sm={3}>
                <img src={sample} alt="Product" className={styles.productImage} />
              </Grid>

              <Grid item xs={12} sm={6} className={styles.middle}>
                <div className={styles.collection}>
                  <span className={styles.collectionIcon}>💍</span>
                  {order.collection}
                </div>
                
                <div className={styles.ringsInfo}>
                  <div className={styles.ringSection}>
                    <div className={styles.ringTitle}>
                      <span>👨</span>
                      Nhẫn Nam
                    </div>
                    <div className={styles.specs}>
                      <div className={styles.spec}>
                        <span className={styles.label}>Chất liệu:</span>
                        <span className={styles.value}>{order.rings.male.material}</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.label}>Size:</span>
                        <span className={styles.value}>{order.rings.male.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.ringSection}>
                    <div className={styles.ringTitle}>
                      <span>👩</span>
                      Nhẫn Nữ
                    </div>
                    <div className={styles.specs}>
                      <div className={styles.spec}>
                        <span className={styles.label}>Chất liệu:</span>
                        <span className={styles.value}>{order.rings.female.material}</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.label}>Size:</span>
                        <span className={styles.value}>{order.rings.female.size}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.reason}>
                  <span className={styles.label}>Lý do hoàn trả:</span>
                  <span className={styles.value}>{order.reason}</span>
                </div>
              </Grid>

              <Grid item xs={12} sm={3} className={styles.right}>
                <div className={styles.price}>
                  {currencyFormatter(order.price)}
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  className={styles.detailButton}
                  onClick={() => navigate(`/customer/refund/${order.id}`)}
                >
                  Chi Tiết
                </Button>
              </Grid>
            </Grid>
          </Card>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>Đơn Hàng Thiết Kế Đặc Biệt</div>
        {customOrders.map((order) => (
          <Card key={order.id} className={styles.orderCard}>
            <div className={styles.header}>
              <div className={styles.orderInfo}>
                <div className={styles.orderId}>Mã đơn: {order.orderId}</div>
                <div className={styles.date}>Ngày: {order.date}</div>
                <div className={styles.status}>{order.status}</div>
              </div>
            </div>

            <Grid container className={styles.body} spacing={3}>
              <Grid item xs={12} sm={3}>
                <img src={sample} alt="Product" className={styles.productImage} />
              </Grid>

              <Grid item xs={12} sm={6} className={styles.middle}>
                <div className={styles.collection}>
                  <span className={styles.collectionIcon}>💍</span>
                  {order.collection}
                </div>
                
                <div className={styles.ringsInfo}>
                  <div className={styles.ringSection}>
                    <div className={styles.ringTitle}>
                      <span>👨</span>
                      Nhẫn Nam
                    </div>
                    <div className={styles.specs}>
                      <div className={styles.spec}>
                        <span className={styles.label}>Chất liệu:</span>
                        <span className={styles.value}>{order.rings.male.material}</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.label}>Size:</span>
                        <span className={styles.value}>{order.rings.male.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.ringSection}>
                    <div className={styles.ringTitle}>
                      <span>👩</span>
                      Nhẫn Nữ
                    </div>
                    <div className={styles.specs}>
                      <div className={styles.spec}>
                        <span className={styles.label}>Chất liệu:</span>
                        <span className={styles.value}>{order.rings.female.material}</span>
                      </div>
                      <div className={styles.spec}>
                        <span className={styles.label}>Size:</span>
                        <span className={styles.value}>{order.rings.female.size}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.reason}>
                  <span className={styles.label}>Lý do hoàn trả:</span>
                  <span className={styles.value}>{order.reason}</span>
                </div>
              </Grid>

              <Grid item xs={12} sm={3} className={styles.right}>
                <div className={styles.price}>
                  {currencyFormatter(order.price)}
                </div>
                <Button
                  fullWidth
                  variant="contained"
                  className={styles.detailButton}
                  onClick={() => navigate(`/customer/refund/${order.id}`)}
                >
                  Chi Tiết
                </Button>
              </Grid>
            </Grid>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RefundList;
