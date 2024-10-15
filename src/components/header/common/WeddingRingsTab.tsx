import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import styles from "./Header.module.scss";
import weddingRing from "src/assets/weddingRing.png";
import { useNavigate } from "react-router-dom";

const collections = [
  "DR Heart",
  "Believe",
  "Love Mark",
  "Eternal Love",
  "Love Line",
  "Love Palace",
];

const metals = [
  "Vàng Trắng 14K",
  "Vàng Trắng 18K",
  "Vàng Thường 18K",
  "Vàng Hồng 18K",
];

const prices = [
  "Dưới 20 Triệu",
  "20 - 40 Triệu",
  "40 - 50 Triệu",
  "Trên 50 Triệu",
];

const genders = ["Nhẫn Nam", "Nhẫn Nữ", "Nhẫn Cặp"];

const WeddingRingsTab = () => {
  const navigate = useNavigate();

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
          <div className={styles.title}>Mức Giá</div>
          {prices.map((item, index) => {
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

        <img src={weddingRing} className={styles.coverImg} />
      </div>

      <div
        className={styles.exploreLink}
        onClick={() => navigate("/wedding-rings")}
      >
        <Container sx={{ mt: 3 }}>Tất Cả Mẫu Nhẫn Cưới &gt;</Container>
      </div>
    </div>
  );
};

export const WeddingRingsTabMobile = () => {
  return (
    <List>
      <ListItemButton>
        <ListItemText primary={"Tất Các Mẫu Nhẫn Cưới >"} />
      </ListItemButton>

      <ListItem>
        <ListItemText primary={"Bộ Sưu Tập"} />
      </ListItem>
      {collections.map((item, index) => {
        return (
          <ListItemButton key={index} sx={{ pl: 5 }}>
            <ListItemText secondary={item} />
          </ListItemButton>
        );
      })}

      <ListItem>
        <ListItemText primary={"Loại Vàng"} />
      </ListItem>
      {metals.map((item, index) => {
        return (
          <ListItemButton key={index} sx={{ pl: 5 }}>
            <ListItemText secondary={item} />
          </ListItemButton>
        );
      })}

      <ListItem>
        <ListItemText primary={"Mức Giá"} />
      </ListItem>
      {prices.map((item, index) => {
        return (
          <ListItemButton key={index} sx={{ pl: 5 }}>
            <ListItemText secondary={item} />
          </ListItemButton>
        );
      })}

      <ListItem>
        <ListItemText primary={"Giới Tính"} />
      </ListItem>
      {genders.map((item, index) => {
        return (
          <ListItemButton key={index} sx={{ pl: 5 }}>
            <ListItemText secondary={item} />
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default WeddingRingsTab;
