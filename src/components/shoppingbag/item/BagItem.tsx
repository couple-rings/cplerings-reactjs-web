import {
  Checkbox,
  Divider,
  Grid,
  IconButton,
  SxProps,
  useMediaQuery,
} from "@mui/material";
import styles from "./BagItem.module.scss";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import sample from "src/assets/sampledata/ringdesign.png";
import CloseIcon from "@mui/icons-material/Close";
import SizeMenu from "src/components/menu/SizeMenu";
import { useState } from "react";
import { bagItemMenuStyle, menuPaperStyle } from "src/utils/styles";
import MetalMenu from "src/components/menu/MetalMenu";
import DiamondMenu from "src/components/menu/DiamondMenu";
import EngravingMenu from "src/components/menu/EngravingMenu";
import { currencyFormatter } from "src/utils/functions";
import { useTheme } from "@mui/material/styles";

const sizeMenuStyle: SxProps = {
  ...bagItemMenuStyle,
  width: 50,
  fontSize: "0.9rem",
  minWidth: 30,
};

const metalMenuStyle: SxProps = {
  ...bagItemMenuStyle,
  fontSize: "0.9rem",
  width: 150,
};

const diamondMenuStyle: SxProps = {
  ...bagItemMenuStyle,
  fontSize: "0.9rem",
  width: 120,
};

const engravingMenuStyle: SxProps = {
  ...bagItemMenuStyle,
  fontSize: "0.9rem",
  width: 120,
};

function BagItem() {
  const [size, setSize] = useState(5);
  const [metal, setMetal] = useState("Vàng Trắng 18K");
  const [diamond, setDiamond] = useState("5PT ,F ,SI1");
  const [engraving, setEngraving] = useState("");

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
        />

        <img src={sample} />

        <div className={styles.detail}>
          <div className={styles.name}>
            CR FOREVER Simple Wedding Ring For Man
          </div>
          <div className={styles.gender}>(Nam Giới)</div>

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
              <Grid item xs={6} sm={12}>
                <MetalMenu
                  sx={metalMenuStyle}
                  metal={metal}
                  setMetal={setMetal}
                />
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
                Kim cương
              </Grid>
              <Grid item xs={6} sm={12}>
                <DiamondMenu
                  sx={diamondMenuStyle}
                  diamond={diamond}
                  setDiamond={setDiamond}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container>
            <Grid
              container
              item
              xs={12}
              sm={7}
              marginBottom={sm ? 0 : 1}
              alignItems={"center"}
            >
              <Grid item xs={6} sm={12} className={styles.label}>
                Kích thước
              </Grid>
              <Grid item xs={6} sm={12}>
                <SizeMenu
                  size={size}
                  setSize={setSize}
                  label={false}
                  sx={sizeMenuStyle}
                  paperStyle={menuPaperStyle}
                />
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
                Khắc chữ
              </Grid>
              <Grid item xs={6} sm={12}>
                <EngravingMenu
                  sx={engravingMenuStyle}
                  engraving={engraving}
                  setEngraving={setEngraving}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>

        <div>
          <IconButton sx={{ p: 0 }}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      <div className={styles.price}>
        <div>Thành Tiền</div>
        <div>{currencyFormatter(12000000)}</div>
      </div>

      <Divider sx={{ backgroundColor: "#555" }} />
    </div>
  );
}

export default BagItem;
