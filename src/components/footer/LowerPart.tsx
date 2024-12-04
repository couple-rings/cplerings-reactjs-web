import { Grid } from "@mui/material";
import styles from "./Footer.module.scss";
import {
  companyAddress,
  companyEmail,
  companyPhone,
} from "src/utils/constants";
import { useNavigate } from "react-router-dom";

const columnItems1 = [
  {
    text: "Vận Chuyển Hàng",
    path: "",
  },
  {
    text: "Đổi Trả",
    path: "",
  },
  {
    text: "Mua & Thanh Toán",
    path: "",
  },
  {
    text: "Bảo Hành",
    path: "",
  },
  {
    text: "FAQs",
    path: "",
  },
];

const columnItems2 = [
  {
    text: "Kích Cỡ Ngón Tay",
    path: "",
  },
  {
    text: "Đóng Gói",
    path: "",
  },
  {
    text: "Cách Chọn Kim Cương",
    path: "",
  },
  {
    text: "Blog",
    path: "",
  },
];

const columnItems3 = [
  {
    text: "Sứ Mệnh",
    path: "",
  },
  {
    text: "Thỏa Thuận Tình Yêu",
    path: "/love-agreement",
  },
  {
    text: "Tìm Cửa Hàng",
    path: "/stores",
  },
  {
    text: "Gửi Email",
    path: "",
  },
];

const columnItems4 = [
  {
    text: "Nhẫn Cưới",
    path: "/wedding-rings",
  },
  {
    text: "Trang Sức",
    path: "/jewelry",
  },
];

const columnItems5 = [
  `Email: ${companyEmail}`,
  `SĐT: ${companyPhone}`,
  `Địa Chỉ: ${companyAddress}`,
  "Giờ Làm Việc",
  "Thứ Hai - Thứ Sáu: 8:00 - 21:00",
  "Thứ Bảy, Chủ Nhật: 8:00 - 11:00",
];

const LowerPart = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.lower}>
      <Grid container className={styles.columnContainer}>
        <Grid item xs={12} sm={6} md={3} lg={2} className={styles.column}>
          <div className={styles.title}>Chăm Sóc Khách Hàng</div>
          {columnItems1.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                {item.text}
              </div>
            );
          })}
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2} className={styles.column}>
          <div className={styles.title}>Hướng Dẫn</div>
          {columnItems2.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                {item.text}
              </div>
            );
          })}
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2} className={styles.column}>
          <div className={styles.title}>Về Couple Rings</div>
          {columnItems3.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.item}
                onClick={() => navigate(item.path)}
              >
                {item.text}
              </div>
            );
          })}
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={2} className={styles.column}>
          <div className={styles.title}>Sản Phẩm</div>
          {columnItems4.map((item, index) => {
            return (
              <div
                key={index}
                className={styles.item}
                onClick={() => navigate(item.path)}
              >
                {item.text}
              </div>
            );
          })}
        </Grid>

        <Grid item xs={12} sm={12} lg={2} className={styles.column}>
          <div className={styles.title}>Liên Lạc Với Chúng Tôi</div>
          {columnItems5.map((item, index) => {
            return (
              <div key={index} className={styles.plainTextItem}>
                {item}
              </div>
            );
          })}
        </Grid>
      </Grid>

      <div className={styles.statement}>
        &copy; 2024 - Bản quyền thuộc về Công ty TNHH Couple Rings
      </div>
    </div>
  );
};

export default LowerPart;
