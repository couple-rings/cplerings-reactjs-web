import { Grid } from "@mui/material";
import styles from "./Orders.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import CustomerOrder from "src/components/order/CustomerOrder";
import sample from "src/assets/sampledata/ringdesign.png";

const orders = [
  {
    date: "09/10/2024",
    orderNo: "824100998377",
    img: sample,
    name: "BỘ SƯU TẬP FOREVER Nhẫn Cưới",
    status: "Unpaid",
    total: 12000000,
    metal: "Vàng Trắng 18K",
    size: 5,
    diamond: "5PT, F, SI1",
  },
  {
    date: "09/10/2024",
    orderNo: "824100998377",
    img: sample,
    name: "BỘ SƯU TẬP FOREVER Nhẫn Cưới",
    status: "Unpaid",
    total: 12000000,
    metal: "Vàng Trắng 18K",
    size: 5,
    diamond: "5PT, F, SI1",
  },
];

function Orders() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Grid container xs={11} item xl={7} className={styles.head}>
        <div className={styles.homeLink} onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
          <span>Trang Chủ</span>
        </div>
      </Grid>

      <Grid container item xs={11} xl={6} className={styles.body}>
        <div className={styles.title}>Đơn Hàng</div>
        <div className={styles.subtitle}>
          Cảm ơn bạn vì đã lựa chọn Couple Rings®
        </div>

        <div className={styles.list}>
          {orders.map((item, index) => {
            return <CustomerOrder key={index} />;
          })}
        </div>
      </Grid>
    </div>
  );
}

export default Orders;
