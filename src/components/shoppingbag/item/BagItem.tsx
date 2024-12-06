import {
  Checkbox,
  Divider,
  Grid,
  IconButton,
  // SxProps,
  useMediaQuery,
} from "@mui/material";
import styles from "./BagItem.module.scss";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CloseIcon from "@mui/icons-material/Close";
// import { useState } from "react";
// import { bagItemMenuStyle } from "src/utils/styles";
// import MetalMenu from "src/components/menu/MetalMenu";
// import DiamondMenu from "src/components/menu/DiamondMenu";
import { currencyFormatter } from "src/utils/functions";
import { useTheme } from "@mui/material/styles";
import { ConfigurationKey, DesignCharacteristic } from "src/utils/enums";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { removeFromCart } from "src/redux/slice/cart.slice";
import { metalWeightUnit } from "src/utils/constants";

// const metalMenuStyle: SxProps = {
//   ...bagItemMenuStyle,
//   fontSize: "0.9rem",
//   width: 150,
// };

// const diamondMenuStyle: SxProps = {
//   ...bagItemMenuStyle,
//   fontSize: "0.9rem",
//   width: 120,
// };

function BagItem(props: IBagItemProps) {
  const { data, checkedItem, setCheckedItem } = props;

  const { design, metalSpec, id } = data;
  // const [metal, setMetal] = useState("Vàng Trắng 18K");
  // const [diamond, setDiamond] = useState("5PT ,F ,SI1");

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  const dispatch = useAppDispatch();

  const { configs } = useAppSelector((state) => state.config);

  const profitRatio = configs.find(
    (item) => item.key === ConfigurationKey.ProfitRatio
  )?.value;
  const sideDiamondPrice = configs.find(
    (item) => item.key === ConfigurationKey.SideDiamondPrice
  )?.value;
  const shippingFee = configs.find(
    (item) => item.key === ConfigurationKey.ShippingFee
  )?.value;

  const handleCheck = () => {
    const found = checkedItem.find((item) => item === id);
    if (found) {
      setCheckedItem(checkedItem.filter((item) => item !== id));
    } else setCheckedItem([...checkedItem, id]);
  };

  const calculatePrice = () => {
    if (sideDiamondPrice && shippingFee && profitRatio) {
      const price =
        (design.metalWeight *
          metalWeightUnit *
          metalSpec.metalSpecification.pricePerUnit +
          design.sideDiamondsCount * +sideDiamondPrice +
          +shippingFee) *
        +profitRatio;

      return Math.round(price / 1000) * 1000;
    }

    return 0;
  };

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Checkbox
          onChange={handleCheck}
          checked={checkedItem.includes(id)}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
        />

        <img src={metalSpec.image.url} />

        <div className={styles.detail}>
          <div className={styles.name}>{design.name}</div>
          <div className={styles.gender}>
            {design.characteristic === DesignCharacteristic.Male
              ? "(Nam Giới)"
              : "(Nữ Giới)"}
          </div>

          <Grid container marginBottom={sm ? 3 : 0}>
            <Grid
              container
              item
              xs={12}
              sm={7}
              marginBottom={sm ? 0 : 1}
              alignItems={"center"}
            >
              <Grid item xs={6} sm={12} className={styles.label}>
                Chất liệu
              </Grid>
              <Grid item xs={6} sm={12} fontSize={"0.9rem"}>
                {metalSpec.metalSpecification.name}
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={5}
              marginBottom={sm ? 0 : 1}
              alignItems={"center"}
            >
              <Grid item xs={6} sm={12} className={styles.label}>
                Kích thước
              </Grid>
              <Grid item xs={6} sm={12} fontSize={"0.9rem"}>
                {design.size} cm
              </Grid>
            </Grid>
            {/* <Grid
              container
              item
              xs={12}
              sm={5}
              marginBottom={sm ? 0 : 1}
              alignItems={"center"}
            >
              <Grid item xs={6} sm={12} className={styles.label}>
                Kim cương
              </Grid>
              <Grid item xs={6} sm={12}>
                <DiamondMenu
                  sx={diamondMenuStyle}
                  diamond={diamond}
                  setDiamond={setDiamond}
                />
              </Grid>
            </Grid> */}
          </Grid>

          <Grid container marginBottom={sm ? 3 : 0}>
            <Grid
              container
              item
              xs={12}
              sm={7}
              marginBottom={sm ? 0 : 1}
              alignItems={"center"}
            >
              <Grid item xs={6} sm={12} className={styles.label}>
                Kim cương phụ
              </Grid>
              <Grid item xs={6} sm={12} fontSize={"0.9rem"}>
                {design.sideDiamondsCount} viên
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={5}
              marginBottom={sm ? 0 : 1}
              alignItems={"center"}
            >
              <Grid item xs={6} sm={12} className={styles.label}>
                Khối lượng
              </Grid>
              <Grid item xs={6} sm={12} fontSize={"0.9rem"}>
                {design.metalWeight} chỉ
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div>
          <IconButton
            sx={{ p: 0 }}
            onClick={() => dispatch(removeFromCart(id))}
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      <div className={styles.price}>
        <div>Thành Tiền</div>
        <div>{currencyFormatter(calculatePrice())}</div>
      </div>

      <Divider sx={{ backgroundColor: "#555" }} />
    </div>
  );
}

export default BagItem;
