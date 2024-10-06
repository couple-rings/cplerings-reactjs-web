import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import styles from "./Header.module.scss";
import jewelry from "src/assets/Jewelry.png";
import { useNavigate } from "react-router-dom";

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

      <div className={styles.exploreLink} onClick={() => navigate("jewelry")}>
        <Container sx={{ mt: 3 }}>Khám Phá Tất Cả Trang Sức &gt;</Container>
      </div>
    </div>
  );
}

export const JewelryTabMobile = () => {
  return (
    <List>
      <ListItemButton>
        <ListItemText primary={"Tất Các Trang Sức >"} />
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
        <ListItemText primary={"Loại Trang Sức"} />
      </ListItem>
      {categories.map((item, index) => {
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

export default JewelryTab;
