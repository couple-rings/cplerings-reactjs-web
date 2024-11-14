import { Button, Divider, Grid } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import styles from "./MaintenanceCreateForm.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const maintainService = [
  {
    id: 1,
    title: "Đánh bóng bề mặt của nhẫn",
    price: 100000,
    description:
      "Làm sạch và đánh bóng để loại bỏ vết xước nhỏ, giúp nhẫn sáng bóng như mới.",
    recommend: "Khuyến nghị: 1-2 lần/năm",
  },
  {
    id: 2,
    title: "Mạ lại bề mặt nhẫn (với nhẫn mạ vàng, bạc hoặc rhodium)",
    price: 100000,
    description: "Phủ lại lớp mạ để giữ màu sắc và độ sáng bóng của nhẫn.",
    recommend: "Khuyến nghị: 1-2 lần/năm",
  },
  {
    id: 3,
    title: "Kiểm tra và siết chặt chấu đá",
    price: 100000,
    description:
      "Kiểm tra độ chắc chắn của các chấu giữ đá để đảm bảo đá quý không bị lỏng và tránh rơi mất.",
    recommend: "Khuyến nghị: 1-2 lần/năm",
  },
  {
    id: 4,
    title: "Điều chỉnh kích thước nhẫn",
    price: 100000,
    description:
      "Làm sạch đá quý bằng dung dịch đặc biệt, giúp đá sáng và trong hơn.",
    recommend: "Khuyến nghị: 1-2 lần/năm",
  },
  {
    id: 5,
    title: "Khắc lại hoặc làm sắc nét phần khắc chữ",
    price: 100000,
    description:
      "Làm mới phần khắc chữ để giữ được độ rõ nét và chi tiết của thông điệp cá nhân.",
    recommend: "Khuyến nghị: 1-2 lần/năm",
  },
  {
    id: 6,
    title: "Vệ sinh nhẫn toàn diện",
    price: 100000,
    description:
      "Làm sạch kỹ lưỡng toàn bộ nhẫn, bao gồm các chi tiết nhỏ và phần khắc.",
    recommend: "Khuyến nghị: 2-3 lần/năm",
  },
  {
    id: 7,
    title: "Kiểm tra tổng thể định kỳ",
    price: 100000,
    description:
      "Kiểm tra toàn bộ nhẫn để phát hiện sớm các dấu hiệu hư hỏng, biến dạng hay hao mòn.",
    recommend: "Khuyến nghị: 1-2 lần/năm",
  },
];

function MaintenanceCreateForm() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();

  const handleCheckboxClick = (itemId: number, itemPrice: number) => {
    setSelectedItems((prevSelectedItems) => {
      const isSelected = prevSelectedItems.includes(itemId);
      if (isSelected) {
        setTotal((prevTotal) => prevTotal - itemPrice);
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        setTotal((prevTotal) => prevTotal + itemPrice);
        return [...prevSelectedItems, itemId];
      }
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Đơn Bảo Trì và Bảo Dưỡng Nhẫn</div>

      <Grid container className={styles.infoCustomer}>
        <Grid item className={styles.titleSection}>
          Thông Tin Khách Hàng
        </Grid>
        <Grid
          item
          container
          justifyContent={"space-between"}
          xs={12}
          md={12}
          lg={12}
          className={styles.inputInfoContainer}
        >
          <Grid item xs={12} md={7} className="input-info-box">
            <Grid item className={styles.inputBoxTitle}>
              Họ và Tên
            </Grid>
            <Grid item>
              <input type="text" className={styles.inputBoxField} required />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4.5} className="input-info-box">
            <Grid item className={styles.inputBoxTitle}>
              Số Điện Thoại
            </Grid>
            <Grid item className="info-box-field">
              <input type="text" className={styles.inputBoxField} required />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={"space-between"}
          md={12}
          lg={12}
          className={styles.inputInfoContainer}
        >
          <Grid item xs={12} md={7} className="input-info-box">
            <Grid item className={styles.inputBoxTitle}>
              Địa Chỉ
            </Grid>
            <Grid item>
              <input type="text" className={styles.inputBoxField} required />
            </Grid>
          </Grid>
          <Grid item xs={12} md={4.5} className="input-info-box">
            <Grid item className={styles.inputBoxTitle}>
              Mã Sản Phẩm
            </Grid>
            <Grid item className="info-box-field">
              <input type="text" className={styles.inputBoxField} required />
            </Grid>
          </Grid>
        </Grid>

        <Grid xs={12} md={12} pt={5} item>
          <Divider />
        </Grid>
      </Grid>

      <Grid container className={styles.infoOrder}>
        <Grid item className={styles.titleSection}>
          Danh Sách Dịch Vụ Bảo Trì và Bảo Dưỡng Nhẫn
        </Grid>

        <Grid item md={12} container className={styles.infoContainer}>
          {maintainService.map((item) => {
            return (
              <div className={styles.infoItem} key={item.id}>
                <Grid
                  item
                  className="checkbox-icon"
                  onClick={() => handleCheckboxClick(item.id, item.price)}
                >
                  {selectedItems.includes(item.id) ? (
                    <CheckBoxIcon />
                  ) : (
                    <CheckBoxOutlineBlankIcon />
                  )}
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  xl={12}
                  container
                  className={styles.infoDetail}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    xl={12}
                    container
                    justifyContent={"space-between"}
                    className={styles.titleBox}
                  >
                    <Grid item lg={11} className="titleDetail">
                      {item.title}
                    </Grid>
                    <Grid item lg={1} className="titlePrice">
                      {item.price}VND
                    </Grid>
                  </Grid>

                  <Grid item container className={styles.detailBox}>
                    <ul>
                      <li>{item.description}</li>
                      <li>{item.recommend}</li>
                    </ul>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </Grid>

        <Grid xs={12} md={12} pt={4} item>
          <Divider />
        </Grid>

        <Grid item justifyContent={"space-evenly"} container>
          <Grid item className={styles.optItem}>
            <div onClick={() => setSelectedOption('store')}>
              {selectedOption === "store" ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </div>
            <div>Lấy tại cửa hàng</div>
          </Grid>

          <Grid item className={styles.optItem}>
            <div onClick={() => setSelectedOption('home')}>
              {selectedOption === "home" ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </div>
            <div>Giao hàng tại nhà</div>
          </Grid>
        </Grid>

        <Grid
          item
          container
          justifyContent={"space-between"}
          className={styles.total}
        >
          <div>Tổng Tiền:</div>
          <div>{total}VND</div>
        </Grid>
      </Grid>

      <Grid container justifyContent={"center"}>
        <Button className={styles.btnPay} onClick={() => navigate('/staff/maintenance-payment')}>Thanh Toán</Button>
      </Grid>
    </div>
  );
}

export default MaintenanceCreateForm;
