import { Grid } from "@mui/material";
import placeholder from "src/assets/default.jpg";
import { DesignCharacteristic } from "src/utils/enums";
import { currencyFormatter, getDiamondSpec } from "src/utils/functions";
import styles from "./WeddingRings.module.scss";
import male from "src/assets/male-icon.png";
import female from "src/assets/female-icon.png";

function WeddingRing(props: IWeddingRingProps) {
  const { ring, gender } = props;

  const img = ring.customDesign.designVersion.image.url;

  return (
    <Grid container className={styles.ring}>
      <Grid item sm={4} lg={2.5}>
        <img src={img ? img : placeholder} className={styles.image} />
      </Grid>

      <Grid container item sm={7.5} lg={9}>
        <Grid item className={styles.name}>
          Nhẫn cưới của{" "}
          <span style={{ textTransform: "capitalize" }}>
            {ring.spouse.fullName.toLowerCase()}
          </span>
        </Grid>

        <Grid item xs={12}>
          {gender === DesignCharacteristic.Male && (
            <div>
              <img src={male} className={styles.genderIcon} /> {"Nam Tính"}
            </div>
          )}

          {gender === DesignCharacteristic.Female && (
            <div>
              <img src={female} className={styles.genderIcon} /> {"Nữ Tính"}
            </div>
          )}
        </Grid>

        <Grid container justifyContent={"space-between"}>
          <Grid container item md={6} gap={2}>
            <Grid item>Kim cương:</Grid>

            <Grid item>
              {ring.diamonds.length > 0 &&
                ring.diamonds[0].diamondSpecification.shape}{" "}
              {ring.diamonds.length > 0 &&
                getDiamondSpec(ring.diamonds[0].diamondSpecification)}
            </Grid>
          </Grid>

          <Grid container item md={6} gap={2}>
            <Grid item>Khắc chữ:</Grid>

            <Grid item>{ring.engraving ? ring.engraving : "--"}</Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"space-between"}>
          <Grid container item md={6} gap={2}>
            <Grid item>Chất liệu:</Grid>

            <Grid item>{ring.metalSpecification.name}</Grid>
          </Grid>

          <Grid container item md={6} gap={2}>
            <Grid item>Kích thước:</Grid>

            <Grid item>{ring.fingerSize}</Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"space-between"}>
          <Grid container item md={6} gap={2}>
            <Grid item>Kim cương phụ:</Grid>

            <Grid item>{ring.customDesign.sideDiamondsCount} viên</Grid>
          </Grid>

          <Grid container item md={6} gap={2}>
            <Grid item>Khối lượng:</Grid>

            <Grid item>{ring.customDesign.metalWeight} chỉ</Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          Giá Tiền:{" "}
          <span className={styles.price}>
            {currencyFormatter(ring.price.amount)}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default WeddingRing;
