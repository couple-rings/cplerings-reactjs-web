import { Button, Checkbox, Divider, Grid } from "@mui/material";
import styles from "./ShoppingBag.module.scss";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import BagItem from "src/components/shoppingbag/item/BagItem";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Summary from "src/components/shoppingbag/summary/Summary";
import box from "src/assets/toujours_box.png";
import { useAppSelector } from "src/utils/hooks";
import { secondaryBtn } from "src/utils/styles";
import { useState } from "react";

function ShoppingBag() {
  const [checkedItem, setCheckedItem] = useState<string[]>([]);

  const navigate = useNavigate();

  const { cartItems } = useAppSelector((state) => state.cart);

  const handleCheckAll = (value: boolean) => {
    if (value === true) {
      const items = cartItems.map((item) => item.id);
      setCheckedItem(items);
    }

    if (value === false) {
      setCheckedItem([]);
    }
  };

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
            {cartItems.length > 0 && (
              <div>
                <div className={styles.all}>
                  <Checkbox
                    onChange={(e) => handleCheckAll(e.target.checked)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<RadioButtonCheckedIcon />}
                  />
                  <span className={styles.label}>All</span>
                </div>
                <Divider sx={{ backgroundColor: "#555", mt: 2 }} />

                {cartItems.map((item) => {
                  return (
                    <BagItem
                      key={item.id}
                      data={item}
                      checkedItem={checkedItem}
                      setCheckedItem={setCheckedItem}
                    />
                  );
                })}
              </div>
            )}
          </Grid>

          {cartItems.length > 0 && (
            <Grid item lg={5}>
              <Summary checkedItem={checkedItem} />

              <div className={styles.box}>
                <img src={box} width={"100%"} />
                <div className={styles.description}>
                  Mỗi món trang sức đều được đặt trong hộp "Toujours" độc đáo,
                  tượng trưng cho sự thanh lịch vĩnh cửu và vẻ đẹp trường tồn.
                </div>
              </div>
            </Grid>
          )}
        </Grid>

        {cartItems.length === 0 && (
          <Grid container item xs={11} xl={10} className={styles.empty}>
            <Grid item xs={12} mb={10}>
              Bạn chưa có món hàng nào
            </Grid>
            <Grid container item mt={6} justifyContent={"center"}>
              <Button
                variant="contained"
                sx={secondaryBtn}
                onClick={() => navigate("/jewelry")}
              >
                Mua Trang Sức
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default ShoppingBag;
