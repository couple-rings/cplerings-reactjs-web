import Slider, { Settings } from "react-slick";
import AdCard from "./AdCard";
import { Grid } from "@mui/material";
import ad1 from "src/assets/ad01.png";
import ad2 from "src/assets/ad02.png";
import ad3 from "src/assets/ad03.png";
import ad4 from "src/assets/ad04.png";
import styles from "./Advertisement.module.scss";

const advertisements = [
  {
    coverImg: ad1,
    title: "Thiết Kế Độc Đáo",
    text: "Những thiết kế đơn giản nhưng tinh tế và dịch vụ thiết kế cá nhân hóa từ trung tâm thiết kế CR Hồ Chí Minh.",
  },
  {
    coverImg: ad2,
    title: "Vận Chuyển An Toàn",
    text: "Dịch vụ đổi trả trong vòng 15 ngày và vận chuyển được bảo hiểm toàn diện.",
  },
  {
    coverImg: ad3,
    title: "Chứng Nhận Kim Cương",
    text: "Kim cương 100% tự nhiên, được chứng nhận bởi GIA.",
  },
  {
    coverImg: ad4,
    title: "Tình Yêu Độc Nhất",
    text: "Sau khi xác minh tình yêu đích thực, tên của người ấy sẽ không bao giờ được thay đổi hay xóa bỏ.",
  },
];

const adSettings: Settings = {
  dots: false,
  infinite: false,
  speed: 500,
  swipeToSlide: true,
};

function Advertisement() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Tình Yêu Làm Rạng Ngời Những Viên Kim Cương
      </div>

      <Slider {...adSettings}>
        <div>
          <Grid container className={styles.sliderContainer}>
            {advertisements.map((ad, index) => {
              return <AdCard key={index} {...ad} />;
            })}
          </Grid>
        </div>
      </Slider>
    </div>
  );
}

export default Advertisement;
