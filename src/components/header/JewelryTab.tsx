import { Container } from "@mui/material";
import styles from "./Header.module.scss";
import jewelry from "src/assets/Jewelry.png";

const collections = [
  "DR Heart",
  "Believe",
  "Love Mark",
  "Eternal Love",
  "Love Line",
  "Love Palace",
];

const categories = ["Dây Chuyền", "Vòng Tay", "Bông Tai"];

const metals = [
  "Vàng Trắng 14K",
  "Vàng Trắng 18K",
  "Vàng Thường 18K",
  "Vàng Hồng 18K",
];

const genders = ["Trang Sức Nam", "Trang Sức Nữ"];

function JewelryTab() {
  return (
    <div className={styles.tab}>
      <div className={styles.columnsContainer}>
        <div className={styles.column}>
          <div className={styles.title}>Bộ Sưu Tập</div>
          {collections.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                {item}
              </div>
            );
          })}
        </div>

        <div className={styles.column}>
          <div className={styles.title}>Loại Trang Sức</div>
          {categories.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                {item}
              </div>
            );
          })}
        </div>

        <div className={styles.column}>
          <div className={styles.title}>Loại Vàng</div>
          {metals.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                {item}
              </div>
            );
          })}
        </div>

        <div className={styles.column}>
          <div className={styles.title}>Giới Tính</div>
          {genders.map((item, index) => {
            return (
              <div key={index} className={styles.item}>
                {item}
              </div>
            );
          })}
        </div>

        <img src={jewelry} className={styles.coverImg} />
      </div>

      <div className={styles.exploreLink}>
        <Container>Khám Phá Tất Cả Trang Sức &gt;</Container>
      </div>
    </div>
  );
}

export default JewelryTab;
