import { Checkbox, Divider, Grid } from "@mui/material";
import styles from "./ShoppingBag.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import BagItem from "src/components/shoppingbag/item/BagItem";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Summary from "src/components/shoppingbag/summary/Summary";
import box from "src/assets/toujours_box.png";

function ShoppingBag() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <Grid container item xs={11} xl={10} className={styles.head}>
        <div className={styles.homeLink} onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
          <span>Trang Chủ</span>
        </div>
      </Grid>

      <Grid container className={styles.body}>
        <Grid container item xs={11} xl={10} justifyContent={"space-between"}>
          <Grid item lg={6} xl={5}>
            <div className={styles.title}>Giỏ Hàng</div>
            <div className={styles.all}>
              <Checkbox
                icon={<RadioButtonUncheckedIcon />}
                checkedIcon={<RadioButtonCheckedIcon />}
              />
              <span className={styles.label}>All</span>
            </div>
            <Divider sx={{ backgroundColor: "#555", mt: 2 }} />

            <BagItem />
            <BagItem />
            <BagItem />
          </Grid>

          <Grid item lg={5}>
            <Summary productAmount={12000000} discount={0} />

            <div className={styles.box}>
              <img src={box} width={"100%"} />
              <div className={styles.description}>
                Mỗi món trang sức đều được đặt trong hộp "Toujours" độc đáo,
                tượng trưng cho sự thanh lịch vĩnh cửu và vẻ đẹp trường tồn.
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ShoppingBag;
