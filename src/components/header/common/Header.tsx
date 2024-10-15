import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import styles from "./Header.module.scss";
import UpperBar from "./UpperBar";
import LowerBar from "./LowerBar";

const TEXTS = [
  <span>
    Vận Chuyển An Toàn Và Được Bảo Hiểm Cho Mọi Đơn Hàng.{" "}
    <span className={styles.buyLink}>Mua Ngay</span>
  </span>,
  <span>
    Những Ưu Đãi Hấp Dẫn Dành Riêng Cho{" "}
    <span style={{ fontWeight: "bold" }}>Nhẫn Cưới</span>
  </span>,
];

const Header = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4000 // every 4 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.slogan}>Một Tình Yêu, Một Đời Người</div>

      <TextTransition
        springConfig={presets.wobbly}
        className={styles.transitionText}
      >
        {TEXTS[index % TEXTS.length]}
      </TextTransition>

      <UpperBar />

      <LowerBar />
    </div>
  );
};

export default Header;
