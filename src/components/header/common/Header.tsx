import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";
import styles from "./Header.module.scss";
import UpperBar from "./UpperBar";
import LowerBar from "./LowerBar";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

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

      <div onClick={() => navigate("/wedding-rings")}>
        <TextTransition
          springConfig={presets.wobbly}
          className={styles.transitionText}
        >
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </div>

      <UpperBar />

      <LowerBar />
    </div>
  );
};

export default Header;
